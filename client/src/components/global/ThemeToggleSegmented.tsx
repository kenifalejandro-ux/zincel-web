// client/src/components/global/ThemeToggleSegmented.tsx
//
// Variante con 3 estados: Light · System · Dark (control segmentado, pill).
// Más explícita que el botón de icono — útil en footer o en página de configuración.
//
// Uso: <ThemeToggleSegmented />

import { Sun, Monitor, Moon } from "lucide-react";
import { useTheme, type ThemeMode } from "@/hooks/useTheme";

const OPTIONS: { value: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { value: "light",  label: "Claro",    Icon: Sun },
  { value: "system", label: "Sistema",  Icon: Monitor },
  { value: "dark",   label: "Oscuro",   Icon: Moon },
];

interface Props {
  className?: string;
  /** Si true, oculta los labels y deja solo iconos */
  iconOnly?: boolean;
}

export default function ThemeToggleSegmented({ className = "", iconOnly = false }: Props) {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className={[
        "inline-flex items-center gap-0.5 rounded-full p-1",
        "border border-[color:var(--color-border)]",
        "bg-[color:var(--color-bg-elevated)]",
        className,
      ].join(" ")}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(value)}
            title={label}
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
              "text-[11px] uppercase tracking-[0.18em] font-medium",
              "transition-colors duration-150 ease-[cubic-bezier(.4,0,.2,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]",
              active
                ? "bg-[color:var(--color-ink)] text-[color:var(--color-ink-inverse)]"
                : "text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]",
            ].join(" ")}
          >
            <Icon size={13} strokeWidth={1.75} aria-hidden="true" />
            {!iconOnly && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
