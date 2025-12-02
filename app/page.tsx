"use client";

import useSWR from "swr";
import Footer from "@/components/Footer";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/quiniela", fetcher, {
    refreshInterval: 300000,
  });

  if (!data || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-4xl font-bold">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-4xl font-bold">
        Error cargando datos
      </div>
    );
  }

  const provincia = data.resultados.Provincia || {};
  const ciudad = data.resultados.Ciudad || {};

  const ordenSorteos = [
    "PREVIA",
    "PRIMERA",
    "MATUTINA",
    "VESPERTINA",
    "NOCTURNA",
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-10">
      <h1 className="text-5xl font-extrabold text-center">❤️ TU NIETO TE AMA ❤️</h1>
      
      <div className="flex flex-col gap-10">
        {ordenSorteos.map((sorteo) => {
          const numProvincia = provincia[sorteo] || "-----";
          const numCiudad = ciudad[sorteo] || "-----";

          return (
            <div
              key={sorteo}
              className="bg-zinc-900 rounded-2xl p-6 text-center shadow-xl"
            >
              <h2 className="text-4xl font-bold mb-6 text-yellow-300">
                {sorteo}
              </h2>

              <div className="flex flex-col gap-6">
                {/* Provincia */}
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-yellow-400">
                    Provincia
                  </h3>
                  <p className="text-5xl tracking-widest font-extrabold">
                    {numProvincia}
                  </p>
                </div>

                {/* Ciudad */}
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-300">
                    Ciudad
                  </h3>
                  <p className="text-5xl tracking-widest font-extrabold">
                    {numCiudad}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
