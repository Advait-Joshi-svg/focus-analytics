export default function Dashboard({ sidebar, topbar, controls, kpis, charts, table }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f10" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#141416",
          borderRight: "1px solid #232326",
          padding: 18,
          color: "white",
        }}
      >
        {sidebar}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <div
          style={{
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid #232326",
            background: "#0f0f10",
            color: "white",
          }}
        >
          {topbar}
        </div>

        {/* Content */}
        <div style={{ padding: 24, minWidth:0 }}>
          {/* Controls row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {controls}
          </div>

          {/* KPI row */}
          <div style={{ marginBottom: 16 }}>
            {kpis}
          </div>

          {/* Grid: charts + table */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 16,
            }}
          >
            <div style={{ gridColumn: "span 7",minWidth:0 }}>{charts}</div>
            <div style={{ gridColumn: "span 5",minWidth:0 }}>{table}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
