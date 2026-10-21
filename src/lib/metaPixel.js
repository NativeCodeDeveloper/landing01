/**
 * Helper del píxel de Meta para el navegador.
 *
 * `window.fbq` es la cola que instala el snippet cargado en
 * `components/MetaPixel.jsx`. Si el píxel no está disponible (bloqueadores,
 * carga pendiente), los helpers no hacen nada y nunca lanzan errores.
 *
 * Importante: nunca enviar aquí renta, fecha de nacimiento, clínica, cargas
 * ni nombre; son datos financieros/de salud que Meta prohíbe.
 */

/**
 * @typedef {(comando: "track" | "trackCustom", nombreEvento: string, parametros?: Record<string, unknown>, opciones?: { eventID?: string }) => void} Fbq
 */

/** @returns {Fbq | undefined} La cola global `fbq`, si existe. */
function obtenerFbq() {
    if (typeof window === "undefined") return undefined;
    return window.fbq;
}

/**
 * Dispara un evento estándar del píxel. Si se entrega `eventId`, el mismo
 * identificador debe usarse en la Conversions API para que Meta deduplique.
 */
export function trackEvent(nombreEvento, parametros, eventId) {
    const fbq = obtenerFbq();
    if (!fbq) return;

    if (eventId) {
        fbq("track", nombreEvento, parametros, { eventID: eventId });
    } else {
        fbq("track", nombreEvento, parametros);
    }
}

/** Dispara un evento personalizado del píxel (sin pasar por el catálogo de Meta). */
export function trackCustom(nombreEvento, parametros) {
    const fbq = obtenerFbq();
    if (!fbq) return;

    fbq("trackCustom", nombreEvento, parametros);
}

/**
 * Lee las cookies `_fbp` y `_fbc` que Meta usa para unir el evento del
 * navegador con el clic del anuncio. Si la visita llegó con `?fbclid=` y aún
 * no existe `_fbc`, lo construye con el formato que espera Meta.
 *
 * @returns {{ fbp?: string, fbc?: string }}
 */
export function getMetaCookies() {
    if (typeof window === "undefined") return {};

    let fbp;
    let fbc;

    for (const cookie of document.cookie.split(";")) {
        const separador = cookie.indexOf("=");
        if (separador === -1) continue;

        const nombre = cookie.slice(0, separador).trim();
        if (nombre === "_fbp") fbp = cookie.slice(separador + 1);
        if (nombre === "_fbc") fbc = cookie.slice(separador + 1);
    }

    if (!fbc) {
        const fbclid = new URLSearchParams(window.location.search).get("fbclid");
        if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    }

    return { fbp, fbc };
}

/**
 * Identificador de evento para la deduplicación Navegador ↔ Servidor.
 *
 * @returns {string}
 */
export function crearIdEvento() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
