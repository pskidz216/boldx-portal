import { motion } from "framer-motion";
import { B, font } from "../theme";
import BXELogo from "./BXELogo";
import AppCard from "./AppCard";

const APPS = [
  {
    id: "travel",
    name: "BXE Travel",
    description: "Corporate travel booking, flight search, airline miles tracking, and traveler profiles.",
    icon: "\u2708\uFE0F",
    color: "#2563EB",
    colorEnd: "#06B6D4",
    status: "live",
    url: null, // Will be iframe or external link
  },
  {
    id: "hub",
    name: "BoldX Hub",
    description: "Portfolio management, company hierarchy visualization, and deal tracking dashboard.",
    icon: "\uD83D\uDCCA",
    color: "#8B5CF6",
    colorEnd: "#EC4899",
    status: "live",
    url: null,
  },
  {
    id: "intake",
    name: "BXE Intake",
    description: "Investment intake portal with multi-section wizard, document uploads, and admin review.",
    icon: "\uD83D\uDCCB",
    color: "#E8871E",
    colorEnd: "#F5A623",
    status: "beta",
    url: null,
  },
];

export default function Dashboard({ user, onSignOut, onOpenApp }) {
  const displayName = user?.user_metadata?.first_name
    || user?.email?.split("@")[0]
    || "User";

  return (
    <div style={{
      minHeight: "100vh",
      background: B.bg,
      fontFamily: font,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{
        position: "fixed", top: -200, right: -150, width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(232,135,30,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: -200, left: -100, width: 500, height: 500,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", top: "40%", left: "60%", width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px clamp(20px, 4vw, 48px)",
          background: "rgba(240,242,245,0.7)",
          backdropFilter: B.blur,
          WebkitBackdropFilter: B.blur,
          borderBottom: `1px solid ${B.borderLight}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <BXELogo size={28} />
          <span style={{
            fontSize: 11, fontWeight: 700, color: B.textSecondary,
            textTransform: "uppercase", letterSpacing: "0.14em",
          }}>Portal</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: B.text }}>{displayName}</div>
            <div style={{ fontSize: 11, color: B.textMuted }}>{user?.email}</div>
          </div>
          <button
            onClick={onSignOut}
            style={{
              padding: "8px 16px", borderRadius: B.radiusSm,
              border: `1px solid ${B.border}`, background: B.white,
              fontSize: 12, fontWeight: 600, color: B.textSecondary,
              cursor: "pointer", fontFamily: font, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = B.red;
              e.currentTarget.style.color = B.red;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = B.border;
              e.currentTarget.style.color = B.textSecondary;
            }}
          >
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "clamp(32px, 6vw, 64px) clamp(20px, 4vw, 48px)",
      }}>
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 48 }}
        >
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: B.text,
            margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            Welcome back, {displayName}
          </h1>
          <p style={{
            fontSize: 15, color: B.textSecondary, marginTop: 8, marginBottom: 0,
            lineHeight: 1.6,
          }}>
            Access your BoldX Enterprises applications below.
          </p>
        </motion.div>

        {/* App Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
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
