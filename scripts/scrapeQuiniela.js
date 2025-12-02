import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeQuiniela() {
  try {
    const url = "https://www.jugandoonline.com.ar/rHome.aspx";

    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    const categorias = ["PREVIA", "PRIMERA", "MATUTINA", "VESPERTINA", "NOCTURNA"];

    const resultados = {
      Provincia: {
        PREVIA: null,
        PRIMERA: null,
        MATUTINA: null,
        VESPERTINA: null,
        NOCTURNA: null,
      },
      Ciudad: {
        PREVIA: null,
        PRIMERA: null,
        MATUTINA: null,
        VESPERTINA: null,
        NOCTURNA: null,
      }
    };

    // La tabla principal de resultados en JugandoOnline es la primera tabla grande
    const tabla = $("table").first();

    tabla.find("tr").each((i, tr) => {
      const cols = $(tr).find("td");
      if (cols.length < 6) return; // nombre + 5 sorteos

      const region = $(cols[0]).text().trim().toLowerCase();

      let tipo = null;
      if (/ciudad/i.test(region) || /caba/i.test(region)) tipo = "Ciudad";
      if (/provincia/i.test(region)) tipo = "Provincia";

      if (!tipo) return;

      cols.each((j, td) => {
        if (j === 0) return;

        const nombreCategoria = categorias[j - 1];
        if (!nombreCategoria) return;

        const numero = $(td).text().trim() || null;

        resultados[tipo][nombreCategoria] = numero;
      });
    });

    return resultados;

  } catch (error) {
    console.error("Error scraping JugandoOnline:", error);
    return null;
  }
}
