import { createClient } from "@supabase/supabase-js";

// Cliente con permisos de escritura (service role)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Guarda los datos en supabase
export async function setQuinielaData(data) {
  const payload = {
    timestamp: new Date().toISOString(),
    resultados: data
  };

  const { error } = await supabase
    .from("quiniela")
    .insert(payload);

  if (error) {
    console.error("❌ Error guardando datos en Supabase:", error);
  } else {
    console.log("✔ Datos guardados en Supabase");
  }
}


// Obtiene **el último registro guardado**
export async function getQuinielaData() {
  const { data, error } = await supabase
    .from("quiniela")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("❌ Error leyendo desde Supabase:", error);
    return null;
  }

  return data || null;
}
