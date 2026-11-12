import Link from "next/link";

export const metadata = {
  title: "Política de privacidad | Tu salud, tu tranquilidad",
  description:
    "Cómo tratamos los datos personales que nos entregas en el formulario de asesoría en salud previsional y cómo puedes pedir que los eliminemos.",
  robots: { index: true, follow: false },
};

// TODO CLIENTE: reemplazar los marcadores [ ... ] por los datos reales antes
// de publicar. Sin un canal de contacto real esta política no sirve de nada,
// porque es el medio por el que las personas ejercen sus derechos.
const CORREO_CONTACTO = "contacto@[DOMINIO].cl";
const ULTIMA_ACTUALIZACION = "noviembre de 2026";

const SECCIONES = [
  {
    titulo: "Quiénes somos",
    cuerpo: [
      "«Tu salud, tu tranquilidad» es un servicio independiente de asesoría en salud previsional. No somos una ISAPRE, no formamos parte de ninguna de ellas y no somos un organismo del Estado. Nuestro trabajo es comparar las alternativas disponibles en el mercado y acompañarte si decides cambiarte.",
      `Para cualquier consulta sobre esta política o sobre tus datos, puedes escribirnos a ${CORREO_CONTACTO}.`,
    ],
  },
  {
    titulo: "Qué datos recogemos",
    cuerpo: [
      "Solo los que tú nos entregas en el formulario: nombre, teléfono y correo electrónico. Nada más.",
      "Además, nuestro sitio registra datos técnicos de navegación a través del píxel de Meta (Facebook e Instagram): identificadores de cookies publicitarias, dirección IP y navegador. Estos datos se usan para medir el rendimiento de nuestros anuncios.",
      "No te pedimos RUT, datos bancarios ni información clínica en este formulario.",
    ],
  },
  {
    titulo: "Para qué los usamos",
    cuerpo: [
      "Para contactarte y preparar tu comparación de planes. En el formulario te pedimos solo lo mínimo; los detalles de tu situación (edad, renta, cargas, plan actual) los conversamos directamente por teléfono o WhatsApp, cuando tú quieras.",
      "Si decides avanzar con un cambio, compartimos los datos necesarios con la ISAPRE que tú elijas para tramitar la afiliación. Nunca antes de que nos lo autorices.",
      "No vendemos ni cedemos tus datos a terceros con fines comerciales.",
    ],
  },
  {
    titulo: "Cuánto tiempo los guardamos",
    cuerpo: [
      "Mantenemos tus datos mientras dure la asesoría y por el tiempo necesario para cumplir obligaciones legales o contractuales derivadas de ella. Si nos pides que los eliminemos antes, lo hacemos.",
    ],
  },
  {
    titulo: "Tus derechos",
    cuerpo: [
      "Puedes pedirnos en cualquier momento que te mostremos qué datos tuyos tenemos, que corrijamos los que estén equivocados, que los eliminemos o que dejemos de contactarte.",
      `Para ejercer cualquiera de estos derechos basta con escribirnos a ${CORREO_CONTACTO} o responder al WhatsApp por el que te contactamos. No tienes que justificar tu decisión y no te vamos a insistir.`,
    ],
  },
  {
    titulo: "Cookies y publicidad",
    cuerpo: [
      "Usamos el píxel de Meta para saber qué anuncios funcionan. Esto implica que Meta recibe información sobre tu visita a este sitio, asociada a identificadores de cookies.",
      "Puedes limitarlo desde la configuración de anuncios de tu cuenta de Facebook o Instagram, bloqueando cookies de terceros en tu navegador, o usando una extensión de bloqueo. El formulario funciona igual si lo haces.",
    ],
  },
  {
    titulo: "Seguridad",
    cuerpo: [
      "Tus datos viajan cifrados y se almacenan con acceso restringido al equipo de asesoría. Ningún sistema es infalible, pero aplicamos medidas razonables para protegerlos y te informaremos si ocurre un incidente que te afecte.",
    ],
  },
  {
    titulo: "Cambios a esta política",
    cuerpo: [
      `Si cambiamos la forma en que tratamos tus datos, actualizaremos esta página. Última actualización: ${ULTIMA_ACTUALIZACION}.`,
    ],
  },
];

export default function PaginaPrivacidad() {
  return (
    <main className="min-h-screen bg-[#f8faf7] text-[#19382f]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold text-[#0b6048] transition hover:text-[#084d3b]">
          ← Volver al inicio
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#16815d]">Tu salud, tu tranquilidad</p>
        <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.5rem)] font-bold leading-tight tracking-[-0.04em]">
          Política de privacidad
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#52645d]">
          Esta página explica, sin rodeos, qué datos tuyos recogemos, para qué los usamos y cómo puedes
          pedir que los eliminemos.
        </p>

        <div className="mt-10 space-y-8">
          {SECCIONES.map((seccion) => (
            <section key={seccion.titulo} className="rounded-2xl border border-[#e5ebe5] bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold tracking-[-0.025em]">{seccion.titulo}</h2>
              <div className="mt-3 space-y-3">
                {seccion.cuerpo.map((parrafo) => (
                  <p key={parrafo} className="text-[14px] leading-6 text-[#5c6d64]">{parrafo}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-[12px] leading-5 text-[#8b9c92]">
          Si crees que tus datos no están siendo tratados correctamente, puedes escribirnos primero a
          nosotros. También puedes acudir a los organismos competentes en materia de protección de datos
          personales en Chile.
        </p>
      </article>
    </main>
  );
}
