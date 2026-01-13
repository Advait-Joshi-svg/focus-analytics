import { useEffect, useState } from "react";
import KPICard from "./KPICard";
import {
  getTotalFocusMs,
  getTotalDistractionsAll,
  getFocusScore,
  getDistractionsPerHour,
} from "../utils/analytics";
import { formatHMS } from "../utils/format";

export default function MetricsCards({ sessions }) {
  // tick while active sessions exist
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const hasActive = sessions.some((s) => s.active);
    if (!hasActive) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [sessions]);
  void now;

  const totalMs = getTotalFocusMs(sessions);
  const distractions = getTotalDistractionsAll(sessions);
  const focusScore = getFocusScore(sessions);
  const dph = getDistractionsPerHour(sessions);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      <KPICard label="Total Focus Time" value={formatHMS(totalMs)} />
      <KPICard label="Total Distractions" value={distractions} />
      <KPICard label="Focus Score" value={`${focusScore}%`} />
      <KPICard label="Distractions / Hour" value={dph} />
    </div>
  );
}
