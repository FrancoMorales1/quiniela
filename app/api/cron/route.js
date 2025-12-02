import { NextResponse } from "next/server";
import { scrapeQuinielaHoy } from "@/scripts/scrapeQuiniela";
import { setQuinielaData } from "@/lib/quinielaStore";

export async function GET(req) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("⏱ Ejecutando cron desde Vercel...");

  const data = await scrapeQuinielaHoy();

  if (data) {
    setQuinielaData(data);
    console.log("✔ Quiniela actualizada en memoria");
  } else {
    console.log("❌ Error al obtener datos");
  }

  return NextResponse.json({ ok: true });
}
