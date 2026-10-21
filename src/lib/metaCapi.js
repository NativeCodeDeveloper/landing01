import { createHash } from "node:crypto";

/**
 * Conversions API de Meta (lado servidor).
 *
 * Solo se envían datos hasheados con SHA-256 (email, teléfono, país) más los
 * identificadores técnicos del navegador (`_fbp`, `_fbc`), la IP y el user
 * agent. Nunca enviar renta, fecha de nacimiento, clínica, cargas ni nombre:
 * Meta prohíbe los datos financieros y de salud.
 *
 * El token (`META_CAPI_ACCESS_TOKEN`) vive solo en el servidor y nunca debe
 * tener prefijo `NEXT_PUBLIC_`.
 */

const URL_GRAPH_BASE = "https://graph.facebook.com";
const VERSION_GRAPH_DEFAULT = "v24.0";
const TIMEOUT_MS = 3000;

/** @returns {string} Hash SHA-256 en minúsculas, como espera Meta. */
function hashearSha256(valor) {
    return createHash("sha256").update(valor, "utf8").digest("hex");
}

/**
 * Deja el teléfono solo con dígitos y anteponer `56` (Chile) si no lo trae.
 *
 * @returns {string | null}
 */
function normalizarTelefono(telefono) {
    const digitos = telefono.replace(/\D/g, "");
    if (!digitos) return null;
    return digitos.startsWith("56") ? digitos : `56${digitos}`;
}

/**
 * Envía el evento `Lead` a la Conversions API con el mismo `eventId` que se
 * usó en el navegador para que Meta marque el evento como deduplicado.
 *
 * Si falta el token o el ID del píxel se omite el envío en silencio; si Meta
 * rechaza el evento solo se registra el error, sin datos personales.
 *
 * @param {{
 *   eventId: string,
 *   email?: string,
 *   phone?: string,
 *   fbp?: string,
 *   fbc?: string,
 *   clientIp?: string,
 *   userAgent?: string,
 *   eventSourceUrl?: string,
 * }} parametros
 */
export async function sendLeadToMeta({
    eventId,
    email,
    phone,
    fbp,
    fbc,
    clientIp,
    userAgent,
    eventSourceUrl,
}) {
    const token = process.env.META_CAPI_ACCESS_TOKEN;
    const idPixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!token || !idPixel || !eventId) return;

    const correoNormalizado = email?.trim().toLowerCase();
    const telefonoNormalizado = phone ? normalizarTelefono(phone) : null;

    const userData = { country: [hashearSha256("cl")] };
    if (correoNormalizado) userData.em = [hashearSha256(correoNormalizado)];
    if (telefonoNormalizado) userData.ph = [hashearSha256(telefonoNormalizado)];
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const evento = {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        custom_data: { content_name: "asesoria_isapre" },
    };
    if (eventSourceUrl) evento.event_source_url = eventSourceUrl;

    const cuerpo = { data: [evento] };
    const codigoPrueba = process.env.META_TEST_EVENT_CODE;
    if (codigoPrueba) cuerpo.test_event_code = codigoPrueba;

    const respuesta = await fetch(
        `${URL_GRAPH_BASE}/${process.env.META_GRAPH_VERSION || VERSION_GRAPH_DEFAULT}/${idPixel}/events`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cuerpo),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        },
    );

    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => null);
        console.error("[META] Conversions API rechazó el evento Lead:", {
            status: respuesta.status,
            code: detalle?.error?.code,
            message: detalle?.error?.message,
        });
    }
}
