import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeQuiniela() {
  try {
    const url = "https://www.jugandoonline.com.ar/rHome.aspx";

    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    const categorias = ["PREVIA", "PRIMERA", "MATUTINA", "VESPERTINA", "NOCTURNA"];

    const resultados = {
      Provincia: {
        PREVIA: null,
        PRIMERA: null,
        MATUTINA: null,
        VESPERTINA: null,
        NOCTURNA: null
      },
      Ciudad: {
        PREVIA: null,
        PRIMERA: null,
        MATUTINA: null,
        VESPERTINA: null,
        NOCTURNA: null
      }
    };

    const ciudad = $(".row.text-center.quinielas2021-moviles")
      .first()
      .find("div.col-xs-5");

    ciudad.each((i, el) => {
      const categoria = categorias[i];
      if (!categoria) return;

      const numero = $(el).find(".enlaces-numeros").text().trim() || null;

      resultados.Ciudad[categoria] = numero;
    });

    const provincia = $(".container.ProvBsAs")
      .find(".quinielas2021-moviles")
      .first()
      .find("div.col-xs-5");

    provincia.each((i, el) => {
      const categoria = categorias[i];
      if (!categoria) return;

      const numero = $(el).find(".enlaces-numeros").text().trim() || null;

      resultados.Provincia[categoria] = numero;
    });

    return resultados;

  } catch (error) {
    console.error("Error scraping JugandoOnline:", error);
    return null;
  }
}