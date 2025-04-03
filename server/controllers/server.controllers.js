const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const todayNotes = async (req, res) => {
  try {
    // Obtener el número de categorías
    const { data: categories, error: catError } = await supabase
      .from("categoria") // Asegúrate de que el nombre de la tabla de categorías es correcto
      .select("id");

    if (catError) throw catError;

    const categoryCount = categories.length; // Número de categorías

    // Obtener las notas más cercanas con el límite basado en el número de categorías
    const { data: notas, error: notasError } = await supabase
      .from("notesis")
      .select(`*, categoria (id,nombre), fuentes(*)`)
      .order("publday", { ascending: false }) // Ordena por la fecha más cercana
      .limit(categoryCount); // Límite basado en el número de categorías

    if (notasError) throw notasError;

    return res.json(notas);
  } catch (e) {
    console.error("Error fetching data from Supabase:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  todayNotes,
};
