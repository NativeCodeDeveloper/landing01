function escaparHtml(valor) {
  return String(valor).replace(/[&<>"']/g, (caracter) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[caracter]);
}

function filaDato(etiqueta, valorHtml) {
  return `
    <tr>
      <td class="dato-etiqueta" valign="top" style="width:38%;padding:17px 14px 17px 0;border-bottom:1px solid #e7ede8;color:#64766b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;">
        ${escaparHtml(etiqueta)}
      </td>
      <td class="dato-valor" valign="top" style="width:62%;padding:17px 0;border-bottom:1px solid #e7ede8;color:#17382b;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:22px;word-break:break-word;">
        ${valorHtml}
      </td>
    </tr>`;
}

export function generarCorreoContacto(datos, fecha = new Date()) {
  const nombre = escaparHtml(datos.nombre);
  const correo = escaparHtml(datos.correo);
  const telefono = escaparHtml(datos.telefono);
  const clinica = escaparHtml(datos.clinica);
  const nacimiento = escaparHtml(datos.fechaNacimiento);
  const renta = escaparHtml(datos.rentaImponible);
  const cargas = escaparHtml(datos.cargas);
  const enlaceCorreo = `mailto:${encodeURIComponent(datos.correo)}`;
  const enlaceTelefono = `tel:${datos.telefono.replace(/[^+\d]/g, "")}`;
  const fechaSolicitud = escaparHtml(new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(fecha));

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Nueva solicitud de asesoría</title>
  <style>
    @media only screen and (max-width: 600px) {
      .envoltura { padding: 16px 10px !important; }
      .seccion { padding: 26px 20px !important; }
      .cabecera { padding: 32px 22px !important; }
      .titulo { font-size: 27px !important; line-height: 32px !important; }
      .dato-etiqueta { display: block !important; width: 100% !important; padding: 15px 0 2px !important; border-bottom: 0 !important; }
      .dato-valor { display: block !important; width: 100% !important; padding: 0 0 15px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#edf2ee;-webkit-text-size-adjust:100%;">
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">Nueva solicitud de ${nombre}: datos de contacto y preferencias.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;table-layout:fixed;border-collapse:collapse;background-color:#edf2ee;">
    <tr>
      <td class="envoltura" align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:620px;table-layout:fixed;border-collapse:separate;border-spacing:0;border:1px solid #dce6de;border-radius:20px;overflow:hidden;background-color:#ffffff;">
          <tr>
            <td class="cabecera" style="padding:42px 44px 38px;background-color:#0c2b20;">
              <p style="margin:0 0 26px;color:#a8ebbb;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2.3px;line-height:17px;text-transform:uppercase;">Tu salud · Tu tranquilidad</p>
              <p style="margin:0 0 12px;color:#b7e7c5;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.8px;line-height:18px;text-transform:uppercase;">Contacto desde la web</p>
              <h1 class="titulo" style="margin:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:34px;font-weight:700;letter-spacing:-1px;line-height:40px;">Nueva solicitud<br>de asesoría</h1>
              <p style="margin:18px 0 0;max-width:460px;color:#c4d9cb;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;">Una persona quiere revisar sus opciones de salud previsional. Aquí tienes sus datos para continuar la conversación.</p>
            </td>
          </tr>
          <tr>
            <td class="seccion" style="padding:36px 44px 18px;">
              <p style="margin:0 0 8px;color:#168054;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;line-height:16px;text-transform:uppercase;">01 / Contacto</p>
              <h2 style="margin:0 0 14px;color:#123b2b;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.5px;line-height:29px;">Cómo contactarle</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${filaDato("Nombre completo", nombre)}
                ${filaDato("Correo electrónico", `<a href="${enlaceCorreo}" style="color:#116a48;text-decoration:none;word-break:break-word;">${correo}</a>`)}
                ${filaDato("Teléfono", `<a href="${enlaceTelefono}" style="color:#116a48;text-decoration:none;">${telefono}</a>`)}
              </table>
            </td>
          </tr>
          <tr>
            <td class="seccion" style="padding:24px 44px 36px;">
              <p style="margin:0 0 8px;color:#168054;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;line-height:16px;text-transform:uppercase;">02 / Preferencias</p>
              <h2 style="margin:0 0 14px;color:#123b2b;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.5px;line-height:29px;">Lo que nos contó</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${filaDato("Clínica de preferencia", clinica)}
                ${filaDato("Fecha de nacimiento", nacimiento)}
                ${filaDato("Renta imponible", renta)}
                ${filaDato("¿Tiene cargas?", cargas)}
              </table>
            </td>
          </tr>
          <tr>
            <td class="seccion" style="padding:26px 44px;background-color:#f4f8f4;border-top:1px solid #e4ede5;">
              <p style="margin:0;color:#345948;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;">Puedes responder a este mensaje para escribir directamente a <strong style="color:#17382b;">${nombre}</strong>.</p>
              <p style="margin:10px 0 0;color:#778a7e;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;">Solicitud recibida el ${fechaSolicitud} (hora de Chile).</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;color:#819087;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;">Mensaje generado desde el formulario de contacto de Tu salud, tu tranquilidad.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
