// client/src/components/global/footer/FooterVariantA.tsx

export function FooterVariantA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-widest text-zinc-200">Estudio digital</span>

        <h2 className="text-3xl font-semibold text-zinc-200">Zincel</h2>

        <p className="max-w-md text-zinc-100 leading-relaxed">
          Diseñamos y desarrollamos experiencias digitales claras, sólidas y escalables para marcas
          que buscan crecer con criterio.
        </p>
      </div>

      <div className="flex flex-col justify-between text-sm text-zinc-100">
        <span>Lima · Perú</span>
        <span>© {new Date().getFullYear()} Zincel</span>
      </div>
    </div>
  );
}
