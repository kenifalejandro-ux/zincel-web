// client/src/components/global/footer/FooterVariantB.tsx

export function FooterVariantB() {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-2xl md:text-3xl leading-snug text-zinc-200 max-w-4xl">
        Creamos sistemas digitales con criterio, claridad y visión a largo plazo.
      </p>

      <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-zinc-100">
        <span>Branding</span>
        <span>UX / UI</span>
        <span>Web & Modelado 3D</span>
        <span>Arquitectura Frontend</span>
      </div>
    </div>
  );
}
