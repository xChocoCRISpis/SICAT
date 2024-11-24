/**
 * Función para formatear y desformatear textos del tipo VI-2024-AD
 */
export class HorarioFormatter {
  /**
   * Formatea un objeto con los datos (día, año, semestre) en un texto del tipo "VI-2024-AD".
   * @param dia El día de la semana en dos letras (ejemplo: "VI" para viernes).
   * @param anio El año en cuatro dígitos (ejemplo: 2024).
   * @param semestre El semestre en dos letras (ejemplo: "AD" o "EJ").
   * @returns El texto formateado.
   */
  static formatear(dia: string, anio: number, semestre: string): string {
    if (!dia || dia.length !== 2) {
      throw new Error("El día debe tener exactamente 2 letras.");
    }
    if (anio.toString().length !== 4) {
      throw new Error("El año debe tener exactamente 4 dígitos.");
    }
    if (!semestre || semestre.length !== 2) {
      throw new Error("El semestre debe tener exactamente 2 letras.");
    }
    return `${dia.toUpperCase()}-${anio}-${semestre.toUpperCase()}`;
  }

  /**
   * Desformatea un texto del tipo "VI-2024-AD" a un objeto con las partes (día, año, semestre).
   * @param texto El texto a desformatear.
   * @returns Un objeto con las partes { dia, anio, semestre }.
   */
  static desformatear(texto: string): { dia: string; anio: number; semestre: string } {
    const formato = /^(LU|MA|MI|JU|VI|SA)-\d{4}-(AD|EJ)$/;
    const match = texto.match(formato);
    if (!match) {
      throw new Error("El texto no cumple con el formato esperado (XX-YYYY-ZZ).");
    }

    const [_, dia, anio, semestre] = match;
    return {
      dia,
      anio: parseInt(anio, 10),
      semestre,
    };
  }
}

/* // Ejemplo de uso:
try {
  // Formatear
  const textoFormateado = DiaFormatter.formatear("VI", 2024, "AD");
  console.log("Texto Formateado:", textoFormateado); // Salida: "VI-2024-AD"

  // Desformatear
  const datos = DiaFormatter.desformatear("MI-2024-AD");
  console.log("Texto Desformateado:", datos); // Salida: { dia: "MI", anio: 2024, semestre: "AD" }
} catch (error) {
  console.error(error.message);
} */