import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fff7ed",
          color: "#2b1605",
          padding: 64,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                border: "3px solid #fed7aa",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 999,
                  background: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff7ed",
                  fontSize: 22,
                  fontWeight: 900,
                }}
              >
                CB1
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f97316" }}>
                Cardápio
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.8px" }}>
                Cantina Bougainville 1
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: 999,
              border: "2px solid #fed7aa",
              background: "#ffffff",
              fontSize: 16,
              fontWeight: 700,
              color: "#7c3f12",
            }}
          >
            Praia e Cantina/Casa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-1.6px",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            <div>Bebidas e porções</div>
            <div>rápido no celular</div>
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: "#7c3f12",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Consulte itens, preços e faça o pedido pelo WhatsApp.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #fed7aa",
            paddingTop: 18,
            color: "#7c3f12",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <div>Imagens ilustrativas • Preços sujeitos a alteração</div>
          <div>Desenvolvido por Otávio Emanoel de Lima</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
