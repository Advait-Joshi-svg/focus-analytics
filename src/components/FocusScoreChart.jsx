import { useEffect, useMemo, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { getFocusScore } from "../utils/analytics";

export default function FocusScoreChart({ sessions }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width ?? 0;
      setW(Math.floor(width));
    });

    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const data = useMemo(() => {
    const completed = sessions
      .filter((s) => s.end)
      .sort((a, b) => a.start - b.start);

    return completed.map((s, i) => ({
      name: `S${i + 1}`,
      score: getFocusScore([s]),
    }));
  }, [sessions]);

  if (data.length === 0) {
    return <p style={{ opacity: 0.7 }}>No completed sessions yet.</p>;
  }

  // If width is not measurable yet, render a placeholder box with height.
  if (w <= 0) {
    return <div ref={wrapRef} style={{ width: "100%", height: 260 }} />;
  }

  const height = 260;

  return (
    <div ref={wrapRef} style={{ width: "100%", minWidth: 0, overflow: "hidden" }}>
      <LineChart width={w} height={height} data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="score" dot={false} />
      </LineChart>
    </div>
  );
}
