export default function Panel({ title, children, height }) {
  return (
    <div
      style={{
        background: "#151518",
        border: "1px solid #232326",
        borderRadius: 14,
        padding: 16,
        color: "white",
        minWidth: 0,
        minHeight: 320,
        height: height ?? "auto",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
