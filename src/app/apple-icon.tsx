import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

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
          background: "#fff7ed",
        }}
      >
        <div
          style={{
            width: 152,
            height: 152,
            borderRadius: 40,
            border: "4px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 999,
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff7ed",
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            CB1
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
