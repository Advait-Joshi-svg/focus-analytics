export default function KPICard({ label, value }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#1f1f1f",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
