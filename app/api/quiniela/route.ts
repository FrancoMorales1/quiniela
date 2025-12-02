import { NextResponse } from "next/server";
import { getQuinielaData, setQuinielaData } from "@/lib/quinielaStore";
import { scrapeQuiniela } from "@/scripts/scrapeQuiniela";

export async function GET() {
  try {
    console.log("🔎 Actualizando quiniela en tiempo real...");

    const scraped = await scrapeQuiniela();

    if (scraped) {
      await setQuinielaData(scraped);
      console.log("✔ Datos actualizados en Supabase");
    } else {
      console.log("❌ No se pudieron obtener datos nuevos");
    }

    const data = await getQuinielaData();

    if (!data || !data.resultados) {
      return NextResponse.json(
        {
          error: "Datos no disponibles aún",
          resultados: {},
          timestamp: null,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("💥 Error en /api/quiniela:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
