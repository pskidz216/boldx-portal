import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { B, font } from "../theme";
import BXELogo from "./BXELogo";
import AppCard from "./AppCard";
import APPS from "../config/apps";

function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth <= breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const h = (e) => setM(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [breakpoint]);
  return m;
}

/* ── Light Glassmorphism Background ── */
function GlassBackground() {
  const isMobile = useIsMobile();
  const s = isMobile ? 0.45 : 1;
  const blobs = [
    { color: "rgba(180,140,255,0.45)", size: 700 * s, top: "-15%", right: "-10%", animation: "blobFloat1 22s ease-in-out infinite" },
    { color: "rgba(255,140,180,0.40)", size: 550 * s, top: "60%", left: "-12%", animation: "blobFloat2 28s ease-in-out infinite" },
    { color: "rgba(120,180,255,0.38)", size: 600 * s, top: "-5%", left: "20%", animation: "blobFloat3 25s ease-in-out infinite" },
    { color: "rgba(255,180,120,0.35)", size: 500 * s, bottom: "-10%", right: "15%", animation: "blobFloat4 30s ease-in-out infinite" },
    { color: "rgba(120,230,210,0.30)", size: 400 * s, top: "30%", right: "40%", animation: "blobFloat5 26s ease-in-out infinite" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, overflow: "hidden",
      background: "linear-gradient(135deg, #e0c3fc 0%, #c9d6ff 30%, #d4eaf7 50%, #f0d5e0 70%, #fce4d6 100%)",
      zIndex: 0,
    }}>
      {blobs.map((blob, i) => (
        <div key={i} style={{
          position: "absolute",
          width: blob.size, height: blob.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${blob.color} 0%, transparent 65%)`,
          filter: "blur(80px)",
          top: blob.top, bottom: blob.bottom,
          left: blob.left, right: blob.right,
          animation: blob.animation,
          pointerEvents: "none",
        }} />
      ))}

      {/* Floating 3D glass orbs */}
      <div style={{
        position: "absolute", top: "12%", right: "18%",
        width: isMobile ? 50 : 80, height: isMobile ? 50 : 80, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), rgba(255,255,255,0.15) 60%, rgba(200,180,255,0.1))",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 -4px 12px rgba(255,255,255,0.3)",
        animation: "orbFloat 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "12%",
        width: isMobile ? 30 : 50, height: isMobile ? 30 : 50, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(255,255,255,0.1) 60%, rgba(255,180,200,0.1))",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.05), inset 0 -3px 8px rgba(255,255,255,0.2)",
        animation: "orbFloat 10s ease-in-out infinite 2s",
        pointerEvents: "none",
      }} />
      {!isMobile && <div style={{
        position: "absolute", top: "55%", right: "8%",
        width: 35, height: 35, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(255,255,255,0.1) 60%)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        animation: "orbFloat 12s ease-in-out infinite 4s",
        pointerEvents: "none",
      }} />}
    </div>
  );
}

export default function Dashboard({ user, onSignOut, onOpenApp, onSignIn }) {
  const displayName = user
    ? (user.user_metadata?.first_name || user.email?.split("@")[0] || "User")
    : "Guest";

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: font,
      position: "relative",
    }}>
      <GlassBackground />

      {/* Testing environment banner — glass style */}
      <div style={{
        position: "relative", zIndex: 10,
        background: "rgba(232,135,30,0.12)",
        backdropFilter: B.blurSm,
        WebkitBackdropFilter: B.blurSm,
        borderBottom: "1px solid rgba(232,135,30,0.15)",
        color: B.orangeDark,
        textAlign: "center",
        padding: "8px 16px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        fontFamily: font,
      }}>
        ⚠ Testing Environment
      </div>

      {/* Top bar — frosted glass */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px clamp(20px, 4vw, 48px)",
          background: "rgba(255,255,255,0.45)",
          backdropFilter: B.blurLg,
          WebkitBackdropFilter: B.blurLg,
          borderBottom: "1px solid rgba(255,255,255,0.60)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <BXELogo size={28} color={B.orange} />
          <span style={{
            fontSize: 11, fontWeight: 700, color: B.textSecondary,
            textTransform: "uppercase", letterSpacing: "0.14em",
          }}>Portal</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {user ? (
            <>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: B.text }}>{displayName}</div>
                <div style={{ fontSize: 11, color: B.textMuted, maxWidth: "clamp(100px, 30vw, 200px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
              </div>
              <button
                onClick={onSignOut}
                style={{
                  padding: "8px 16px", borderRadius: B.radiusSm,
                  border: "1px solid rgba(255,255,255,0.50)",
                  background: "rgba(255,255,255,0.30)",
                  fontSize: 12, fontWeight: 600, color: B.textSecondary,
                  cursor: "pointer", fontFamily: font, transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                  e.currentTarget.style.color = B.red;
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.50)";
                  e.currentTarget.style.color = B.textSecondary;
                  e.currentTarget.style.background = "rgba(255,255,255,0.30)";
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                  e.currentTarget.style.color = B.red;
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                }}
                onTouchEnd={(e) => {
                  const el = e.currentTarget;
                  setTimeout(() => {
                    el.style.borderColor = "rgba(255,255,255,0.50)";
                    el.style.color = B.textSecondary;
                    el.style.background = "rgba(255,255,255,0.30)";
                  }, 150);
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={onSignIn}
              style={{
                padding: "8px 20px", borderRadius: B.radiusSm,
                border: "none",
                background: `linear-gradient(135deg, ${B.orange}, ${B.orangeLight})`,
                fontSize: 12, fontWeight: 700, color: "#fff",
                cursor: "pointer", fontFamily: font, transition: "all 0.2s",
                boxShadow: `0 4px 16px ${B.orangeGlow}`,
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)",
      }}>
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "clamp(24px, 5vw, 48px)" }}
        >
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, color: B.text,
            margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Welcome back,{" "}
            <span style={{
              background: `linear-gradient(135deg, ${B.orange}, ${B.orangeLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{displayName}</span>
          </h1>
          <p style={{
            fontSize: 16, color: B.textSecondary, marginTop: 12, marginBottom: 0,
            lineHeight: 1.6, maxWidth: 500,
          }}>
            Access your BoldX Enterprises applications below.
          </p>
        </motion.div>

        {/* App Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
          gap: "clamp(16px, 3vw, 24px)",
        }}>
          {APPS.map((app, i) => (
            <AppCard
              key={app.id}
              app={app}
              index={i}
              onClick={() => onOpenApp(app.id)}
            />
          ))}
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center", marginTop: 64,
            fontSize: 12, color: B.textDim,
          }}
        >
          BoldX Enterprises &middot; Internal Portal
        </motion.div>
      </div>
    </div>
  );
}
