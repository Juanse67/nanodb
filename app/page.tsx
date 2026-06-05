export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>My NAS app</h1>
      <p>
        Health check: <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
