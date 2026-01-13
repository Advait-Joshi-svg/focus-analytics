export default function Topbar({ title, onSearch }) {
  return (
    <>
      <div style={{ color: "white" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Pages / {title}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth:0 }}>
        <div
              style={{
                flex: 1,
                maxWidth: 420,
                minWidth: 180,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderRadius: 14,
                background: "#151518",
                border: "1px solid #232326",
              }}
            >
          <span style={{ opacity: 0.7 }}>🔎</span>
          <input
            placeholder="Search sessions..."
            onChange={(e) => onSearch?.(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              color: "white",
              width: "100%",
            }}
          />
        </div>

        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#2a2a2e",
            display: "grid",
            placeItems: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          AJ
        </div>
      </div>
    </>
  );
}
