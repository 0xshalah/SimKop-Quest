import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Simkop-Quest — Simulasi Koperasi Desa untuk Gen-Z";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#060b18 0%,#0e1a3a 60%,#1a0a3a 100%)",
          fontFamily: "system-ui,sans-serif", padding: 80, gap: 24,
        }}
      >
        {/* glow orbs */}
        <div style={{ position:"absolute", width:480, height:480, borderRadius:"50%",
          background:"rgba(79,126,255,.25)", filter:"blur(100px)", top:-100, left:-80 }} />
        <div style={{ position:"absolute", width:440, height:440, borderRadius:"50%",
          background:"rgba(123,71,255,.2)", filter:"blur(100px)", bottom:-100, right:-60 }} />

        <div style={{ fontSize:56, lineHeight:1 }}>🪙</div>

        <div style={{ fontSize:72, fontWeight:900, color:"#eef2ff", textAlign:"center",
          lineHeight:1.1, letterSpacing:"-2px" }}>
          Simkop<span style={{ color:"#4f7eff" }}>Quest</span>
        </div>

        <div style={{ fontSize:30, color:"#9aa9c9", textAlign:"center", maxWidth:800 }}>
          Geser kartu · Pimpin koperasi desamu · Bangkrut atau berjaya
        </div>

        <div style={{ display:"flex", gap:32, marginTop:16 }}>
          {[["74 jt","Gen-Z Indonesia"],["51,7%","Literasi koperasi"],["80rb+","Kopdes butuh pemimpin"]].map(
            ([n, l]) => (
              <div key={n} style={{ display:"flex", flexDirection:"column", alignItems:"center",
                background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)",
                borderRadius:16, padding:"16px 28px", gap:4 }}>
                <span style={{ fontSize:36, fontWeight:800, color:"#4f7eff" }}>{n}</span>
                <span style={{ fontSize:16, color:"#8898bb" }}>{l}</span>
              </div>
            )
          )}
        </div>

        <div style={{ position:"absolute", bottom:32, fontSize:18, color:"#5a6a88" }}>
          Pilar 4 · Hackathon Digital Cooperatives Expo 2026 · Kemenkop RI × PEBS FEB UI
        </div>
      </div>
    ),
    { ...size },
  );
}
