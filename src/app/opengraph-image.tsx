import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#09090b", padding: 64, color: "#ededef" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>{`${site.brand} ${site.name}`}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.04, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>{hero.titleStart}</div>
          <div style={{ display: "flex", color: "#8a8a94" }}>{hero.titleEnd}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6a5ce6" }}>{hero.role}</div>
      </div>
    ),
    size,
  );
}
