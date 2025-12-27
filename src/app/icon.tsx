import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff7ed",
          borderRadius: 8,
          border: "2px solid #fed7aa",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "#f97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff7ed",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          CB
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
