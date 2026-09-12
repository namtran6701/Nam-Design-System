import { readFile, writeFile } from "node:fs/promises";
const catalog = JSON.parse(await readFile("registry.json", "utf8"));
await writeFile(
  "public/registry.json",
  JSON.stringify(catalog, null, 2) + "\n",
);
console.log(`Catalog published with ${catalog.items.length} designs.`);
