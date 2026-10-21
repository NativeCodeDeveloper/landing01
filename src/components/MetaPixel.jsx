"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ID_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Carga el píxel de Meta con el snippet oficial. El PageView inicial lo emite
 * el propio snippet; este componente solo repite el PageView en navegaciones
 * de cliente (cambios de ruta sin recargar la página).
 */
export default function MetaPixel() {
    const ruta = usePathname();
    const esCargaInicial = useRef(true);

    useEffect(() => {
        if (esCargaInicial.current) {
            esCargaInicial.current = false;
            return;
        }
        try {
            window.fbq?.("track", "PageView");
        } catch (error) {
            console.error("No se pudo registrar el PageView en Meta:", error);
        }
    }, [ruta]);

    if (!ID_PIXEL) return null;

    return (
        <>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${ID_PIXEL}');
          fbq('track', 'PageView');
        `}
            </Script>
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${ID_PIXEL}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
}
