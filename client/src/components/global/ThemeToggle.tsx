// client/src/components/global/ThemeToggle.tsx
//
// Botón circular minimal con animación de sol → luna.
// Para una variante segmentada (light / system / dark) ver ThemeToggleSegmented.tsx
//
// Uso: <ThemeToggle />

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  className?: string;
  /** Tamaño del botón en px. Default 36. */
  size?: number;
}

export default function ThemeToggle({ className = "", size = 36 }: Props) {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";
  const iconSize = Math.round(size * 0.45);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      style={{ width: size, height: size }}
      className={[
        "relative inline-flex items-center justify-center rounded-full",
        "border border-[color:var(--color-border)]",
        "text-[color:var(--color-ink-soft)]",
        "bg-transparent",
        "transition-colors duration-150 ease-[cubic-bezier(.4,0,.2,1)]",
        "hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-ink)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]",
        className,
      ].join(" ")}
    >
      {/* Sun — visible en dark (porque al clickearlo vas a light) */}
      <Sun
        size={iconSize}
        strokeWidth={1.5}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-[cubic-bezier(.2,0,0,1)]"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0.5)",
        }}
      />
      {/* Moon — visible en light (porque al clickearlo vas a dark) */}
      <Moon
        size={iconSize}
        strokeWidth={1.5}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-[cubic-bezier(.2,0,0,1)]"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(90deg) scale(0.5)" : "rotate(0) scale(1)",
        }}
      />
    </button>
  );
}
