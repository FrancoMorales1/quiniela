import { NextResponse } from "next/server";
import { getQuinielaData } from "@/lib/quinielaStore";

export async function GET() {
  const data = getQuinielaData();    
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
}
