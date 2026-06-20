/** client/src/components/hero/HeroBg.tsx
 *
 
 * Drop this as the FIRST child of any hero <section>.
 * The parent needs: relative overflow-hidden bg-[#0a0a0a]
 *
 * Usage:
 *   <section className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
 *     <HeroBg />
 *     ...your content...
 *   </section>
 *
 * Optional props:
 *   halo    — "at" position for the radial glow, default "60% 30%"
 *   dots    — "at" position for the dot-mask,     default "55% 40%"
 *   haloOpacity  — number 0-100, default 60
 *   dotsOpacity  — number 0-100, default 30
 */

interface HeroBgProps {
  halo?:        string;
  dots?:        string;
  haloOpacity?: number;
  dotsOpacity?: number;
}

export default function HeroBg({
  halo        = "60% 30%",
  dots        = "55% 40%",
  haloOpacity = 60,
  dotsOpacity = 30,
}: HeroBgProps) {
  return (
    <>
      {/* Golden radial halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: haloOpacity / 100,
          background: `radial-gradient(130% 80% at ${halo}, rgba(233,200,147,0.07), transparent 55%)`,
        }}
      />
      {/* Dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: dotsOpacity / 100,
          backgroundImage: "radial-gradient(rgba(244,241,234,0.12) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: `radial-gradient(90% 80% at ${dots}, #000, transparent)`,
          maskImage:       `radial-gradient(90% 80% at ${dots}, #000, transparent)`,
        }}
      />
    </>
  );
}
