/**
 * Downloads every Higgsfield still and film listed in content/media.ts into public/media, so the
 * site can serve them itself (set NEXT_PUBLIC_MEDIA_LOCAL=1 afterwards).
 * Usage: pnpm media:pull
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../content/media.ts", import.meta.url), "utf8");
const cdn = Object.fromEntries([...source.matchAll(/const (CDN|MEDIA_CDN) = "([^"]+)"/g)].map((m) => [m[1], m[2]]));
const entries = [...source.matchAll(/file: "([^"]+)",\s*cdn: "([^"]+)"/g)].map(([, file, name]) => ({
  file,
  url: `${file.endsWith(".mp4") ? cdn.MEDIA_CDN : cdn.CDN}/${name}`,
}));

const out = join(process.cwd(), "public/media");
await mkdir(out, { recursive: true });
for (const { file, url } of entries) {
  const target = join(out, file);
  if (await stat(target).catch(() => null)) {
    console.log(`skip  ${file}`);
    continue;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${file}`);
}
