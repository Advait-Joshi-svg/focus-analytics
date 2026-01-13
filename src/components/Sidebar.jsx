export default function Sidebar({ view, onChange }) {
  const item = (key) => ({
    padding: "10px 12px",
    borderRadius: 10,
    background: view === key ? "#1b1b1f" : "transparent",
    cursor: "pointer",
    fontSize: 14,
  });

  return (
    <div>
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 18 }}>
        FOCUS
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={item("dashboard")} onClick={() => onChange("dashboard")}>
          Main Dashboard
        </div>
        <div style={item("sessions")} onClick={() => onChange("sessions")}>
          Sessions
        </div>
        <div style={item("insights")} onClick={() => onChange("insights")}>
          Insights
        </div>
        <div style={item("settings")} onClick={() => onChange("settings")}>
          Settings
        </div>
      </div>
    </div>
  );
}
