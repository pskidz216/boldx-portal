import { useState } from "react";
import { motion } from "framer-motion";
import { B, font } from "../theme";

export default function AppCard({ app, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: B.radiusXl,
        background: hovered ? "rgba(255,255,255,0.78)" : B.glassStrong,
        backdropFilter: B.blurLg,
        WebkitBackdropFilter: B.blurLg,
        border: `1px solid ${hovered ? "rgba(232,135,30,0.25)" : B.glassBorder}`,
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(232,135,30,0.1)`
          : B.shadowMd,
        padding: "32px 28px",
        transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden",
        fontFamily: font,
      }}
    >
      {/* Accent gradient line at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${app.color}, ${app.colorEnd || app.color})`,
        borderRadius: `${B.radiusXl}px ${B.radiusXl}px 0 0`,
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: B.radiusLg,
        background: `linear-gradient(135deg, ${app.color}15, ${app.color}08)`,
        border: `1px solid ${app.color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, fontSize: 24,
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}>
        {app.icon}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 17, fontWeight: 700, color: B.text,
        marginBottom: 6, letterSpacing: "-0.01em",
      }}>
        {app.name}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 13, color: B.textSecondary, lineHeight: 1.5,
        marginBottom: 20,
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
