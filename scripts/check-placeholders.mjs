// Lists bracketed launch placeholders ("[N]", "[X] hours", "[TBD]") left in /content.
// Run before launch: `pnpm check:placeholders`. Exits 1 if any are found.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../content", import.meta.url).pathname;
const pattern = /\[(?:N|X|Y|TBD)\]/;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|mdx?)$/.test(name)) {
      readFileSync(path, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (line.match(pattern)) hits.push(`${path.replace(root, "content")}:${i + 1}  ${line.trim()}`);
        });
    }
  }
}

walk(root);
if (hits.length) {
  console.log(`${hits.length} placeholder(s) to fill before launch:\n`);
  console.log(hits.join("\n"));
  process.exit(1);
}
console.log("No placeholders left in /content.");
