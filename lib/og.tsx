import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let iconCache: string | null = null;
async function icon() {
  if (!iconCache) {
    const buf = await readFile(join(process.cwd(), "public/assets/chanium-icon.png"));
    iconCache = `data:image/png;base64,${buf.toString("base64")}`;
  }
  return iconCache;
}

/** Shared OG card: brand mark, eyebrow, title. Used by every route's opengraph-image. */
export async function renderOg({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const src = await icon();
  const fontSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 78;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(79,123,255,0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(79,123,255,0.18), transparent 50%)",
          color: "#F4F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={56} height={56} alt="" />
          <div style={{ fontSize: 28, letterSpacing: 10, color: "#C8CDD2" }}>CHANIUM</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {eyebrow && (
            <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#A9C0FF" }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8A8F98" }}>
          Fixed price · Fixed date · You own 100% of the code
        </div>
      </div>
    ),
    ogSize,
  );
}
