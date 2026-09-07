import { useEffect, useState } from "react";

export function App(): React.JSX.Element {
  const [version, setVersion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    window.filmstrip
      .getAppVersion()
      .then((v) => {
        if (!cancelled) {
          setVersion(v);
          console.log(`[filmstrip:renderer] got app version via IPC: ${v}`);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Filmstrip</h1>
      <p>Electron + Vite + React shell is running.</p>
      <p>
        App version via IPC bridge:{" "}
        {error ? <strong style={{ color: "red" }}>{error}</strong> : version ?? "loading…"}
      </p>
    </main>
  );
}
