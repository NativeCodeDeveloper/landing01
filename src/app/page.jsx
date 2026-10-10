import Image from "next/image";

export default function PaginaBienestar() {
  return (
    <main className="@container w-full overflow-hidden bg-[#fefefd] text-[#09272d]">
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="icono-moneda" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/><path d="M20 11c-2-3-8-2-8 1s8 3 8 6-6 5-8 2m4-14v20"/></symbol>
          <symbol id="icono-monedas" viewBox="0 0 32 32"><ellipse cx="20" cy="6" rx="9" ry="4"/><path d="M11 6v12c0 5 18 5 18 0V6M11 12c0 5 18 5 18 0M19 24c5 0 10-1 10-5"/><ellipse cx="9" cy="20" rx="7" ry="3"/><path d="M2 20v7c0 4 14 4 14 0v-7M2 24c0 4 14 4 14 0"/></symbol>
          <symbol id="icono-familia" viewBox="0 0 32 32"><circle cx="16" cy="9" r="5"/><path d="M9 28v-6a7 7 0 0 1 14 0v6ZM7 8a4 4 0 1 0 0 8M25 8a4 4 0 1 1 0 8M9 18c-6-2-8 3-8 7v3h30v-3c0-4-2-9-8-7"/></symbol>
          <symbol id="icono-escudo" viewBox="0 0 32 32"><path d="m16 2 13 5v9c0 6-6 11-13 15C9 27 3 22 3 16V7Z"/><path d="m10 15 4 4 8-9"/></symbol>
          <symbol id="icono-casa" viewBox="0 0 32 32"><path d="m2 15 14-12 14 12M6 12v17h20V12M11 13h10m-5-5v10M13 29v-8h6v8"/></symbol>
          <symbol id="icono-documento" viewBox="0 0 32 32"><path d="M20 30H5V2h17l6 6v14M21 2v8h7M10 9h6M10 15h12M10 21h8"/><circle cx="24" cy="26" r="5"/><path d="m21 26 2 2 3-4"/></symbol>
          <symbol id="icono-audifonos" viewBox="0 0 32 32"><path d="M3 20v-5a13 13 0 0 1 26 0v8c0 6-6 6-10 6"/><rect x="2" y="15" width="5" height="10" rx="2"/><rect x="25" y="15" width="5" height="10" rx="2"/><rect x="14" y="27" width="6" height="4" rx="2"/></symbol>
          <symbol id="icono-buscar" viewBox="0 0 32 32"><circle cx="14" cy="14" r="11"/><path d="m22 22 8 8"/></symbol>
          <symbol id="icono-candado" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="12" rx="2" fill="currentColor" stroke="none"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/><path d="M12 15v3" stroke="white"/></symbol>
          <symbol id="icono-reloj" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14"/><path d="M16 6v11l7 4"/></symbol>
          <symbol id="icono-ubicacion" viewBox="0 0 32 32"><path d="M27 13c0 8-11 18-11 18S5 21 5 13a11 11 0 0 1 22 0Z"/><circle cx="16" cy="12" r="5"/></symbol>
          <symbol id="icono-regalo" viewBox="0 0 48 48"><path d="M5 23h38v22H5Z" fill="currentColor" stroke="none"/><rect x="2" y="13" width="44" height="10" rx="2" fill="currentColor" stroke="none"/><path d="M23 14C4 15 5-2 15 3c5 2 8 12 8 12s2-14 9-13c13 2 5 15-9 13Z" strokeWidth="3"/><path d="M23 14v33M2 24h44" stroke="#fff8ea" strokeWidth="3"/></symbol>
          <symbol id="icono-whatsapp" viewBox="0 0 40 40"><path d="M34 20A15 15 0 0 1 12 34l-9 3 3-9A16 16 0 1 1 34 20Z"/><path d="m13 10 4 6-3 3c2 4 4 6 8 7l3-3 5 3c-2 5-5 4-9 2-6-3-10-8-11-12-1-3 0-5 3-6Z" fill="currentColor" stroke="none"/></symbol>
        </defs>
      </svg>
      {/* ENCABEZADO */}
      <section aria-labelledby="titulo-principal" className="relative isolate bg-[#f7f8f4] md:h-[52.5cqw]">
        <Image src="/imagenes/pareja-tranquilidad.png" alt="Pareja sonriendo y mirando hacia el futuro" width={1734} height={907} preload sizes="100vw" className="absolute inset-0 -z-10 hidden h-full w-full object-cover md:block" />
        <span aria-hidden="true" className="absolute -left-12 top-24 h-24 w-16 rounded-full bg-[#9cb8a4]/50" />
        <div className="relative z-10 px-6 pt-9 md:px-[5.3cqw] md:pt-[4.7cqw]">
          <p className="text-[11px] font-bold tracking-[0.26em] text-[#075542] md:text-[1.3cqw]">TU SALUD, TU TRANQUILIDAD</p>
          <h1 id="titulo-principal" className="mt-4 text-[clamp(2rem,8.3vw,3.3rem)] font-bold leading-[1.07] tracking-[-0.05em] md:mt-[1.8cqw] md:text-[5.15cqw]">¿Tu plan de ISAPRE<br />está <span className="text-[#075541]">cada vez más caro?</span></h1>
          <p className="mt-4 max-w-lg text-base leading-[1.25] text-[#384754] md:mt-[1.5cqw] md:max-w-[46cqw] md:text-[2cqw]">Revisamos contigo las alternativas disponibles para encontrar una opción que se ajuste mejor a tu presupuesto, necesidades y grupo familiar.</p>
          <div className="mt-7 flex max-w-lg items-center md:mt-[3.5cqw] md:w-[46cqw]">
            <div className="flex flex-1 items-center gap-2 border-r border-[#d4ded7] pr-2 md:gap-[0.8cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0 rounded-full bg-[#e4efdf] p-2 text-[#005440] md:h-[5.7cqw] md:w-[5.7cqw] md:p-[1.2cqw]"><use href="#icono-monedas" /></svg><p className="text-[10px] leading-tight md:text-[1.35cqw]">Comparación<br />gratis y sin<br />compromiso</p></div>
            <div className="flex flex-1 items-center gap-2 border-r border-[#d4ded7] px-2 md:gap-[0.8cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0 rounded-full bg-[#e4efdf] p-2 text-[#005440] md:h-[5.7cqw] md:w-[5.7cqw] md:p-[1.2cqw]"><use href="#icono-familia" /></svg><p className="text-[10px] leading-tight md:text-[1.35cqw]">Para ti y<br />tu familia</p></div>
            <div className="flex flex-1 items-center gap-2 pl-2 md:gap-[0.8cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0 rounded-full bg-[#e4efdf] p-2 text-[#005440] md:h-[5.7cqw] md:w-[5.7cqw] md:p-[1.2cqw]"><use href="#icono-escudo" /></svg><p className="text-[10px] leading-tight md:text-[1.35cqw]">Te asesoramos<br />durante todo<br />el proceso</p></div>
          </div>
          <button type="button" className="mt-7 flex min-h-14 w-full max-w-[440px] items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#006d57] to-[#004c3e] px-4 py-3 text-base font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00634c] md:mt-[3.6cqw] md:h-[6.6cqw] md:w-[43cqw] md:max-w-none md:gap-[2cqw] md:px-[3cqw] md:text-[2.2cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9 shrink-0 md:h-[4cqw] md:w-[4cqw]"><use href="#icono-whatsapp" /></svg>Revisar mis opciones gratis<span aria-hidden="true" className="ml-auto text-3xl font-light">›</span></button>
        </div>
        <div className="relative mt-5 h-[360px] overflow-hidden sm:h-[440px] md:hidden"><Image src="/imagenes/pareja-tranquilidad.png" alt="Asesoría para tu tranquilidad y la de tu familia" width={1734} height={907} sizes="900px" className="absolute right-0 top-0 h-full w-auto max-w-none" /></div>
        <p className="pointer-events-none absolute bottom-[155px] left-[36%] -rotate-12 font-[Bradley_Hand,Comic_Sans_MS,cursive] text-xl font-bold leading-[1.05] text-[#00513c] md:bottom-auto md:left-[59cqw] md:top-[28.8cqw] md:text-[2.2cqw]">Más salud<br />y tranquilidad<br /><span className="ml-3 border-b-2 border-[#00513c] pb-1">para ti y tu familia</span></p>
        <aside aria-label="Bono de bienvenida" className="absolute bottom-2 right-4 z-20 flex w-[290px] -rotate-6 items-start gap-3 rounded-[32px] bg-[#fff6e7] p-5 shadow-sm md:bottom-[1.1cqw] md:right-[2.6cqw] md:w-[32cqw] md:gap-[1.5cqw] md:rounded-[4cqw] md:p-[2.3cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-2 h-12 w-12 shrink-0 text-[#dc6700] md:h-[5.6cqw] md:w-[5.6cqw]"><use href="#icono-regalo" /></svg><div><p className="text-sm md:text-[1.65cqw]">Además, recibe un</p><p className="text-lg font-bold leading-tight tracking-tight text-[#510796] md:text-[2.4cqw]">Bono de Bienvenida</p><p className="mt-1 text-[10px] leading-tight md:text-[1.25cqw]">Si realizas tu cambio y cumples<br />las condiciones de la promoción.</p></div></aside>
      </section>
      {/* ISAPRES */}
      <section aria-labelledby="titulo-isapres" className="relative z-10 mx-0 rounded-t-[32px] bg-white px-3 pb-6 pt-5 md:mx-0 md:rounded-t-[3.5cqw] md:px-[5cqw] md:pb-[2cqw] md:pt-[1.8cqw]">
        <h2 id="titulo-isapres" className="mx-auto max-w-[270px] text-center text-xs font-bold leading-6 tracking-[0.17em] text-[#174c40] sm:max-w-none md:text-[1.4cqw] md:tracking-[0.18em]">TRABAJAMOS CON LAS PRINCIPALES ISAPRES</h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-4 md:mt-[2cqw] md:gap-x-0 md:gap-y-[1.5cqw]">
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-1/5">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Colmena" width={1024} height={1536} unoptimized className="absolute -left-[42px] -top-[490px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[5.2cqw] md:-top-[60cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-1/5">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Consalud" width={1024} height={1536} unoptimized className="absolute -left-[207px] -top-[490px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[25cqw] md:-top-[60cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-1/5">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Banmédica" width={1024} height={1536} unoptimized className="absolute -left-[361px] -top-[490px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[43.5cqw] md:-top-[60cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-1/5">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Vida Tres" width={1024} height={1536} unoptimized className="absolute -left-[507px] -top-[490px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[61.5cqw] md:-top-[60cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-1/5">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Nueva Masvida" width={1024} height={1536} unoptimized className="absolute -left-[654px] -top-[490px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[79.5cqw] md:-top-[60cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:ml-[7cqw] md:h-[5.5cqw] md:w-[20cqw]">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="CruzBlanca Isapre" width={1024} height={1536} unoptimized className="absolute -left-[108px] -top-[554px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[12cqw] md:-top-[68cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-[20cqw]">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Isapre Fundación" width={1024} height={1536} unoptimized className="absolute -left-[280px] -top-[554px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[33cqw] md:-top-[68cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:h-[5.5cqw] md:w-[20cqw]">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Esencial Isapre" width={1024} height={1536} unoptimized className="absolute -left-[442px] -top-[554px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[53cqw] md:-top-[68cqw] md:w-[100cqw]" />
          </div>
          <div className="relative h-[60px] w-[145px] overflow-hidden md:mr-[7cqw] md:h-[5.5cqw] md:w-[16cqw]">
            <Image src="/imagenes/referencia-isapres.jpeg" alt="Fonasa" width={1024} height={1536} unoptimized className="absolute -left-[587px] -top-[554px] w-[819.2px] max-w-none brightness-[1.04] contrast-[1.03] mix-blend-multiply md:-left-[72cqw] md:-top-[68cqw] md:w-[100cqw]" />
          </div>
        </div>
      </section>
      {/* MOTIVOS Y FORMULARIO */}
      <section className="grid gap-8 bg-[#f5f6f1] px-5 py-8 md:grid-cols-[0.8fr_1fr] md:gap-[2.1cqw] md:px-[3.7cqw] md:py-[2.4cqw]">
        <div>
          <h2 className="px-2 text-[29px] font-bold leading-[1.08] tracking-[-0.045em] md:px-[1.3cqw] md:text-[3.25cqw]">¿Por qué revisar tu<br />plan actual?</h2>
          <p className="mt-2 px-2 text-base leading-tight text-[#374654] md:px-[1.3cqw] md:text-[1.7cqw]">Estas son las razones más comunes por las que las personas deciden cambiarse de ISAPRE<br className="hidden md:block" /> o evaluar otras alternativas:</p>
          <div className="mt-4 space-y-2 md:mt-[1.5cqw] md:space-y-[0.9cqw]">
            <article className="flex items-center gap-3 rounded-2xl bg-white/85 p-3 md:gap-[1.5cqw] md:rounded-[1.7cqw] md:p-[1.1cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 shrink-0 rounded-full bg-[#e9f2e5] p-2.5 text-[#00523f] md:h-[5.3cqw] md:w-[5.3cqw] md:p-[1.2cqw]"><use href="#icono-moneda" /></svg><div><h3 className="text-[13px] font-semibold leading-tight text-[#1e303c] md:text-[1.4cqw]">Alzas constantes en los precios</h3><p className="mt-0.5 text-[13px] leading-tight text-[#5c6876] md:text-[1.4cqw]">Reajustes anuales y cobros en UF vuelven<br className="hidden md:block" /> los planes cada vez más caros.</p></div></article>
            <article className="flex items-center gap-3 rounded-2xl bg-white/85 p-3 md:gap-[1.5cqw] md:rounded-[1.7cqw] md:p-[1.1cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 shrink-0 rounded-full bg-[#e9f2e5] p-2.5 text-[#00523f] md:h-[5.3cqw] md:w-[5.3cqw] md:p-[1.2cqw]"><use href="#icono-familia" /></svg><div><h3 className="text-[13px] font-semibold leading-tight text-[#1e303c] md:text-[1.4cqw]">Cambios en tu situación familiar</h3><p className="mt-0.5 text-[13px] leading-tight text-[#5c6876] md:text-[1.4cqw]">Matrimonio, hijos o cargas adicionales<br className="hidden md:block" /> pueden requerir un plan más adecuado.</p></div></article>
            <article className="flex items-center gap-3 rounded-2xl bg-white/85 p-3 md:gap-[1.5cqw] md:rounded-[1.7cqw] md:p-[1.1cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 shrink-0 rounded-full bg-[#e9f2e5] p-2.5 text-[#00523f] md:h-[5.3cqw] md:w-[5.3cqw] md:p-[1.2cqw]"><use href="#icono-casa" /></svg><div><h3 className="text-[13px] font-semibold leading-tight text-[#1e303c] md:text-[1.4cqw]">Mejores coberturas</h3><p className="mt-0.5 text-[13px] leading-tight text-[#5c6876] md:text-[1.4cqw]">Puedes acceder a mejores clínicas<br className="hidden md:block" /> y prestaciones según tus necesidades.</p></div></article>
            <article className="flex items-center gap-3 rounded-2xl bg-white/85 p-3 md:gap-[1.5cqw] md:rounded-[1.7cqw] md:p-[1.1cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 shrink-0 rounded-full bg-[#e9f2e5] p-2.5 text-[#00523f] md:h-[5.3cqw] md:w-[5.3cqw] md:p-[1.2cqw]"><use href="#icono-documento" /></svg><div><h3 className="text-[13px] font-semibold leading-tight text-[#1e303c] md:text-[1.4cqw]">Quieres un plan que se ajuste a tu presupuesto</h3><p className="mt-0.5 text-[13px] leading-tight text-[#5c6876] md:text-[1.4cqw]">Revisamos opciones que se adapten a tu renta<br className="hidden md:block" /> y a lo que realmente usas.</p></div></article>
          </div>
        </div>
        <section aria-labelledby="titulo-formulario" className="relative rounded-[20px] bg-white px-5 pb-5 pt-12 md:rounded-[1.8cqw] md:px-[2.7cqw] md:pb-[2cqw] md:pt-[4.6cqw]">
          <p className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#e9f2e3] px-5 py-2 text-[11px] font-semibold md:px-[2cqw] md:py-[0.8cqw] md:text-[1.15cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#004a3b]"><use href="#icono-candado" /></svg>100% seguro y sin compromiso</p>
          <h2 id="titulo-formulario" className="text-[29px] font-bold leading-tight tracking-[-0.045em] md:text-[3.5cqw]">Completa tus datos</h2>
          <p className="text-base leading-tight text-[#526171] md:text-[2cqw]">y te contactaremos para evaluar tu caso.</p>
        <div role="group" aria-label="Datos de contacto y preferencias" className="mt-7 grid gap-x-4 md:gap-x-[1.8cqw] gap-y-5 md:mt-[1.8cqw] md:grid-cols-2">
          <div className="space-y-5 md:space-y-[1.6cqw]">
            <div>
              <label htmlFor="nombre" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">Nombre completo *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><circle cx="12" cy="7" r="4" /><path d="M3 22v-2a9 9 0 0 1 18 0v2Z" /></svg>
                <input id="nombre" name="nombre" type="text" autoComplete="name" placeholder="Ej: María Pérez González" className="h-12 w-full rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-3 text-base text-[#35473e] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 placeholder:text-[#9ba0a5] md:h-[3.8cqw] md:text-[1.17cqw]" />
              </div>
            </div>
            <div>
              <label htmlFor="nacimiento" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">Fecha de nacimiento *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><rect x="3" y="5" width="18" height="17" rx="2" /><path d="M3 10h18M7 2v6M17 2v6" /></svg>
                <input id="nacimiento" name="fechaNacimiento" type="text" inputMode="numeric" autoComplete="bday" placeholder="DD / MM / AAAA" className="h-12 w-full rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-3 text-base text-[#35473e] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 placeholder:text-[#9ba0a5] md:h-[3.8cqw] md:text-[1.17cqw]" />
              </div>
            </div>
            <div>
              <label htmlFor="correo" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">Email *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><rect x="2" y="4" width="20" height="16" rx="2" /><path strokeLinejoin="round" d="m3 6 9 8 9-8" /></svg>
                <input id="correo" name="correo" type="email" autoComplete="email" placeholder="ejemplo@correo.cl" className="h-12 w-full rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-3 text-base text-[#35473e] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 placeholder:text-[#9ba0a5] md:h-[3.8cqw] md:text-[1.17cqw]" />
              </div>
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">Teléfono *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><path strokeLinejoin="round" d="m7 2 4 6-3 3c1 3 3 5 6 6l3-3 5 4c-1 4-3 5-6 4C8 20 3 15 2 7 1 4 3 2 7 2Z" /></svg>
                <input id="telefono" name="telefono" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" className="h-12 w-full rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-3 text-base text-[#35473e] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 placeholder:text-[#9ba0a5] md:h-[3.8cqw] md:text-[1.17cqw]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-[1.6cqw]">
            <div>
              <label htmlFor="clinica" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">Clínica de preferencia *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><path d="M6 22V2h12v20M6 6H2v16h20V6h-4M10 6h4m-2-2v4M9 12h2m2 0h2m-6 3h2m2 0h2m-5 7v-4h4v4" /></svg>
                <select id="clinica" name="clinica" defaultValue="" className="h-12 w-full appearance-none rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-9 text-base text-[#9ba0a5] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 md:h-[3.8cqw] md:text-[1.17cqw]"><option value="" disabled>Selecciona una clínica</option></select>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d6c6d]"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
            <div>
              <label htmlFor="renta" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">¿Cuánto es tu renta imponible? *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2cqw] md:w-[2cqw] -translate-y-1/2 text-[#707d80]"><circle cx="12" cy="12" r="10" /><path d="M15 8c-1-2-6-2-6 1s6 2 6 5-5 4-6 2m3-11v14" /></svg>
                <input id="renta" name="rentaImponible" type="text" inputMode="numeric" placeholder="Ej: $1.000.000" className="h-12 w-full rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-3 text-base text-[#35473e] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 placeholder:text-[#9ba0a5] md:h-[3.8cqw] md:text-[1.17cqw]" />
              </div>
            </div>
            <div>
              <label htmlFor="cargas" className="mb-1 block text-sm font-medium md:text-[1.25cqw]">¿Tienes cargas? *</label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="pointer-events-none absolute left-3 top-1/2 md:left-[1.2cqw] h-5 w-5 md:h-[2.2cqw] md:w-[2.2cqw] -translate-y-1/2 text-[#707d80]"><circle cx="12" cy="7" r="4" /><path d="M5 22v-2a7 7 0 0 1 14 0v2M5 4a4 4 0 0 0 0 7m14-7a4 4 0 0 1 0 7M3 14c-3 2-3 5-2 7m20-7c3 2 3 5 2 7" /></svg>
                <select id="cargas" name="cargas" defaultValue="" className="h-12 w-full appearance-none rounded-lg border border-[#d6d9d9] bg-[#fdfdfd] pl-11 md:pl-[4.5cqw] pr-9 text-base text-[#9ba0a5] shadow-xs outline-none transition focus:border-[#668674] focus:ring-2 focus:ring-[#668674]/20 md:h-[3.8cqw] md:text-[1.17cqw]"><option value="" disabled>Selecciona una opción</option></select>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d6c6d]"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
            <button type="button" className="mt-auto flex min-h-12 w-full items-center justify-center gap-4 rounded-[22px] bg-linear-to-r from-[#07775f] to-[#00523f] px-5 py-3 text-lg font-semibold text-white transition-colors hover:from-[#006550] hover:to-[#003f32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#476a53] md:min-h-[5.8cqw] md:py-[0.8cqw] md:text-[1.9cqw]">
              <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 md:h-[3.1cqw] md:w-[3.1cqw]"><path strokeLinejoin="round" d="m3 15 26-12-9 26-6-10-11-4Zm11 4L29 3" /></svg>
              Enviar formulario
            </button>
          </div>
        </div>

          <p className="mt-4 flex items-start justify-end gap-2 text-[11px] leading-snug text-[#737e8a] md:mt-[1.4cqw] md:text-[1.1cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-5 shrink-0 text-[#606d79]"><use href="#icono-candado" /></svg><span>Tus datos están seguros con nosotros.<br />Solo te contactaremos para asesorarte.</span></p>
        </section>
      </section>

      {/* BONO DE BIENVENIDA */}
      <section aria-labelledby="titulo-bono" className="mx-5 flex flex-col items-center gap-4 rounded-[24px] bg-[#f5eeff] px-5 py-5 md:mx-[3.5cqw] md:flex-row md:gap-[2cqw] md:rounded-[2.5cqw] md:px-[3.5cqw] md:py-[1.3cqw]">
        <div className="relative h-[135px] w-[140px] shrink-0 overflow-hidden mix-blend-multiply md:h-[12.6cqw] md:w-[14cqw]"><Image src="/imagenes/referencia-bienvenida.png" alt="Regalo con cinta violeta" width={937} height={1679} unoptimized className="absolute -left-[64px] -top-[1183px] w-[937px] max-w-none md:-left-[6.8cqw] md:-top-[126.2cqw] md:w-[100cqw]" /></div>
        <div className="text-center md:flex-1 md:text-left"><h2 id="titulo-bono" className="text-[22px] font-bold leading-tight tracking-[-0.04em] md:text-[2.5cqw]">Recibe un <span className="text-[#510299]">Bono de Bienvenida</span><br /><span className="whitespace-nowrap md:text-[2.2cqw]">por tu cambio</span></h2><p className="mt-2 text-sm leading-snug text-[#4e5467] md:text-[1.35cqw]">Completa el formulario y te contactaremos para evaluar tu caso.</p></div>
        <ul className="space-y-2 text-[13px] text-[#505569] md:border-l md:border-[#cbb5e4] md:py-[1cqw] md:pl-[3cqw] md:text-[1.35cqw]">
          <li className="flex items-center gap-3"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5808a1] text-white">✓</span>Incentivo económico por tu cambio</li>
          <li className="flex items-center gap-3"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5808a1] text-white">✓</span>Sujeto a condiciones y elegibilidad</li>
          <li className="flex items-center gap-3"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5808a1] text-white">✓</span>Te explicamos todos los detalles</li>
        </ul>
      </section>

      {/* CÓMO FUNCIONA */}
      <section aria-labelledby="titulo-proceso" className="px-6 pb-9 pt-7 md:px-[4.5cqw] md:pb-[4.2cqw] md:pt-[2.5cqw]">
        <h2 id="titulo-proceso" className="text-[26px] font-bold tracking-[-0.045em] md:text-[2.8cqw]">¿Cómo funciona?</h2>
        <div aria-hidden="true" className="ml-2 h-2 w-16 -rotate-3 rounded-[50%] border-t-[3px] border-[#176c50]" />
        <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-[1.5cqw] md:grid-cols-4 md:gap-[2cqw]">
          <li className="relative text-center"><div className="relative mx-auto w-fit"><span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#09624c] text-sm font-bold text-white md:-left-[3.5cqw] md:h-[2.5cqw] md:w-[2.5cqw] md:text-[1.5cqw]">1</span><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 rounded-full bg-[#f0f5ed] p-3.5 text-[#005440] md:h-[6.7cqw] md:w-[6.7cqw] md:p-[1.5cqw]"><use href="#icono-documento" /></svg></div><h3 className="mt-3 text-sm font-semibold md:mt-[0.8cqw] md:text-[1.5cqw]">Completa el formulario</h3><p className="mt-1 text-[13px] leading-snug text-[#657180] md:mt-0 md:text-[1.4cqw]">Es rápido y 100% online.</p><span aria-hidden="true" className="absolute -right-4 top-6 hidden text-3xl font-light text-[#71977f] md:block">›</span></li>
          <li className="relative text-center"><div className="relative mx-auto w-fit"><span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#09624c] text-sm font-bold text-white md:-left-[3.5cqw] md:h-[2.5cqw] md:w-[2.5cqw] md:text-[1.5cqw]">2</span><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 rounded-full bg-[#f0f5ed] p-3.5 text-[#005440] md:h-[6.7cqw] md:w-[6.7cqw] md:p-[1.5cqw]"><use href="#icono-audifonos" /></svg></div><h3 className="mt-3 text-sm font-semibold md:mt-[0.8cqw] md:text-[1.5cqw]">Te contactamos</h3><p className="mt-1 text-[13px] leading-snug text-[#657180] md:mt-0 md:text-[1.4cqw]">Un asesor revisará tu caso<br /> y tus alternativas.</p><span aria-hidden="true" className="absolute -right-4 top-6 hidden text-3xl font-light text-[#71977f] md:block">›</span></li>
          <li className="relative text-center"><div className="relative mx-auto w-fit"><span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#09624c] text-sm font-bold text-white md:-left-[3.5cqw] md:h-[2.5cqw] md:w-[2.5cqw] md:text-[1.5cqw]">3</span><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 rounded-full bg-[#f0f5ed] p-3.5 text-[#005440] md:h-[6.7cqw] md:w-[6.7cqw] md:p-[1.5cqw]"><use href="#icono-buscar" /></svg></div><h3 className="mt-3 text-sm font-semibold md:mt-[0.8cqw] md:text-[1.5cqw]">Comparamos opciones</h3><p className="mt-1 text-[13px] leading-snug text-[#657180] md:mt-0 md:text-[1.4cqw]">Te mostramos las mejores<br /> alternativas según tu situación.</p><span aria-hidden="true" className="absolute -right-4 top-6 hidden text-3xl font-light text-[#71977f] md:block">›</span></li>
          <li className="relative text-center"><div className="relative mx-auto w-fit"><span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#09624c] text-sm font-bold text-white md:-left-[3.5cqw] md:h-[2.5cqw] md:w-[2.5cqw] md:text-[1.5cqw]">4</span><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 rounded-full bg-[#f0f5ed] p-3.5 text-[#005440] md:h-[6.7cqw] md:w-[6.7cqw] md:p-[1.5cqw]"><use href="#icono-escudo" /></svg></div><h3 className="mt-3 text-sm font-semibold md:mt-[0.8cqw] md:text-[1.5cqw]">Tú decides</h3><p className="mt-1 text-[13px] leading-snug text-[#657180] md:mt-0 md:text-[1.4cqw]">Si te conviene, te acompañamos<br /> en todo el proceso de cambio.</p></li>
        </ol>
      </section>
      <footer className="mx-5 mb-7 grid grid-cols-2 gap-x-4 gap-y-6 rounded-[20px] bg-[#f5f5f1] px-5 py-6 text-[#5d6c79] md:mx-[3.5cqw] md:mb-[3.2cqw] md:grid-cols-4 md:gap-0 md:rounded-[2cqw] md:px-[2.8cqw] md:py-[3cqw]">
        <div className="flex items-center gap-3 md:justify-center md:gap-[1.5cqw] md:border-r md:border-[#d4dadd]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 md:h-[3.8cqw] md:w-[3.8cqw]"><use href="#icono-reloj" /></svg><p className="text-xs leading-snug md:text-[1.35cqw]">Respuesta en menos<br /> de 24 horas</p></div>
        <div className="flex items-center gap-3 md:justify-center md:gap-[1.5cqw] md:border-r md:border-[#d4dadd]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 md:h-[3.8cqw] md:w-[3.8cqw]"><use href="#icono-audifonos" /></svg><p className="text-xs leading-snug md:text-[1.35cqw]">Asesoría de expertos<br /> en salud previsional</p></div>
        <div className="flex items-center gap-3 md:justify-center md:gap-[1.5cqw] md:border-r md:border-[#d4dadd]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 md:h-[3.8cqw] md:w-[3.8cqw]"><use href="#icono-ubicacion" /></svg><p className="text-xs leading-snug md:text-[1.35cqw]">Atención en todo Chile</p></div>
        <div className="flex items-center gap-3 md:justify-center md:gap-[1.5cqw]"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 md:h-[3.8cqw] md:w-[3.8cqw]"><use href="#icono-escudo" /></svg><p className="text-xs leading-snug md:text-[1.35cqw]">Sin costos ocultos</p></div>
      </footer>
    </main>
  );
}
