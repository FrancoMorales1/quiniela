import fs from "fs";

export function setQuinielaData(data) {
  const payload = {
    timestamp: new Date().toISOString(),
    resultados: data
  };
  fs.writeFileSync("quiniela.json", JSON.stringify(payload, null, 2));
}

export function getQuinielaData() {
  if (!fs.existsSync("quiniela.json")) return null;
  return JSON.parse(fs.readFileSync("quiniela.json", "utf8"));
}
