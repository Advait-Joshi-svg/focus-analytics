export default function FilterBar({ value, onChange }) {
  const btn = (active) => ({
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #2f2f2f",
    background: active ? "#2a2a2a" : "#1f1f1f",
    color: "white",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button style={btn(value === "TODAY")} onClick={() => onChange("TODAY")}>Today</button>
      <button style={btn(value === "WEEK")} onClick={() => onChange("WEEK")}>Last 7 days</button>
      <button style={btn(value === "ALL")} onClick={() => onChange("ALL")}>All time</button>
    </div>
  );
}
