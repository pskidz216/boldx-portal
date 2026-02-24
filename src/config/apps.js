// BoldX Portal — App Registry
// Add new apps here and they'll appear on the dashboard automatically.

const APPS = [
  {
    id: "travel",
    name: "BXE Travel",
    description: "Corporate travel booking, flight search, airline miles tracking, and traveler profiles.",
    icon: "\u2708\uFE0F",
    color: "#2563EB",
    colorEnd: "#06B6D4",
    status: "live",
    // Deployed URL (env var) — falls back to local dev port
    url: import.meta.env.VITE_TRAVEL_URL || "http://localhost:5174",
  },
  {
    id: "hub",
    name: "BoldX Hub",
    description: "Portfolio management, company hierarchy visualization, and deal tracking dashboard.",
    icon: "\uD83D\uDCCA",
    color: "#8B5CF6",
    colorEnd: "#EC4899",
    status: "live",
    url: import.meta.env.VITE_HUB_URL || "http://localhost:5175",
  },
  {
    id: "intake",
    name: "BXE Intake",
    description: "Investment intake portal with multi-section wizard, document uploads, and admin review.",
    icon: "\uD83D\uDCCB",
    color: "#E8871E",
    colorEnd: "#F5A623",
    status: "beta",
    url: import.meta.env.VITE_INTAKE_URL || "http://localhost:5176",
  },
];

export default APPS;
