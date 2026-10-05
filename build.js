const fs = require("node:fs");
const path = require("node:path");

const projectRoot = __dirname;
const outputDirectory = path.join(projectRoot, "dist");
const siteFiles = ["index.html", "style.css", "data.js", "games.js", "script.js", "sw.js"];

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of siteFiles) {
  fs.copyFileSync(path.join(projectRoot, file), path.join(outputDirectory, file));
}

console.log(`Built ${siteFiles.length} static files into dist/`);
