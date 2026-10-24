"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f7f9fc",
          color: "#3a3a3c",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <p style={{ color: "#1e6ef4", fontWeight: 600, marginBottom: "0.5rem" }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>Application error</h1>
          <p style={{ lineHeight: 1.6, marginBottom: "1.25rem" }}>
            NashBizHub hit an unexpected error. You can try again, or return to the homepage.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#1e6ef4",
                color: "#fff",
                border: 0,
                borderRadius: 10,
                padding: "0.75rem 1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 10,
                padding: "0.75rem 1rem",
                border: "1px solid #dce4ee",
                textDecoration: "none",
                color: "#3a3a3c",
                fontWeight: 600,
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
