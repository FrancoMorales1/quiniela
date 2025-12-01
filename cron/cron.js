import cron from "node-cron";
import { scrapeQuinielaHoy } from "../scripts/scrapeQuiniela.js";
import { setQuinielaData } from "../lib/quinielaStore.js";

async function updateQuiniela() {
  console.log("⏱ Actualizando quiniela en RAM...");

  const data = await scrapeQuinielaHoy();
  
  if (data) {
    setQuinielaData(data);
    console.log("✔ Quiniela actualizada en memoria");
  } else {
    console.log("❌ Error al obtener datos");
  }
}

updateQuiniela();

const task = cron.schedule("*/10 * * * *", updateQuiniela);

task.start();

export default task;