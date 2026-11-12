import { generarCorreoContacto } from "./plantilla-correo.mjs";
import { sendLeadToMeta } from "@/lib/metaCapi";

function texto(valor) {
  return typeof valor === "string" ? valor.trim().replace(/\s+/g, " ") : "";
}

function obtenerIpCliente(request) {
  const reenviadas = request.headers.get("x-forwarded-for");
  if (reenviadas) {
    const primera = reenviadas.split(",")[0]?.trim();
    if (primera) return primera;
  }
  return request.headers.get("x-real-ip") || undefined;
}

export async function POST(request) {
  let cuerpo;

  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ success: false, message: "Los datos del formulario no son válidos." }, { status: 400 });
  }

  if (!cuerpo || typeof cuerpo !== "object" || Array.isArray(cuerpo)) {
    return Response.json({ success: false, message: "Los datos del formulario no son válidos." }, { status: 400 });
  }

  const datos = {
    nombre: texto(cuerpo.nombre),
    correo: texto(cuerpo.correo),
    telefono: texto(cuerpo.telefono),
  };

  const digitosTelefono = datos.telefono.replace(/\D/g, "");

  const camposInvalidos = [];
  if (datos.nombre.length < 2 || datos.nombre.length > 120) camposInvalidos.push("nombre");
  if (datos.correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) camposInvalidos.push("correo");
  if (digitosTelefono.length < 8 || digitosTelefono.length > 15
    || datos.telefono.length > 30
    || !/^\+?[\d\s()-]+$/.test(datos.telefono)) camposInvalidos.push("teléfono");

  if (camposInvalidos.length > 0) {
    return Response.json({
      success: false,
      message: `Revisa el campo ${camposInvalidos.join(", ")} e inténtalo nuevamente.`,
    }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const correoRemitente = process.env.CORREO_REMITENTE;
  const correoDestino = process.env.CORREO_QUE_RECIBE;

  if (!apiKey || !correoRemitente || !correoDestino) {
    console.error("[CORREOS] Faltan variables de configuración para Brevo.");
    return Response.json({ success: false, message: "El correo no está disponible en este momento." }, { status: 503 });
  }

  try {
    const respuestaBrevo = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: correoRemitente, name: "Tu salud, tu tranquilidad" },
        to: [{ email: correoDestino }],
        replyTo: { email: datos.correo, name: datos.nombre },
        subject: "Nueva solicitud de asesoría en salud previsional",
        htmlContent: generarCorreoContacto(datos),
      }),
      signal: AbortSignal.timeout(15000),
    });

    const resultadoBrevo = await respuestaBrevo.json().catch(() => ({}));

    if (!respuestaBrevo.ok) {
      console.error("[CORREOS] Brevo rechazó la solicitud:", {
        status: respuestaBrevo.status,
        code: resultadoBrevo.code,
        message: resultadoBrevo.message,
      });
      return Response.json({ success: false, message: "No pudimos enviar tu solicitud. Inténtalo nuevamente." }, { status: 502 });
    }

    // Conversions API de Meta: solo después de procesar bien el lead. Un
    // fallo aquí no afecta la respuesta al usuario (sendLeadToMeta ya limita
    // el tiempo a ~3 s; los datos sensibles viajan solo hasheados).
    try {
      await sendLeadToMeta({
        eventId: texto(cuerpo.metaEventId) || undefined,
        email: datos.correo,
        phone: datos.telefono,
        fbp: texto(cuerpo.fbp) || undefined,
        fbc: texto(cuerpo.fbc) || undefined,
        clientIp: obtenerIpCliente(request),
        userAgent: request.headers.get("user-agent") || undefined,
        eventSourceUrl: texto(cuerpo.eventSourceUrl) || undefined,
      });
    } catch (error) {
      console.error("[META] No se pudo registrar el Lead en la Conversions API:", error);
    }

    return Response.json({
      success: true,
      message: "Recibimos tu solicitud. Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("[CORREOS] No se pudo contactar con Brevo:", error);
    return Response.json({ success: false, message: "No pudimos enviar tu solicitud. Inténtalo nuevamente." }, { status: 502 });
  }
}
