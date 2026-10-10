import "./globals.css";

export const metadata = {
  title: "Tu salud, tu decisión | Cámbiate de ISAPRE",
  description: "Tu bienestar también vale. Conoce las opciones para cambiarte de ISAPRE y recibe asesoría durante todo el proceso.",
};

export default function DisposicionPrincipal({ children }) {
  return (
    <html
      lang="es"
      className="min-h-full antialiased"
    >
      <body className="min-h-screen bg-[#e9ede7] font-[Arial,Helvetica,sans-serif]">{children}</body>
    </html>
  );
}
