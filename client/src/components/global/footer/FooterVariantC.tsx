// client/src/components/global/footer/FooterVariantC.tsx

export function FooterVariantC() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-4xl md:text-5xl font-medium text-zinc-100 leading-tight">
        Diseño.
        <br />
        Código.
        <br />
        Claridad.
      </h3>

      <span className="text-xs text-zinc-200 tracking-wide">
        © {new Date().getFullYear()} Zincel
      </span>
    </div>
  );
}
