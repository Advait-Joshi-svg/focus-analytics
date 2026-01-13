import { useEffect, useRef, useState } from "react";

function useElementWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width ?? 0;
      setW(width);
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, w];
}

export default function DashboardGrid({ kpis, leftChart, rightChart, table, pie }) {
  const [ref, w] = useElementWidth();

  // breakpoints based on actual available space (after sidebar/padding)
  const mode = w < 900 ? "stack" : w < 1200 ? "twoColEqual" : "wide";
  const leftSpan = mode === "wide" ? "span 9" : "span 6";
  const rightSpan = mode === "wide" ? "span 3" : "span 6";

  const isStack = mode === "stack";

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 16,
      }}
    >
      <div style={{ gridColumn: "span 12", minWidth: 0 }}>{kpis}</div>

      <div style={{ gridColumn: isStack ? "span 12" : leftSpan, minWidth: 0 }}>
        {leftChart}
      </div>
      <div style={{ gridColumn: isStack ? "span 12" : rightSpan, minWidth: 0 }}>
        {rightChart}
      </div>

      <div style={{ gridColumn: isStack ? "span 12" : leftSpan, minWidth: 0 }}>
        {table}
      </div>
      <div style={{ gridColumn: isStack ? "span 12" : rightSpan, minWidth: 0 }}>
        {pie}
      </div>
    </div>
  );
}
