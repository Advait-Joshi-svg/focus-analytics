export default function DashboardShell({ sidebar, topbar, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f10" }}>
      <aside
        style={{
          width: 260,
          background: "#141416",
          borderRight: "1px solid #232326",
          padding: 18,
        }}
      >
        {sidebar}
      </aside>

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid #232326",
            background: "#0f0f10",
          }}
        >
          {topbar}
        </div>

        <div
  style={{
    padding: 16,
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  }}
>
  {children}
</div>

      </main>
    </div>
  );
}
