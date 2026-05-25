// client/src/components/global/footer/FooterVariantD.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FooterVariantD() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-6">
      {/* Lado izquierdo: CTA fuerte + claim corto */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-3xl md:text-4xl font-medium text-zinc-200 leading-tight">
          Síguenos en nuestras redes sociales
        </h3>
        {/* Lado derecho: Contactos directos + redes */}
        <div className="flex flex-col gap-6 text-sm">
          {/* Redes sociales – las mismas que ya tienes arriba, pero aquí más prominentes */}
          <div className="flex gap-5 text-zinc-200">
            {/* ... dentro de tu footer */}
            <a
              href="https://www.facebook.com/zincelideas"
              className="hover:text-zinc-200 transition-colors"
            >
              <FontAwesomeIcon icon={["fab", "facebook-f"]} className="text-xl" />
            </a>
            <a
              href="https://www.tiktok.com/@zincelideas"
              className="hover:text-zinc-200 transition-colors"
            >
              <FontAwesomeIcon icon={["fab", "tiktok"]} className="text-xl" />
            </a>
            <a
              href="https://www.behance.net/zincelideas"
              className="hover:text-zinc-200 transition-colors"
            >
              <FontAwesomeIcon icon={["fab", "behance"]} className="text-xl" />
            </a>
            {/* Si agregas Instagram o LinkedIn en el futuro, aquí va perfecto */}
          </div>
        </div>

        <span className="text-xs text-zinc-200 mt-2">© {new Date().getFullYear()} Zincel</span>
      </div>
    </div>
  );
}
