import { useState } from "react";
import { motion } from "framer-motion";
import { B, font } from "../theme";

export default function AppCard({ app, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: B.radiusXl,
        background: hovered
          ? "rgba(255,255,255,0.55)"
          : "rgba(255,255,255,0.35)",
        backdropFilter: B.blurLg,
        WebkitBackdropFilter: B.blurLg,
        border: `1.5px solid ${hovered ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.55)"}`,
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.3), 0 0 60px ${app.color}12`
          : "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.15)",
        padding: "32px 28px",
        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        overflow: "hidden",
        fontFamily: font,
      }}
    >
      {/* Top edge glass highlight — refraction line */}
      <div style={{
        position: "absolute", top: 0, left: 16, right: 16, height: 1,
        background: `linear-gradient(90deg, transparent, rgba(255,255,255,${hovered ? 0.9 : 0.6}), transparent)`,
        transition: "all 0.4s",
      }} />

      {/* Inner glow at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 80,
        background: `linear-gradient(180deg, rgba(255,255,255,${hovered ? 0.25 : 0.15}), transparent)`,
        borderRadius: `${B.radiusXl}px ${B.radiusXl}px 0 0`,
        pointerEvents: "none",
        transition: "all 0.4s",
      }} />

      {/* Accent gradient line at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${app.color}, ${app.colorEnd || app.color})`,
        borderRadius: `${B.radiusXl}px ${B.radiusXl}px 0 0`,
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s",
      }} />

      {/* Icon — glass circle */}
      <div style={{
        width: 56, height: 56, borderRadius: B.radiusLg,
        background: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))`,
        border: `1px solid rgba(255,255,255,0.6)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, fontSize: 26,
        transition: "all 0.4s",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        boxShadow: hovered
          ? `0 4px 20px ${app.color}25, inset 0 1px 0 rgba(255,255,255,0.6)`
          : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}>
        {app.icon}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 18, fontWeight: 700, color: B.text,
        marginBottom: 8, letterSpacing: "-0.01em",
      }}>
        {app.name}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 13, color: B.textSecondary, lineHeight: 1.6,
        marginBottom: 22,
      }}>
        {app.description}
      </div>

      {/* Status / CTA */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: app.status === "live" ? B.green : app.status === "beta" ? B.yellow : B.textMuted,
            boxShadow: app.status === "live"
              ? `0 0 8px ${B.green}50`
              : app.status === "beta"
                ? `0 0 8px ${B.yellow}50`
                : "none",
          }} />
          <span style={{
            fontSize: 11, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: app.status === "live" ? B.green : app.status === "beta" ? B.yellow : B.textMuted,
          }}>
            {app.status === "live" ? "Live" : app.status === "beta" ? "Beta" : "Coming Soon"}
          </span>
        </div>

        <div style={{
          fontSize: 13, fontWeight: 600, color: B.orange,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          Open
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
