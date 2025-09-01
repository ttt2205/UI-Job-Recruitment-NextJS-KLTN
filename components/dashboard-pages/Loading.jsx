export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "1rem",
      }}
    >
      <div
        class="spinner-border text-primary"
        role="status"
        style={{ width: "2rem", height: "2rem" }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
