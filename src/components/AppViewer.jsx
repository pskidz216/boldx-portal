import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { B, font } from "../theme";
import BXELogo from "./BXELogo";
import APPS from "../config/apps";
import { supabase } from "../lib/supabase";

export default function AppViewer({ appId, onBack }) {
  const app = APPS.find((a) => a.id === appId);
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(null);

  // Build iframe URL with session tokens in the hash fragment
  // This avoids cross-origin postMessage/storage issues entirely
  useEffect(() => {
    if (!app) return;

    const buildUrl = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const hash = `#portal_access_token=${encodeURIComponent(session.access_token)}&portal_refresh_token=${encodeURIComponent(session.refresh_token)}`;
        setIframeSrc(app.url + hash);
      } else {
        setIframeSrc(app.url);
      }
    };

    buildUrl();
  }, [app?.url, appId]);

  // Also send via postMessage as a fallback
  useEffect(() => {
    if (!iframeLoaded || !app) return;
    let cancelled = false;

    const sendSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !iframeRef.current?.contentWindow || cancelled) return;

      const msg = {
        type: "BXE_PORTAL_SESSION",
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      };

      const delays = [0, 500, 1500];
      delays.forEach((ms) => {
        setTimeout(() => {
          if (!cancelled && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(msg, "*");
          }
        }, ms);
      });
    };

    const handleReady = async (event) => {
      if (event.data?.type === "BXE_APP_READY") {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            {
              type: "BXE_PORTAL_SESSION",
              access_token: session.access_token,
              refresh_token: session.refresh_token,
            },
            "*"
          );
        }
      }
    };

    window.addEventListener("message", handleReady);
    sendSession();
    return () => { cancelled = true; window.removeEventListener("message", handleReady); };
  }, [iframeLoaded, appId, app]);

  if (!app || !iframeSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={appId}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", flexDirection: "column",
          background: B.bgSolid,
          fontFamily: font,
        }}
      >
        {/* App top bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px clamp(16px, 3vw, 24px)",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: B.blur,
          WebkitBackdropFilter: B.blur,
          borderBottom: `1px solid ${B.borderLight}`,
          flexShrink: 0,
        }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: B.radiusSm,
              border: `1px solid ${B.border}`, background: B.white,
              fontSize: 13, fontWeight: 600, color: B.textSecondary,
              cursor: "pointer", fontFamily: font, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = B.orange;
              e.currentTarget.style.color = B.orange;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = B.border;
              e.currentTarget.style.color = B.textSecondary;
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Portal
          </button>

          <div style={{ width: 1, height: 20, background: B.borderLight, margin: "0 4px" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{app.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{app.name}</span>
          </div>

          <div style={{ flex: 1 }} />

          <BXELogo size={20} color={B.textDim} />
        </div>

        {/* App iframe */}
        <div style={{ flex: 1, position: "relative" }}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={app.name}
            onLoad={() => setIframeLoaded(true)}
            style={{
              width: "100%", height: "100%", border: "none",
              background: B.white,
            }}
            allow="clipboard-read; clipboard-write"
          />

          {/* Loading overlay — visible until iframe loads */}
          {!iframeLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: B.bgSolid,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: `3px solid ${B.borderLight}`,
                  borderTopColor: app.color,
                }}
              />
              <div style={{ marginTop: 16, fontSize: 13, color: B.textMuted, fontWeight: 500 }}>
                Loading {app.name}...
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
