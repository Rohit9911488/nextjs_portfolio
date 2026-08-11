export default function MaintenanceScreen() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        background: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "28rem" }}>
        <h1
          style={{
            margin: "0 0 0.75rem",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          Site temporarily unavailable
        </h1>
        <p style={{ margin: 0, color: "#a3a3a3", lineHeight: 1.6 }}>
          Please check back soon.
        </p>
      </div>
    </main>
  );
}
