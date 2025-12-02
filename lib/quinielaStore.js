import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function setQuinielaData(data) {
  const payload = {
    timestamp: new Date().toISOString(),
    resultados: data
  };

  const { error } = await supabase
    .from("quiniela")
    .update(payload)
    .eq("id", 1);

  if (error) {
    console.error("❌ Error guardando datos en Supabase:", error);
  } else {
    console.log("✔ Quiniela actualizada");
  }
}

export async function getQuinielaData() {
  const { data, error } = await supabase
    .from("quiniela")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("❌ Error leyendo desde Supabase:", error);
    return null;
  }

  return data || null;
}
