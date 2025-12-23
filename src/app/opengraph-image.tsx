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
          background: "#fff7fa",
          color: "#200d15",
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
                border: "3px solid #f5c7d6",
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
                  background: "#ea4c89",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff7fa",
                  fontSize: 22,
                  fontWeight: 900,
                }}
              >
                CB1
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#ea4c89" }}>
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
              border: "2px solid #f5c7d6",
              background: "#ffffff",
              fontSize: 16,
              fontWeight: 700,
              color: "#6b3a4d",
            }}
          >
            Apenas na praia
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-1.6px",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Bebidas e porções
            <br />
            rápido no celular
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: "#6b3a4d",
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
            borderTop: "2px solid #f5c7d6",
            paddingTop: 18,
            color: "#6b3a4d",
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
