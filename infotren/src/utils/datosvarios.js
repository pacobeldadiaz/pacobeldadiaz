export async function cargarJsonDatosVarios() {
  try {
    // ✅ Importar JSON con ruta relativa
    const data = await import('../../public/data/datosvarios.json');

    // ✅ Extraer los valores del primer objeto del array
    const valores = data.default.length > 0 
      ? { 
          footerDisenyador: data.default[0].footerDisenyador, 
          varNumeroDeFotos: data.default[0].numeroDeFotos // 🔹 Clave modificada aquí
        }
      : { 
          footerDisenyador: "Infotren Alicante", 
          varNumeroDeFotos: 0 // 🔹 Clave modificada en el fallback
        };

    // ✅ Guardar en localStorage con la nueva clave
    localStorage.setItem('varFooterDisenyador', valores.footerDisenyador);
    localStorage.setItem('varNumeroDeFotos', valores.varNumeroDeFotos); // 🔹 Cambiada la clave

    return valores; // Retornar el objeto con los valores
  } catch (error) {
    console.error("❌ Error al obtener datosvarios.json:", error);

    // ✅ Fallback en caso de error
    const fallback = {
      footerDisenyador: "Infotren Alicante",
      varNumeroDeFotos: 0 // 🔹 Cambiada la clave en el fallback también
    };

    // ✅ Guardar el fallback en localStorage
    localStorage.setItem('varFooterDisenyador', fallback.footerDisenyador);
    localStorage.setItem('varNumeroDeFotos', fallback.varNumeroDeFotos); // 🔹 Clave corregida

    return fallback;
  }
}
