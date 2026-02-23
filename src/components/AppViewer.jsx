import { motion, AnimatePresence } from "framer-motion";
import { B, font } from "../theme";
import BXELogo from "./BXELogo";

const APP_META = {
  travel: {
    name: "BXE Travel",
    icon: "\u2708\uFE0F",
    color: "#2563EB",
    // In production, these would be deployed URLs
    devPort: 5174,
  },
  hub: {
    name: "BoldX Hub",
    icon: "\uD83D\uDCCA",
    color: "#8B5CF6",
    devPort: 5175,
  },
  intake: {
    name: "BXE Intake",
    icon: "\uD83D\uDCCB",
    color: "#E8871E",
    devPort: 5176,
  },
};

export default function AppViewer({ appId, onBack }) {
  const meta = APP_META[appId];
  if (!meta) return null;

  // For local dev, point to sibling app dev servers
  // In production, these would be deployed URLs
  const appUrl = `http://localhost:${meta.devPort}`;

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
            <span style={{ fontSize: 18 }}>{meta.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{meta.name}</span>
          </div>

          <div style={{ flex: 1 }} />

          <BXELogo size={20} color={B.textDim} />
        </div>

        {/* App iframe */}
        <div style={{ flex: 1, position: "relative" }}>
          <iframe
            src={appUrl}
            title={meta.name}
            style={{
              width: "100%", height: "100%", border: "none",
              background: B.white,
            }}
            allow="clipboard-read; clipboard-write"
          />

          {/* Loading overlay — visible until iframe loads */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: B.bgSolid,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                border: `3px solid ${B.borderLight}`,
                borderTopColor: meta.color,
              }}
            />
            <div style={{ marginTop: 16, fontSize: 13, color: B.textMuted, fontWeight: 500 }}>
              Loading {meta.name}...
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
