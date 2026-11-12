"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    <main className="min-h-screen overflow-x-clip bg-white font-[Arial,Helvetica,sans-serif] text-[#0b1023]">
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
          <symbol id="icono-regalo" viewBox="0 0 48 48"><rect x="5" y="19" width="38" height="25" rx="3"/><path d="M3 19h42v-7H3v7Zm21 0v25M24 12c-9 0-13-2-13-6 0-7 11-5 13 6Zm0 0c9 0 13-2 13-6 0-7-11-5-13 6Z"/></symbol>
          <symbol id="icono-whatsapp" viewBox="0 0 40 40"><path d="M34 20A15 15 0 0 1 12 34l-9 3 3-9A16 16 0 1 1 34 20Z" /><path d="m13 10 4 6-3 3c2 4 4 6 8 7l3-3 5 3c-2 5-5 4-9 2-6-3-10-8-11-12-1-3 0-5 3-6Z" fill="currentColor" stroke="none" /></symbol>
        </defs>
      </svg>

<header className="border-b border-slate-100 bg-white"><div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-10"><div className="flex items-center gap-2"><svg aria-hidden="true" viewBox="0 0 50 46" className="h-11 w-12 shrink-0 text-emerald-500"><path fill="currentColor" d="M25 43 5 24C-9 9 13-9 25 6 37-9 59 9 45 24Z"/><path d="M9 22h8l4-10 6 21 4-11h9" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/></svg><div><p className="text-3xl font-extrabold leading-none tracking-tight">Tu Salud</p><p className="mt-1 text-[11px]">Asesoría en ISAPRES</p></div></div><a href="#bono" className="hidden items-center gap-1.5 rounded-full bg-[#e5f6ef] px-3 py-2 text-[11px] font-bold text-[#087c47] transition hover:bg-[#d4f0e4] md:inline-flex"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><use href="#icono-regalo" /></svg>Bono de bienvenida <span aria-hidden="true">›</span></a><button type="button" onClick={abrirWhatsApp} className="rounded-xl bg-gradient-to-br from-[#04ad55] to-[#006354] px-4 py-3 text-xs font-bold text-white sm:px-6 sm:text-sm">▦ <span className="ml-1">Asesoría gratis</span></button></div></header>
<section aria-labelledby="titulo-principal" className="relative mx-auto max-w-[1200px] overflow-hidden">
<div className="relative z-10 px-5 pb-7 pt-8 sm:px-10 md:min-h-[440px] md:w-[55%] md:py-10 lg:min-h-[480px]">
<p className="inline-flex items-center gap-2 rounded-full bg-[#e5f6ef] px-3 py-2 text-[10px] font-bold text-[#087c47] sm:text-xs"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><use href="#icono-escudo" /></svg> ASESORÍA PREVISIONAL PERSONALIZADA</p>
<h1 id="titulo-principal" className="mt-4 text-[40px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[60px]">¿Pagas demasiado<br className="hidden lg:block"/> por tu <span className="text-[#00864e]">ISAPRE?</span></h1>
<p className="mt-3 max-w-lg text-lg leading-tight text-[#404553] lg:text-[23px]">Comparamos alternativas para ti y tu familia, gratis y sin compromiso.</p>
<div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="#formulario" className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#04ad55] to-[#006354] px-5 text-base font-bold text-white shadow-sm"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><use href="#icono-buscar" /></svg> Comparar mi plan gratis <span>›</span></a><button type="button" onClick={abrirWhatsApp} className="flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#7a9692] bg-white px-5"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-green-600"><use href="#icono-whatsapp" /></svg><span className="text-left text-xs"><strong className="block text-sm">WhatsApp</strong>Consulta directa</span></button></div>
<ul className="mt-4 space-y-1 text-[13px] text-slate-700"><li><span className="mr-2 text-lg text-emerald-600">✓</span>Revisa opciones reales según tu perfil</li><li><span className="mr-2 text-lg text-emerald-600">✓</span>Te explicamos coberturas y beneficios</li><li><span className="mr-2 text-lg text-emerald-600">✓</span>Te acompañamos en todo el proceso</li></ul></div>
<div className="relative mx-auto h-[340px] w-full max-w-[650px] overflow-hidden sm:h-[440px] md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[55%] md:max-w-none">
<Image src="/imagenes/familia-salud-alta-calidad.png" alt="Familia sonriente compartiendo un abrazo al aire libre" width={1536} height={1024} preload sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 660px" className="h-full w-full object-cover object-center" />
<div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-white to-transparent md:block"/>
<div className="absolute right-3 top-4 flex max-w-[170px] gap-2 rounded-2xl bg-white/95 p-3 shadow-lg sm:right-5 sm:top-10 sm:p-4"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">✓</span><div><p className="text-sm font-bold leading-tight">Asesoría gratuita</p><p className="mt-1 text-xs leading-snug">Sin costo y<br/> sin compromiso</p></div></div>
<div className="absolute bottom-5 right-3 flex max-w-[210px] gap-3 rounded-2xl bg-white/95 p-4 shadow-lg sm:bottom-12 sm:right-5"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 32 32" className="h-8 w-8 shrink-0 text-green-600"><path d="m3 10 13-7 13 7-13 7Zm0 6 13 7 13-7M3 22l13 7 13-7"/></svg><div><p className="text-sm font-bold leading-tight">Opciones para tu presupuesto</p><p className="mt-1 text-xs leading-snug">Encuentra el plan que mejor se adapte a ti</p></div></div>
</div>
</section>
<div className="mx-auto max-w-[1200px] px-5 pt-6 sm:px-10"></div>
<div className="mx-auto max-w-[1200px] px-5 sm:px-10"><div className="grid gap-4 rounded-2xl bg-[#f0f7f8] px-5 py-4 text-sm font-bold sm:grid-cols-3 sm:gap-0">
<div className="flex items-center justify-center gap-3 "><span className="text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><use href="#icono-monedas" /></svg></span>Asesoría sin costo</div><div className="flex items-center justify-center gap-3 sm:border-l sm:border-slate-300"><span className="text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><use href="#icono-ubicacion" /></svg></span>Atención en todo Chile</div><div className="flex items-center justify-center gap-3 sm:border-l sm:border-slate-300"><span className="text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><use href="#icono-familia" /></svg></span>Acompañamiento personalizado</div></div></div><section aria-labelledby="titulo-plan" className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 sm:px-10 md:grid-cols-2 lg:gap-10 lg:py-12"><div><h2 id="titulo-plan" className="text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-[42px]">Encuentra un plan que<br className="hidden lg:block"/> se adapte <span className="text-[#009d35]">a ti</span></h2><p className="mt-3 text-base leading-snug text-[#404553] lg:text-lg">Analizamos tu situación, comparamos alternativas y te ayudamos a elegir la mejor opción en ISAPRE.</p><div className="mt-6 space-y-3"><article className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-[#fcfcfe] p-4 shadow-sm"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5f6f0] text-[#0c8b55]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><use href="#icono-escudo" /></svg></span><div><h3 className="text-lg font-bold tracking-tight">Compara coberturas</h3><p className="mt-1 text-sm leading-snug">Conoce y contrasta planes, beneficios y redes de atención.</p></div></article><article className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-[#fcfcfe] p-4 shadow-sm"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5f6f0] text-[#0c8b55]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><use href="#icono-monedas" /></svg></span><div><h3 className="text-lg font-bold tracking-tight">Cuida tu presupuesto</h3><p className="mt-1 text-sm leading-snug">Encuentra una alternativa con la mejor relación cobertura y precio.</p></div></article><article className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-[#fcfcfe] p-4 shadow-sm"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5f6f0] text-[#0c8b55]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><use href="#icono-reloj" /></svg></span><div><h3 className="text-lg font-bold tracking-tight">Decide con información</h3><p className="mt-1 text-sm leading-snug">Te entregamos una recomendación clara y personalizada.</p></div></article></div></div><div id="formulario" ref={referenciaSeccionFormulario} aria-labelledby="titulo-formulario" className="scroll-mt-6 self-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_24px_-10px_#8e99ad]"><div className="flex items-center gap-5 bg-gradient-to-r from-[#19365c] to-[#102348] p-5 text-white sm:px-7"><span className="shrink-0 text-emerald-300"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12"><use href="#icono-audifonos" /></svg></span><div><h2 id="titulo-formulario" className="text-2xl font-bold tracking-tight">Recibe una asesoría gratuita</h2><p className="mt-1 text-sm">Déjanos tus datos y te contactaremos a la brevedad.</p></div></div>              <form ref={referenciaFormulario} onChange={guardarBorrador} onFocus={registrarInicioFormulario} onSubmit={enviarCorreosBrevo} aria-label="Datos de contacto" className="grid gap-3 p-5 sm:p-7">
                <div><label htmlFor="nombre" className="mb-2 block text-xs font-semibold">Nombre completo *</label><input id="nombre" name="nombre" type="text" autoComplete="name" required maxLength={120} pattern="\S.*" title="Ingresa tu nombre completo" placeholder="Ej: María Pérez González" className="h-11 w-full rounded-lg border border-[#cdd0d5] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
                <div><label htmlFor="telefono" className="mb-2 block text-xs font-semibold">WhatsApp *</label><input id="telefono" name="telefono" type="tel" autoComplete="tel" required maxLength={30} pattern="(?:[+()\-\s]*\d){8,15}[+()\-\s]*" title="Ingresa un teléfono válido, por ejemplo: +56 9 1234 5678" placeholder="+56 9 1234 5678" className="h-11 w-full rounded-lg border border-[#cdd0d5] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
                <div><label htmlFor="correo" className="mb-2 block text-xs font-semibold">Email *</label><input id="correo" name="correo" type="email" autoComplete="email" required maxLength={254} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Ingresa un correo válido, por ejemplo: ejemplo@correo.cl" placeholder="ejemplo@correo.cl" className="h-11 w-full rounded-lg border border-[#cdd0d5] bg-[#fcfdfb] px-3 text-sm text-[#18382f] outline-none transition placeholder:text-[#9aa9a0] focus:border-[#4f9a73] focus:ring-2 focus:ring-[#4f9a73]/15" /></div>
                <div className="flex items-end"><button
                    type="submit" disabled={enviando} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#04ad55] to-[#006354] px-4 text-sm font-semibold text-white transition hover:bg-[#084d3b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b6048] disabled:cursor-wait disabled:opacity-70">{enviando ? "Enviando..." : "Quiero que me contacten"} <span aria-hidden="true">↗</span></button></div>
              </form>
              <p className="px-6 pb-5 text-center text-xs leading-5 text-[#87948b]">Tus datos están seguros con nosotros. Solo te contactaremos para asesorarte. <Link href="/privacidad" className="underline transition hover:text-[#52645d]">Política de privacidad</Link></p>
</div></section>
<section aria-labelledby="titulo-proceso" className="bg-gradient-to-b from-[#f1faf8] to-white px-5 pb-9 pt-6 sm:px-10"><div className="mx-auto max-w-[1120px]"><h2 id="titulo-proceso" className="text-center text-4xl font-extrabold tracking-tight">Así de <span className="text-[#008b36]">fácil</span> es</h2><p className="mt-2 text-center text-sm text-slate-700">Te acompañamos en un proceso simple y 100% guiado.</p><ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"><li className="relative text-center"><span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f6f0] text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-11 w-11"><use href="#icono-documento" /></svg><span className="absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">1</span></span><h3 className="mt-3 text-xl font-bold tracking-tight">Cuéntanos</h3><p className="mx-auto mt-1 max-w-[200px] text-sm leading-snug text-[#404553]">Completa el formulario con tus datos básicos.</p></li><li className="relative text-center"><span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f6f0] text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-11 w-11"><use href="#icono-buscar" /></svg><span className="absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">2</span></span><h3 className="mt-3 text-xl font-bold tracking-tight">Evaluamos</h3><p className="mx-auto mt-1 max-w-[200px] text-sm leading-snug text-[#404553]">Analizamos tu perfil y necesidades de salud.</p></li><li className="relative text-center"><span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f6f0] text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-11 w-11"><use href="#icono-monedas" /></svg><span className="absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">3</span></span><h3 className="mt-3 text-xl font-bold tracking-tight">Comparamos</h3><p className="mx-auto mt-1 max-w-[200px] text-sm leading-snug text-[#404553]">Revisamos las mejores alternativas de ISAPRE.</p></li><li className="relative text-center"><span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f6f0] text-[#118350]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-11 w-11"><use href="#icono-escudo" /></svg><span className="absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">4</span></span><h3 className="mt-3 text-xl font-bold tracking-tight">Tú decides</h3><p className="mx-auto mt-1 max-w-[200px] text-sm leading-snug text-[#404553]">Elige el plan que más te convenga, con nuestro apoyo.</p></li></ol><div id="bono" className="mt-10 grid items-center gap-6 rounded-[22px] bg-gradient-to-r from-[#095653] via-[#07525c] to-[#10966b] px-6 py-6 text-white sm:px-10 md:grid-cols-[1.1fr_1fr]"><div className="flex items-center gap-6"><svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 shrink-0"><rect x="5" y="19" width="38" height="25" rx="3"/><path d="M3 19h42v-7H3v7Zm21 0v25M24 12c-9 0-13-2-13-6 0-7 11-5 13 6Zm0 0c9 0 13-2 13-6 0-7-11-5-13 6Z"/></svg><h2 className="border-l border-white/40 pl-6 text-2xl font-bold leading-tight lg:text-3xl">Consulta por el<br/><span className="text-[#86efb5]">bono de bienvenida</span></h2></div><div><p className="text-sm">Al cambiarte de ISAPRE con nuestra asesoría,<br className="hidden lg:block"/> puedes acceder a un bono especial.</p><p className="mt-3 inline-block rounded-full bg-[#d4fa94] px-4 py-1 text-xs font-bold text-[#102b25]">Sujeto a condiciones y elegibilidad.</p></div></div></div></section><footer className="bg-[#0c1930] text-white"><div className="mx-auto grid max-w-[1200px] items-center gap-7 px-5 py-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1fr_1fr_1.3fr_0.8fr]"><div className="flex items-center gap-2"><svg aria-hidden="true" viewBox="0 0 50 46" className="h-11 w-12 shrink-0 text-emerald-500"><path fill="currentColor" d="M25 43 5 24C-9 9 13-9 25 6 37-9 59 9 45 24Z"/><path d="M9 22h8l4-10 6 21 4-11h9" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/></svg><div><p className="text-3xl font-extrabold leading-none tracking-tight">Tu Salud</p><p className="mt-1 text-[11px]">Asesoría en ISAPRES</p></div></div><div className="flex items-center gap-3"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><use href="#icono-whatsapp" /></svg><p className="text-xs"><strong>WhatsApp</strong><br/>+56 9 3556 8361</p></div><div className="flex items-center gap-3"><span className="text-3xl">✉</span><p className="break-all text-xs"><strong>Correo</strong><br/>tusaludnuestrocompromiso2026@gmail.com</p></div><div className="space-y-1 text-xs"><p>Preguntas frecuentes</p><Link href="/privacidad" className="block underline-offset-4 hover:underline">Política de privacidad</Link><p>Términos y condiciones</p></div></div><div className="border-t border-white/20"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-2 px-5 py-4 text-[11px] sm:flex-row sm:px-10"><p>© 2026 Tu Salud · Un servicio de NativeCode SpA.</p><p>tu-salud.nativecode.cl</p></div></div></footer>      <AlertDialog open={dialogoAbierto} onOpenChange={establecerDialogoAbierto}>
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
