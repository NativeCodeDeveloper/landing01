/**
 * Opciones compartidas entre el formulario del cliente y la validación del
 * servidor. Mantener una sola fuente evita que el navegador acepte un valor
 * que la API después rechaza.
 */

/** Sistema de salud actual. Sirve para priorizar leads: FONASA no es cambio de ISAPRE. */
export const SISTEMAS_SALUD = [
    { valor: "ISAPRE", etiqueta: "Estoy en una ISAPRE" },
    { valor: "FONASA", etiqueta: "Estoy en FONASA" },
    { valor: "No lo sé", etiqueta: "No estoy seguro" },
];

/**
 * Tramos de renta imponible. Pedir un tramo en vez de un monto exacto baja
 * mucho la fricción: sigue siendo útil para cotizar y se siente menos invasivo.
 */
export const TRAMOS_RENTA = [
    { valor: "Menos de $500.000", etiqueta: "Menos de $500.000" },
    { valor: "$500.000 - $900.000", etiqueta: "$500.000 - $900.000" },
    { valor: "$900.000 - $1.500.000", etiqueta: "$900.000 - $1.500.000" },
    { valor: "$1.500.000 - $2.500.000", etiqueta: "$1.500.000 - $2.500.000" },
    { valor: "Más de $2.500.000", etiqueta: "Más de $2.500.000" },
    { valor: "Prefiero conversarlo", etiqueta: "Prefiero conversarlo con el asesor" },
];

/** Respuesta sobre cargas familiares. */
export const OPCIONES_CARGAS = [
    { valor: "Sí", etiqueta: "Sí, tengo cargas" },
    { valor: "No", etiqueta: "No tengo cargas" },
];

/**
 * Sugerencias de clínicas para el autocompletado. El campo sigue siendo texto
 * libre y opcional: sugerir no es limitar.
 */
export const CLINICAS_SUGERIDAS = [
    "Clínica Alemana",
    "Clínica Las Condes",
    "Clínica Santa María",
    "Clínica Dávila",
    "Clínica Indisa",
    "Clínica U. de los Andes",
    "Clínica Bupa Santiago",
    "Clínica RedSalud",
    "Hospital Clínico U. de Chile",
    "Clínica Universidad Católica",
    "Clínica Bicentenario",
    "Clínica Vespucio",
    "Clínica Tabancura",
    "Clínica Ciudad del Mar",
    "Clínica Reñaca",
    "Clínica Alemana de Valdivia",
    "Clínica Universitaria de Concepción",
    "Aún no lo tengo decidido",
];

/** Texto que se guarda cuando la persona no indica clínica. */
export const CLINICA_SIN_PREFERENCIA = "Sin preferencia indicada";

/** @param {readonly {valor: string}[]} opciones */
export function valoresDe(opciones) {
    return opciones.map((opcion) => opcion.valor);
}
