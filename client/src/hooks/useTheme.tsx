// client/src/hooks/useTheme.ts
//
// Hook + Provider para tema light / dark / system.
// - Aplica la clase `.dark` al <html> (compatible con el @custom-variant dark del tokens.css)
// - Persiste la preferencia en localStorage
// - Si el usuario está en "system", escucha prefers-color-scheme y reacciona en vivo
// - SSR-safe: no toca window durante el render del servidor
//
// Uso:
//   1. Envuelve <App /> con <ThemeProvider> (ver Theme Setup.md)
//   2. En cualquier componente: const { mode, resolved, setMode, toggle } = useTheme();

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** Preferencia del usuario, incluye "system" */
  mode: ThemeMode;
  /** Tema realmente aplicado: siempre "light" o "dark" */
  resolved: ResolvedTheme;
  /** Cambia la preferencia (persiste en localStorage) */
  setMode: (m: ThemeMode) => void;
  /** Atajo: alterna light ↔ dark (ignora "system") */
  toggle: () => void;
}

const STORAGE_KEY = "zincel-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* localStorage bloqueado (ej. Safari privado) */
  }
  return "light";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

function applyTheme(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  // Hint al navegador para que ajuste scrollbars y form controls nativos
  document.documentElement.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStored());
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(readStored()));

  // Aplica el tema cuando cambia la preferencia
  useEffect(() => {
    const r = resolveTheme(mode);
    setResolved(r);
    applyTheme(r);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* noop */
    }
  }, [mode]);

  // Cuando estás en "system", reacciona al cambio del SO en vivo
  useEffect(() => {
    if (mode !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const r: ResolvedTheme = e.matches ? "dark" : "light";
      setResolved(r);
      applyTheme(r);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const current = resolveTheme(prev);
      return current === "dark" ? "light" : "dark";
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return ctx;
}
