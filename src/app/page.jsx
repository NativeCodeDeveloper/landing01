"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { crearIdEvento, getMetaCookies, trackCustom, trackEvent } from "@/lib/metaPixel";

const CLAVE_BORRADOR = "solicitud-salud-borrador-v1";
const NUMERO_WHATSAPP_DESTINO = "56935568361"; // +56 9 3556 8361

export default function PaginaBienestar() {
    const referenciaFormulario = useRef(null);
    const referenciaSeccionFormulario = useRef(null);
    const vistaFormularioRegistrada = useRef(false);
    const inicioFormularioRegistrado = useRef(false);
    const [dialogoAbierto, establecerDialogoAbierto] = useState(false);
    const [contenidoDialogo, establecerContenidoDialogo] = useState({ titulo: "", mensaje: "" });
    const [enviando, establecerEnviando] = useState(false);
    const [fechaMaxima, establecerFechaMaxima] = useState("");

    useEffect(() => {
        establecerFechaMaxima(new Date().toISOString().slice(0, 10));
    }, []);

    // ViewContent: la sección del formulario entra en pantalla (una sola vez por visita).
    useEffect(() => {
        const seccion = referenciaSeccionFormulario.current;
        if (!seccion || typeof IntersectionObserver === "undefined") return;

        const observador = new IntersectionObserver((entradas) => {
            if (!entradas.some((entrada) => entrada.isIntersecting) || vistaFormularioRegistrada.current) return;

            vistaFormularioRegistrada.current = true;
            observador.disconnect();
            try {
                trackEvent("ViewContent", { content_name: "formulario_asesoria" });
            } catch (error) {
                console.error("No se pudo registrar el evento ViewContent en Meta:", error);
            }
        }, { threshold: 0.25 });

        observador.observe(seccion);
        return () => observador.disconnect();
    }, []);

    useEffect(() => {
        const formulario = referenciaFormulario.current;
        if (!formulario) return;

        try {
            const borrador = JSON.parse(sessionStorage.getItem(CLAVE_BORRADOR) || "null");
            if (!borrador || typeof borrador !== "object" || Array.isArray(borrador)) return;

            for (const [nombre, valor] of Object.entries(borrador)) {
                const campo = formulario.elements.namedItem(nombre);
                if ((campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement) && typeof valor === "string") {
                    campo.value = valor;
                }
            }
        } catch {
            return;
        }
    }, []);

    function guardarBorrador(evento) {
        try {
            const datos = Object.fromEntries(new FormData(evento.currentTarget).entries());
            sessionStorage.setItem(CLAVE_BORRADOR, JSON.stringify(datos));
        } catch {
            return;
        }
    }

    // IniciarFormulario: primer foco en cualquier campo del formulario (una sola vez por visita).
    function registrarInicioFormulario() {
        if (inicioFormularioRegistrado.current) return;

        inicioFormularioRegistrado.current = true;
        try {
            trackCustom("IniciarFormulario");
        } catch (error) {
            console.error("No se pudo registrar el evento IniciarFormulario en Meta:", error);
        }
    }

    // Lead: se dispara solo después de que el POST responde OK, con el mismo
    // eventId que viaja al servidor para deduplicar con la Conversions API.
    function registrarLeadMeta(idEvento) {
        try {
            trackEvent("Lead", { content_name: "asesoria_isapre" }, idEvento);
        } catch (error) {
            console.error("No se pudo registrar el evento Lead en Meta:", error);
        }
    }

    function abrirWhatsApp() {
        const mensaje = [
            "Hola 👋, ¡buenas!",
            "Vengo desde el sitio web de *Tu Salud, tu tranquilidad* 🌿",
            "Quisiera que un especialista en ISAPRES se comunique conmigo para revisar mis opciones y aclarar todas mis dudas 😊",
            "¡Muchas gracias!",
        ].join("\n");

        const enlaceWhatsApp = `https://wa.me/${NUMERO_WHATSAPP_DESTINO}?text=${encodeURIComponent(mensaje)}`;
        const ventanaWhatsApp = window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
        if (!ventanaWhatsApp) window.location.href = enlaceWhatsApp;
    }

    async function enviarCorreosBrevo(evento) {
        evento.preventDefault();
        if (enviando) return;

        const formulario = evento.currentTarget;
        const datos = Object.fromEntries(new FormData(formulario).entries());
        establecerEnviando(true);

        const idEventoMeta = crearIdEvento();
        const { fbp, fbc } = getMetaCookies();

        try {
            const respuestaBrevo = await fetch("/api/correos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...datos,
                    metaEventId: idEventoMeta,
                    fbp,
                    fbc,
                    eventSourceUrl: window.location.href,
                }),
            });

            const respuestaBackend = await respuestaBrevo.json();

            if (respuestaBackend.success) {
                establecerContenidoDialogo({ titulo: "Solicitud recibida", mensaje: respuestaBackend.message });
                formulario.reset();
                try {
                    sessionStorage.removeItem(CLAVE_BORRADOR);
                } catch {
                    console.warn("No se pudo limpiar el borrador local.");
                }
                registrarLeadMeta(idEventoMeta);
            }

            if (!respuestaBackend.success) {
                establecerContenidoDialogo({ titulo: "No pudimos enviar el correo", mensaje: respuestaBackend.message });
            }

            establecerDialogoAbierto(true);

        } catch (error) {
            console.error(error);
            establecerContenidoDialogo({
                titulo: "No pudimos enviar el correo",
                mensaje: "Ocurrió un error al enviar los correos.",
            });
            establecerDialogoAbierto(true);
        } finally {
            establecerEnviando(false);
        }
    }

  return (
    <main className="min-h-screen bg-[#f8faf7] text-[#19382f]">
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="icono-escudo" viewBox="0 0 32 32"><path d="m16 2 13 5v9c0 6-6 11-13 15C9 27 3 22 3 16V7Z" /><path d="m10 15 4 4 8-9" /></symbol>
          <symbol id="icono-familia" viewBox="0 0 32 32"><circle cx="16" cy="9" r="5" /><path d="M9 28v-6a7 7 0 0 1 14 0v6ZM7 8a4 4 0 1 0 0 8M25 8a4 4 0 1 1 0 8M9 18c-6-2-8 3-8 7v3h30v-3c0-4-2-9-8-7" /></symbol>
          <symbol id="icono-monedas" viewBox="0 0 32 32"><ellipse cx="20" cy="6" rx="9" ry="4" /><path d="M11 6v12c0 5 18 5 18 0V6M11 12c0 5 18 5 18 0M19 24c5 0 10-1 10-5" /><ellipse cx="9" cy="20" rx="7" ry="3" /><path d="M2 20v7c0 4 14 4 14 0v-7M2 24c0 4 14 4 14 0" /></symbol>
          <symbol id="icono-casa" viewBox="0 0 32 32"><path d="m2 15 14-12 14 12M6 12v17h20V12M11 13h10m-5-5v10M13 29v-8h6v8" /></symbol>
          <symbol id="icono-documento" viewBox="0 0 32 32"><path d="M20 30H5V2h17l6 6v14M21 2v8h7M10 9h6M10 15h12M10 21h8" /><circle cx="24" cy="26" r="5" /><path d="m21 26 2 2 3-4" /></symbol>
          <symbol id="icono-audifonos" viewBox="0 0 32 32"><path d="M3 20v-5a13 13 0 0 1 26 0v8c0 6-6 6-10 6" /><rect x="2" y="15" width="5" height="10" rx="2" /><rect x="25" y="15" width="5" height="10" rx="2" /><rect x="14" y="27" width="6" height="4" rx="2" /></symbol>
          <symbol id="icono-buscar" viewBox="0 0 32 32"><circle cx="14" cy="14" r="11" /><path d="m22 22 8 8" /></symbol>
          <symbol id="icono-reloj" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" /><path d="M16 6v11l7 4" /></symbol>
          <symbol id="icono-ubicacion" viewBox="0 0 32 32"><path d="M27 13c0 8-11 18-11 18S5 21 5 13a11 11 0 0 1 22 0Z" /><circle cx="16" cy="12" r="5" /></symbol>
          <symbol id="icono-whatsapp" viewBox="0 0 40 40"><path d="M34 20A15 15 0 0 1 12 34l-9 3 3-9A16 16 0 1 1 34 20Z" /><path d="m13 10 4 6-3 3c2 4 4 6 8 7l3-3 5 3c-2 5-5 4-9 2-6-3-10-8-11-12-1-3 0-5 3-6Z" fill="currentColor" stroke="none" /></symbol>
        </defs>
      </svg>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d5b46] text-white"><svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-escudo" /></svg></span>
          <div><p className="text-sm font-bold leading-tight tracking-tight">Tu salud, tu tranquilidad</p><p className="text-[11px] leading-tight text-[#678077]">Asesoría en salud previsional</p></div>
        </div>
        <p className="hidden rounded-full border border-[#dbe6dc] bg-white px-4 py-2 text-xs font-medium text-[#396451] sm:block">Atención en todo Chile</p>
      </header>

      <section aria-labelledby="titulo-principal" className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[28px] bg-[#edf3eb] shadow-[0_22px_70px_-45px_rgba(22,71,49,0.5)] lg:min-h-[510px] lg:grid-cols-[1.05fr_0.95fr] lg:rounded-[32px]">
          <div className="flex flex-col justify-center px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-12 lg:px-14 lg:py-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#176647]">Tu salud, tu tranquilidad</p>
            <h1 id="titulo-principal" className="mt-5 max-w-[620px] text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.04em]">¿Tu plan de ISAPRE está <span className="text-[#08734f]">cada vez más caro?</span></h1>
            <p className="mt-5 max-w-[510px] text-[15px] leading-7 text-[#52645d] sm:text-base">Revisamos contigo las alternativas disponibles para encontrar una opción que se ajuste mejor a tu presupuesto, necesidades y grupo familiar.</p>
            <div className="mt-7 grid gap-3 border-t border-[#d4e1d5] pt-6 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:items-start"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d644b]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-monedas" /></svg></span><p className="text-xs font-medium leading-5 text-[#38594b]">Comparación gratis y sin compromiso</p></div>
              <div className="flex items-center gap-3 sm:items-start"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d644b]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-familia" /></svg></span><p className="text-xs font-medium leading-5 text-[#38594b]">Para ti y tu familia</p></div>
              <div className="flex items-center gap-3 sm:items-start"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d644b]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-escudo" /></svg></span><p className="text-xs font-medium leading-5 text-[#38594b]">Te acompañamos en todo el proceso</p></div>
            </div>
                        <button type="button" onClick={abrirWhatsApp} className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#0b6048] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(10,81,56,0.9)] transition hover:bg-[#084d3b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b6048] sm:w-fit"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-whatsapp" /></svg>Revisar mis opciones gratis<span aria-hidden="true" className="text-lg font-light">↗</span></button>
            <p className="mt-3 text-xs leading-5 text-[#52645d]">Se abrirá WhatsApp con un mensaje listo para enviar: un especialista en ISAPRES te responderá y aclarará tus dudas.</p>
          </div>
          <div role="img" aria-label="Pareja sonriendo" className="relative min-h-[330px] bg-[url('/imagenes/pareja-tranquilidad.png')] bg-cover bg-right sm:min-h-[420px] lg:min-h-full">
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg shadow-[#1f4d35]/10 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-[300px]"><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#95612a]">Beneficio adicional</p><p className="mt-1 text-base font-bold text-[#3e2865]">Bono de Bienvenida</p><p className="mt-1 text-xs leading-5 text-[#625f68]">Si realizas tu cambio y cumples las condiciones de la promoción.</p></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-isapres" className="mx-auto max-w-7xl px-4 pt-10 sm:px-8 sm:pt-14 lg:px-10">
        <div className="px-3 py-7 sm:px-8 sm:py-8">
          <h2 id="titulo-isapres" className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#436b57]">Trabajamos con las principales ISAPRES</h2>
          <div className="mt-7 overflow-hidden motion-reduce:overflow-x-auto">
            <div className="flex w-max motion-safe:animate-carrusel motion-safe:hover:[animation-play-state:paused]">
              <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
                <Image src="/clienteImagenes/colmena.png" alt="Isapre Colmena" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/consalud.png" alt="Isapre Consalud" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/banmedica.png" alt="Isapre Banmédica" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/v3.png" alt="Isapre Vida Tres" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/nuevamasvida.png" alt="Isapre Nueva Masvida" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/bupa.png" alt="CruzBlanca, parte de Bupa" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/isapres.png" alt="Isapre Fundación BancoEstado" width={2171} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/es.png" alt="Isapre Esencial" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
              </div>
              <div aria-hidden="true" className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
                <Image src="/clienteImagenes/colmena.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/consalud.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/banmedica.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/v3.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/nuevamasvida.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/bupa.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/isapres.png" alt="" width={2171} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
                <Image src="/clienteImagenes/es.png" alt="" width={2172} height={724} className="h-16 w-36 shrink-0 object-contain sm:h-20 sm:w-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:px-10 lg:py-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#16815d]">Una mejor alternativa</p>
          <h2 className="mt-3 max-w-[420px] text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.035em]">¿Por qué revisar tu plan actual?</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <article className="flex gap-4 rounded-2xl border border-[#e5ebe5] bg-white p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-monedas" /></svg></span><div><h3 className="text-sm font-semibold">Alzas constantes en los precios</h3><p className="mt-1 text-[13px] leading-5 text-[#66766e]">Reajustes anuales y cobros en UF vuelven los planes cada vez más caros.</p></div></article>
            <article className="flex gap-4 rounded-2xl border border-[#e5ebe5] bg-white p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-familia" /></svg></span><div><h3 className="text-sm font-semibold">Cambios en tu situación familiar</h3><p className="mt-1 text-[13px] leading-5 text-[#66766e]">Matrimonio, hijos o cargas adicionales pueden requerir un plan más adecuado.</p></div></article>
            <article className="flex gap-4 rounded-2xl border border-[#e5ebe5] bg-white p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-casa" /></svg></span><div><h3 className="text-sm font-semibold">Mejores coberturas</h3><p className="mt-1 text-[13px] leading-5 text-[#66766e]">Puedes acceder a mejores clínicas y prestaciones según tus necesidades.</p></div></article>
            <article className="flex gap-4 rounded-2xl border border-[#e5ebe5] bg-white p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><use href="#icono-documento" /></svg></span><div><h3 className="text-sm font-semibold">Un plan acorde a tu presupuesto</h3><p className="mt-1 text-[13px] leading-5 text-[#66766e]">Revisamos opciones que se adapten a tu renta y a lo que realmente usas.</p></div></article>
          </div>
        </div>
        <section ref={referenciaSeccionFormulario} aria-labelledby="titulo-formulario" className="rounded-[26px] border border-[#e2ebe1] bg-white p-5 shadow-[0_24px_65px_-40px_rgba(22,71,49,0.42)] sm:p-8 lg:p-9">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf4e9] px-3 py-1.5 text-[11px] font-semibold text-[#2e674c]">● 100% seguro y sin compromiso</p>
          <h2 id="titulo-formulario" className="mt-4 text-[clamp(1.6rem,3vw,2rem)] font-bold tracking-[-0.035em]">Completa tus datos</h2>
          <p className="mt-1 text-sm leading-6 text-[#69776f]">Y te contactaremos para evaluar tu caso.</p>




            {/* INPUTS DEL FORMULARIO */}
          <form ref={referenciaFormulario} onChange={guardarBorrador} onFocus={registrarInicioFormulario} onSubmit={enviarCorreosBrevo} aria-label="Datos de contacto y preferencias" className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <div><label htmlFor="nombre" className="mb-2 block text-xs font-semibold">Nombre completo *</label><input id="nombre" name="nombre" type="text" autoComplete="name" required maxLength={120} pattern="\S.*" title="Ingresa tu nombre completo" placeholder="Ej: María Pérez González" className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div><label htmlFor="clinica" className="mb-2 block text-xs font-semibold">Clínica de preferencia *</label><input id="clinica" name="clinica" type="text" required maxLength={100} pattern="\S.*" title="Ingresa la clínica de preferencia" placeholder="Ej: Clínica Santa María" className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div><label htmlFor="nacimiento" className="mb-2 block text-xs font-semibold">Fecha de nacimiento *</label><input id="nacimiento" name="fechaNacimiento" type="date" autoComplete="bday" required max={fechaMaxima || undefined} className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div><label htmlFor="renta" className="mb-2 block text-xs font-semibold">¿Cuánto es tu renta imponible? *</label><input id="renta" name="rentaImponible" type="text" inputMode="numeric" required maxLength={20} pattern="\$?\s?(?:\d{1,3}(?:[.,\s]\d{3})+|\d+)" title="Ingresa tu renta en pesos, por ejemplo: $1.000.000" placeholder="Ej: $1.000.000" className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div><label htmlFor="correo" className="mb-2 block text-xs font-semibold">Email *</label><input id="correo" name="correo" type="email" autoComplete="email" required maxLength={254} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Ingresa un correo válido, por ejemplo: ejemplo@correo.cl" placeholder="ejemplo@correo.cl" className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div><label htmlFor="cargas" className="mb-2 block text-xs font-semibold">¿Tienes cargas? *</label><select id="cargas" name="cargas" defaultValue="" required className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15"><option value="" disabled>Selecciona una opción</option><option value="Sí">Sí</option><option value="No">No</option></select></div>
            <div><label htmlFor="telefono" className="mb-2 block text-xs font-semibold">Teléfono *</label><input id="telefono" name="telefono" type="tel" autoComplete="tel" required maxLength={30} pattern="(?:[+()\-\s]*\d){8,15}[+()\-\s]*" title="Ingresa un teléfono válido, por ejemplo: +56 9 1234 5678" placeholder="+56 9 1234 5678" className="h-11 w-full rounded-xl border border-[#dce5de] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
            <div className="flex items-end"><button
                type="submit" disabled={enviando} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0b6048] px-4 text-sm font-semibold text-white transition hover:bg-[#084d3b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b6048] disabled:cursor-wait disabled:opacity-70">{enviando ? "Enviando..." : "Enviar formulario"} <span aria-hidden="true">↗</span></button></div>
          </form>
          <p className="mt-5 text-center text-xs leading-5 text-[#87948b]">Tus datos están seguros con nosotros. Solo te contactaremos para asesorarte.</p>
        </section>
      </section>

      <section aria-labelledby="titulo-bono" className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid items-center gap-5 rounded-[26px] border border-[#eee5f6] bg-[#f6f1fa] px-6 py-7 sm:px-9 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:py-8">
          <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#69419a] shadow-sm"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><rect x="5" y="19" width="38" height="25" rx="3" /><path d="M3 19h42v-7H3v7Zm21 0v25M24 12c-9 0-13-2-13-6 0-7 11-5 13 6Zm0 0c9 0 13-2 13-6 0-7-11-5-13 6Z" /></svg></span>
          <div><h2 id="titulo-bono" className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">Recibe un <span className="text-[#684096]">Bono de Bienvenida</span> por tu cambio</h2><p className="mt-2 text-sm leading-6 text-[#685f70]">Completa el formulario y te contactaremos para evaluar tu caso.</p></div>
          <ul className="space-y-2 text-xs leading-5 text-[#554b60] lg:border-l lg:border-[#ded1e9] lg:pl-8"><li>✓ Incentivo económico por tu cambio</li><li>✓ Sujeto a condiciones y elegibilidad</li><li>✓ Te explicamos todos los detalles</li></ul>
        </div>
      </section>

      <section aria-labelledby="titulo-proceso" className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="text-center"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#16815d]">Un proceso sencillo</p><h2 id="titulo-proceso" className="mt-2 text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-[-0.035em]">¿Cómo funciona?</h2></div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-[#e7ece7] bg-white p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-documento" /></svg></span><p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-[#238060]">PASO 01</p><h3 className="mt-1 text-sm font-semibold">Completa el formulario</h3><p className="mt-2 text-[13px] leading-5 text-[#6c7b71]">Es rápido y 100% online.</p></li>
          <li className="rounded-2xl border border-[#e7ece7] bg-white p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-audifonos" /></svg></span><p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-[#238060]">PASO 02</p><h3 className="mt-1 text-sm font-semibold">Te contactamos</h3><p className="mt-2 text-[13px] leading-5 text-[#6c7b71]">Un asesor revisará tu caso y tus alternativas.</p></li>
          <li className="rounded-2xl border border-[#e7ece7] bg-white p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-buscar" /></svg></span><p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-[#238060]">PASO 03</p><h3 className="mt-1 text-sm font-semibold">Comparamos opciones</h3><p className="mt-2 text-[13px] leading-5 text-[#6c7b71]">Te mostramos alternativas según tu situación.</p></li>
          <li className="rounded-2xl border border-[#e7ece7] bg-white p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ea] text-[#0b6048]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-escudo" /></svg></span><p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-[#238060]">PASO 04</p><h3 className="mt-1 text-sm font-semibold">Tú decides</h3><p className="mt-2 text-[13px] leading-5 text-[#6c7b71]">Si te conviene, te acompañamos en el cambio.</p></li>
        </ol>
      </section>

      <footer className="border-t border-[#e4ebe3] bg-white"><div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-10">
        <div className="flex items-center gap-3"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-[#467660]"><use href="#icono-reloj" /></svg><p className="text-xs leading-5 text-[#68786e]">Respuesta en menos de 24 horas</p></div>
        <div className="flex items-center gap-3"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-[#467660]"><use href="#icono-audifonos" /></svg><p className="text-xs leading-5 text-[#68786e]">Asesoría de expertos en salud previsional</p></div>
        <div className="flex items-center gap-3"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-[#467660]"><use href="#icono-ubicacion" /></svg><p className="text-xs leading-5 text-[#68786e]">Atención en todo Chile</p></div>
        <div className="flex items-center gap-3"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-[#467660]"><use href="#icono-escudo" /></svg><p className="text-xs leading-5 text-[#68786e]">Sin costos ocultos</p></div>
      </div></footer>

      <AlertDialog open={dialogoAbierto} onOpenChange={establecerDialogoAbierto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{contenidoDialogo.titulo}</AlertDialogTitle>
            <AlertDialogDescription>{contenidoDialogo.mensaje}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
