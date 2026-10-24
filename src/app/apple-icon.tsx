import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "linear-gradient(145deg, #5CB8FF 0%, #1E6EF4 55%, #0B3D91 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            fontFamily: "sans-serif",
          }}
        >
          N
        </div>
      </div>
    ),
    size,
  );
}
