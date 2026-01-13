import { formatHMS } from "../utils/format";
import { getFocusScore } from "../utils/analytics";

export default function SessionTable({ sessions, onSelect }) {
  const sorted = [...sessions].sort((a, b) => b.start - a.start);

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#1f1f1f",
        height: 420,
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Sessions</h3>

      {sorted.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No sessions yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
  <thead>
    <tr style={{ textAlign: "left", opacity: 0.7 }}>
      <th style={{ paddingBottom: 8 }}>Start</th>
      <th style={{ paddingBottom: 8 }}>Duration</th>
      <th style={{ paddingBottom: 8 }}>Distr.</th>
      <th style={{ paddingBottom: 8 }}>Score</th>
      <th style={{ paddingBottom: 8 }}>Status</th>
    </tr>
  </thead>

  <tbody>
    {sorted.map((s) => {
      const end = s.end ?? Date.now();
      const dur = formatHMS(end - s.start);
      const score = s.end ? getFocusScore([s]) : "—";

      const status = s.active ? "Active" : "Completed";
      const statusColor = s.active ? "#4ade80" : "#a1a1aa";

      return (
        <tr
          key={s.id}
          onClick={()=>onSelect?.(s)}
          style={{
            borderTop: "1px solid #2f2f2f",
            cursor: "pointer",
          }}
        >
          <td style={{ padding: "10px 0" }}>
            {new Date(s.start).toLocaleTimeString()}
          </td>

          <td style={{ padding: "10px 0" }}>{dur}</td>

          <td style={{ padding: "10px 0" }}>{s.distractions || 0}</td>

          <td style={{ padding: "10px 0", fontWeight: 600 }}>
            {typeof score === "number" ? `${score}%` : score}
          </td>

          <td
            style={{
              padding: "10px 0",
              fontWeight: 600,
              color: statusColor,
            }}
          >
            {status}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

      )}
    </div>
  );
}
