import { formatHMS } from "../utils/format";
import { getFocusScore } from "../utils/analytics";

export default function SessionDetailsDrawer({ session, onClose }) {
  const end = session.end ?? Date.now();
  const duration = formatHMS(end - session.start);
  const score = session.end ? getFocusScore([session]) : "—";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          width: 380,
          background: "#141416",
          borderLeft: "1px solid #232326",
          padding: 20,
          color: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Session Details</div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
          <Detail label="Start">{new Date(session.start).toLocaleString()}</Detail>
          <Detail label="End">
            {session.end ? new Date(session.end).toLocaleString() : "Active"}
          </Detail>
          <Detail label="Duration">{duration}</Detail>
          <Detail label="Distractions">{session.distractions ?? 0}</Detail>
          <Detail label="Focus Score">
            {typeof score === "number" ? `${score}%` : score}
          </Detail>
          <Detail label="Status">{session.active ? "Active" : "Completed"}</Detail>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <div style={{ opacity: 0.6, fontSize: 12 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{children}</div>
    </div>
  );
}
