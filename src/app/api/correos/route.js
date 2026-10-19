import { generarCorreoContacto } from "./plantilla-correo.mjs";

function texto(valor) {
  return typeof valor === "string" ? valor.trim().replace(/\s+/g, " ") : "";
}

function normalizarFechaNacimiento(valor) {
  const formatoIso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  const formatoLocal = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor);
  if (!formatoIso && !formatoLocal) return null;

  const dia = Number(formatoIso ? formatoIso[3] : formatoLocal[1]);
  const mes = Number(formatoIso ? formatoIso[2] : formatoLocal[2]);
  const anio = Number(formatoIso ? formatoIso[1] : formatoLocal[3]);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));

  if (fecha.getUTCDate() !== dia
    || fecha.getUTCMonth() !== mes - 1
    || fecha.getUTCFullYear() !== anio
    || fecha > new Date()) return null;

  return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`;
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
    clinica: texto(cuerpo.clinica),
    fechaNacimiento: texto(cuerpo.fechaNacimiento).replace(/\s*\/\s*/g, "/"),
    rentaImponible: texto(cuerpo.rentaImponible),
    correo: texto(cuerpo.correo),
    cargas: texto(cuerpo.cargas),
    telefono: texto(cuerpo.telefono),
  };

  const nacimientoNormalizado = normalizarFechaNacimiento(datos.fechaNacimiento);
  const rentaEnDigitos = datos.rentaImponible.replace(/[$.,\s]/g, "");
  const renta = Number(rentaEnDigitos);
  const digitosTelefono = datos.telefono.replace(/\D/g, "");

  const camposInvalidos = [];
  if (datos.nombre.length < 2 || datos.nombre.length > 120) camposInvalidos.push("nombre");
  if (datos.clinica.length < 2 || datos.clinica.length > 100) camposInvalidos.push("clínica de preferencia");
  if (!nacimientoNormalizado) camposInvalidos.push("fecha de nacimiento");
  if (!/^\$?\s?(?:\d{1,3}(?:[.,\s]\d{3})+|\d+)$/.test(datos.rentaImponible)
    || !/^\d+$/.test(rentaEnDigitos)
    || !Number.isSafeInteger(renta) || renta <= 0) camposInvalidos.push("renta imponible");
  if (datos.correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) camposInvalidos.push("correo");
  if (!["Sí", "No"].includes(datos.cargas)) camposInvalidos.push("cargas");
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

  datos.fechaNacimiento = nacimientoNormalizado;
  datos.rentaImponible = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(renta);

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

    return Response.json({
      success: true,
      message: "Recibimos tu solicitud. Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("[CORREOS] No se pudo contactar con Brevo:", error);
    return Response.json({ success: false, message: "No pudimos enviar tu solicitud. Inténtalo nuevamente." }, { status: 502 });
  }
}
