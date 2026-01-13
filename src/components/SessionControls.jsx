export default function SessionControls({
  activeSession,
  onStart,
  onEnd,
  onDistraction,
  onReset,
}) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      {!activeSession ? (
        <button onClick={onStart}>Start Session</button>
      ) : (
        <>
          <button onClick={onEnd}>End Session</button>
          <button onClick={() => onDistraction(1)}>+ Distraction</button>
        </>
      )}

      <button onClick={onReset}>Reset</button>
    </div>
  );
}
