import { useSessions } from "../hooks/useSessions";

export default function DebugPanel() {
  const {
    sessions,
    activeSession,
    startSession,
    endSession,
    addDistraction,
    resetAll,
  } = useSessions();

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Debug Panel</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={startSession} disabled={!!activeSession}>
          Start
        </button>
        <button onClick={endSession} disabled={!activeSession}>
          End
        </button>
        <button onClick={() => addDistraction(1)} disabled={!activeSession}>
          + Distraction
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div><b>Active session:</b> {activeSession ? activeSession.id : "None"}</div>
        <div><b>Total sessions:</b> {sessions.length}</div>
      </div>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(sessions, null, 2)}
      </pre>
    </div>
  );
}
