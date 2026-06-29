/** Tiny neon loading state shown while a lazy route chunk loads. */
const RouteFallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span
      className="neon-text neon-text--cyan neon-flicker"
      style={{
        fontFamily: '"Share Tech Mono", monospace',
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        fontSize: "0.9rem",
        color: "var(--neon-cyan)",
      }}
    >
      Loading…
    </span>
  </div>
);

export default RouteFallback;
