import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeQuinielaHoy() {
  try {
    const url = "https://quinieladehoy.com/";
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    const categorias = ["PREVIA", "PRIMERA", "MATUTINA", "VESPERTINA", "NOCTURNA"];

    // Resultado final
    const resultados = {
      Provincia: {},
      Ciudad: {},
    };

    // Recorremos todas las provincias
    $("span.lrd-provincia-text").each((i, span) => {
      const texto = $(span).text().trim();

      let tipo = null;

      if (/provincia de buenos aires/i.test(texto)) tipo = "Provincia";
      if (/ciudad de buenos aires|caba/i.test(texto)) tipo = "Ciudad";

      if (!tipo) return;

      const fila = $(span).closest("tr");

      // Extraemos las 5 celdas de resultados
      const celdas = fila.find("td.lrd-resultado-cell");

      celdas.each((index, celda) => {
        const categoria = categorias[index];
        if (!categoria) return;

        // El número está siempre primero en la celda
        const data = $(celda)
          .text()
          .split("\n")
          .map(t => t.trim())
          .filter(t => t.length > 0);

        const numero = data[0] || null;

        resultados[tipo][categoria] = numero;
      });
    });

    return resultados;

  } catch (error) {
    console.error("Error scraping QuinielaDeHoy:", error);
    return null;
  }
}
