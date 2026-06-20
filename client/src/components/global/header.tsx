// src/components/global/Header.tsx

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  RefObject,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Mail, Phone, MapPin, X, Search, Command,
  MessageSquare, ArrowRight, MessageCircle,
} from "lucide-react";

import { debounce } from "../../utils/debounce";
import { useImageOverlap } from "../../hooks/useImageOverlap";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import logoZincelWhite from "../../assets/logo-zincel-white.svg";
import logoZincelBlack from "../../assets/logo-zincel-black.svg";

// ═════════════════════════════════════════════════════════════════════════════
// TYPES
// ═════════════════════════════════════════════════════════════════════════════

interface Tab {
  label: string;
  href: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface Labels {
  contactTitle: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
}

interface HeaderProps {
  logo: string;
  logoLight?: string;
  logoDark?: string;
  brandName?: string;
  tabs?: Tab[];
  contactInfo?: ContactInfo;
  enableCustomCursor?: boolean;
  enableCommandPalette?: boolean;
  enableMagnetic?: boolean;
  enableScrollProgress?: boolean;
  enablePageCurtain?: boolean;
  enableLogoMorph?: boolean;
}

// ═════════════════════════════════════════════════════════════════════════════
// HOOKS
// ═════════════════════════════════════════════════════════════════════════════

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const calc = debounce(() => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, h.scrollTop / max));
      setProgress(p);
    }, 10);
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    calc();
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);
  return progress;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&·";

function useScrambleText(initial: string) {
  const [text, setText] = useState(initial);
  const textRef = useRef(initial);
  const rafRef = useRef<number | null>(null);

  useEffect(() => { textRef.current = text; }, [text]);
  useEffect(() => { setText(initial); }, [initial]);

  const run = useCallback((target: string) => {
    const from = textRef.current;
    const len = Math.max(from.length, target.length);
    const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
    for (let i = 0; i < len; i++) {
      queue.push({
        from: from[i] ?? "",
        to: target[i] ?? "",
        start: Math.floor(Math.random() * 10),
        end: Math.floor(Math.random() * 10) + 10,
      });
    }
    let frame = 0;
    const tick = () => {
      let out = "", done = 0;
      for (const item of queue) {
        if (frame >= item.end) { done++; out += item.to; }
        else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.3) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          out += item.char;
        } else { out += item.from; }
      }
      setText(out);
      if (done === queue.length) return;
      frame += 1;
      rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    tick();
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);
  return [text, run] as const;
}

function useMagnetic<T extends HTMLElement>(
  outerRef: RefObject<T>,
  innerRef: RefObject<HTMLElement>,
  { strength = 0.35, radius = 80, ease = 0.18 }: { strength?: number; radius?: number; ease?: number } = {},
) {
  useEffect(() => {
    const outer = outerRef.current, inner = innerRef.current;
    if (!outer || !inner) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, active = false;
    const tick = () => {
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (active || Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else { raf = 0; }
    };
    const onMove = (e: MouseEvent) => {
      const r = outer.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const max = Math.max(r.width, r.height) / 2 + radius;
      if (dist < max) { active = true; tx = dx * strength; ty = dy * strength; }
      else if (active) { active = false; tx = 0; ty = 0; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { active = false; tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      inner.style.transform = "";
    };
  }, [outerRef, innerRef, strength, radius, ease]);
}

// ═════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

// ── MenuIcon (9 dots → 5 dots X → X lines) ───────────────────────────────────
type MenuState = "closed" | "hover" | "open";

function MenuIcon({ state, size = 20 }: { state: MenuState; size?: number }) {
  const pos = [
    { x: -6, y: -6 }, { x: 0, y: -6 }, { x: 6, y: -6 },
    { x: -6, y:  0 }, { x: 0, y:  0 }, { x: 6, y:  0 },
    { x: -6, y:  6 }, { x: 0, y:  6 }, { x: 6, y:  6 },
  ];
  const crossIdx = new Set([1, 3, 5, 7]);
  const xT: Record<number, string> = {
    0: "translate(3px,3px) rotate(45deg) scaleX(2.6)",
    2: "translate(-3px,3px) rotate(-45deg) scaleX(2.6)",
    6: "translate(3px,-3px) rotate(-45deg) scaleX(2.6)",
    8: "translate(-3px,-3px) rotate(45deg) scaleX(2.6)",
  };
  const getStyle = (i: number): React.CSSProperties => {
    const t = `${i * 25}ms`;
    const transition = `opacity 280ms ease ${t}, transform 350ms cubic-bezier(0.77,0,0.175,1) ${t}`;
    const transformOrigin = `${pos[i].x}px ${pos[i].y}px`;
    if (state === "closed") return { opacity: 1, transform: "scale(1)", transition, transformOrigin };
    if (state === "hover") {
      if (crossIdx.has(i)) return { opacity: 0, transform: "scale(0)", transition, transformOrigin };
      return { opacity: 1, transform: "scale(1)", transition, transformOrigin };
    }
    if (i === 4 || crossIdx.has(i)) return { opacity: 0, transform: "scale(0)", transition, transformOrigin };
    return { opacity: 1, transform: xT[i], transition, transformOrigin };
  };
  return (
    <svg width={size} height={size} viewBox="-10 -10 20 20" fill="currentColor" aria-hidden="true">
      {pos.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="1.8" style={getStyle(i)} />))}
    </svg>
  );
}

// ── MagneticWrap ──────────────────────────────────────────────────────────────
function MagneticWrap({
  children, strength = 0.35, radius = 80, className = "",
}: { children: React.ReactNode; strength?: number; radius?: number; className?: string }) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  useMagnetic(outerRef, innerRef, { strength, radius });
  return (
    <span ref={outerRef} className={`inline-flex ${className}`}>
      <span
        ref={innerRef}
        className="inline-flex will-change-transform transition-transform duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      >
        {children}
      </span>
    </span>
  );
}

// ── CustomCursor ──────────────────────────────────────────────────────────────
function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"default" | "hover" | "label" | "drag">("default");
  const [label, setLabel] = useState("");
  const [supported, setSupported] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setSupported(mq.matches);
    const onChange = () => setSupported(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const id = "__zincel-cursor-style";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `body.cursor-none, body.cursor-none * { cursor: none !important; }`;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !supported) { document.body.classList.remove("cursor-none"); return; }
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, [enabled, supported]);

  useEffect(() => {
    if (!enabled || !supported) return;
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.24;
      pos.current.y += (target.current.y - pos.current.y) * 0.24;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e: MouseEvent) => { target.current.x = e.clientX; target.current.y = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      let cur: HTMLElement | null = el, value: string | null = null;
      while (cur && cur !== document.body) {
        if (cur.dataset && cur.dataset.cursor) { value = cur.dataset.cursor; break; }
        cur = cur.parentElement;
      }
      if (!value) {
        const interactive = el.closest?.("a, button, [role='button'], input, textarea, select");
        if (interactive) { setState("hover"); setLabel(""); return; }
        setState("default"); setLabel(""); return;
      }
      if (value.startsWith("label:")) { setState("label"); setLabel(value.slice(6)); }
      else if (value === "hover" || value === "drag" || value === "default") { setState(value); setLabel(""); }
      else { setState("default"); setLabel(""); }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled, supported]);

  if (!enabled || !supported) return null;
  const isRing = state === "hover" || state === "drag";
  const isLabel = state === "label";
  const ringSize = state === "drag" ? 56 : 44;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference">
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black"
        style={{
          width:  isLabel ? "auto" : isRing ? ringSize : 6,
          height: isLabel ? "auto" : isRing ? ringSize : 6,
          padding: isLabel ? "8px 14px" : 0,
          background: isLabel ? "#fff" : isRing ? "rgba(255,255,255,0.12)" : "#fff",
          border: isRing ? "1px solid rgba(255,255,255,0.85)" : "none",
          borderRadius: 999,
          transition: "width 280ms cubic-bezier(0.34,1.56,0.64,1), height 280ms cubic-bezier(0.34,1.56,0.64,1), padding 240ms ease, background 240ms",
          whiteSpace: "nowrap",
        }}
      >
        {isLabel && (
          <span className="font-mono text-[11px] tracking-[0.06em] uppercase">{label}</span>
        )}
      </div>
    </div>
  );
}

// ── PageCurtain ───────────────────────────────────────────────────────────────
export interface PageCurtainHandle {
  play: (label?: string) => Promise<void>;
  retract: () => Promise<void>;
}

const PageCurtain = forwardRef<PageCurtainHandle, { color?: string; labelColor?: string; panels?: number }>(
  function PageCurtain({ color = "#181716", labelColor = "#f7f1e7", panels = 6 }, ref) {
    const [phase, setPhase] = useState<"idle" | "drawn" | "up">("idle");
    const [label, setLabel] = useState("");
    useImperativeHandle(ref, () => ({
      play: (l) => new Promise((res) => {
        setLabel(l ?? "");
        setPhase("drawn");
        setTimeout(res, (panels - 1) * 60 + 760);
      }),
      retract: () => new Promise((res) => {
        setPhase("up");
        setTimeout(() => { setPhase("idle"); setLabel(""); res(); }, (panels - 1) * 60 + 760);
      }),
    }), [panels]);
    if (phase === "idle") return null;
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${panels}, 1fr)` }}>
          {Array.from({ length: panels }).map((_, i) => (
            <div key={i} style={{
              background: color,
              transformOrigin: phase === "up" ? "bottom center" : "top center",
              transform: phase === "drawn" ? "scaleY(1)" : "scaleY(0)",
              transition: `transform 700ms cubic-bezier(0.76, 0, 0.24, 1) ${i * 60}ms`,
            }}/>
          ))}
        </div>
        {label && (
          <div className="absolute inset-0 grid place-items-center font-serif italic"
            style={{ color: labelColor, fontSize: "clamp(48px, 8vw, 120px)",
              opacity: phase === "drawn" ? 1 : 0, transition: "opacity 400ms ease 400ms" }}>
            {label}
          </div>
        )}
      </div>
    );
  },
);

// ── CommandPalette (⌘K) ───────────────────────────────────────────────────────
type CmdItem = { id: string; label: string; group: string; hint?: string; icon?: React.ReactNode; run: () => void };

function CommandPalette({
  open, onClose, tabs, onOpenContact, contactInfo,
}: {
  open: boolean; onClose: () => void; tabs: Tab[];
  onOpenContact: () => void; contactInfo?: ContactInfo;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmd = {
    search: "Buscar páginas, acciones, contacto…",
    nav: "Navegar",
    actions: "Acciones",
    contact: "Contacto",
    empty: "Sin resultados",
    esc: "esc",
    enter: "↵",
  };

  const items: CmdItem[] = useMemo(() => {
    const list: CmdItem[] = tabs.map((tab, i) => ({
      id: `nav-${tab.href}`,
      label: tab.label,
      group: cmd.nav,
      hint: String(i + 1).padStart(2, "0"),
      icon: <ArrowRight size={14} />,
      run: () => { navigate(tab.href); onClose(); },
    }));
    list.push({
      id: "contact",
      label: "Abrir panel de contacto",
      group: cmd.actions, icon: <MessageSquare size={14} />, hint: "C",
      run: () => { onOpenContact(); onClose(); },
    });
    if (contactInfo?.email) list.push({
      id: "email", label: contactInfo.email, group: cmd.contact, icon: <Mail size={14} />,
      run: () => { window.location.href = `mailto:${contactInfo.email}`; onClose(); },
    });
    if (contactInfo?.phone) list.push({
      id: "phone", label: contactInfo.phone, group: cmd.contact, icon: <Phone size={14} />,
      run: () => { window.location.href = `tel:${contactInfo.phone}`; onClose(); },
    });
    return list;
  }, [tabs, contactInfo, navigate, onClose, onOpenContact, cmd.nav, cmd.actions, cmd.contact]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => { if (open) { setQuery(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 60); } }, [open]);
  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === "Enter")     { e.preventDefault(); filtered[active]?.run(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  const grouped = useMemo(() => {
    const m = new Map<string, CmdItem[]>();
    filtered.forEach(it => { if (!m.has(it.group)) m.set(it.group, []); m.get(it.group)!.push(it); });
    return Array.from(m.entries());
  }, [filtered]);

  let flat = -1;

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-[#181716] backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog" aria-modal="true"
        className={`fixed left-1/2 top-[18vh] z-[91] w-[min(640px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden  shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
          <Search size={16} className="text-zinc-500 shrink-0" />
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={cmd.search}
            className="flex-1 border-0 bg-transparent text-[15px] text-zinc-950 outline-none placeholder:text-zinc-400"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-400">{cmd.esc}</span>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center font-serif italic text-lg text-zinc-400">{cmd.empty}</div>
          ) : grouped.map(([group, list]) => (
            <div key={group} className="mb-1">
              <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">{group}</div>
              {list.map((it) => {
                flat += 1;
                const sel = flat === active;
                return (
                  <button
                    key={it.id} onMouseEnter={() => setActive(filtered.indexOf(it))}
                    onClick={it.run} aria-selected={sel}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors ${
                      sel ? "bg-black/[0.06] text-zinc-950" : "text-zinc-500"
                    }`}
                  >
                    <span className="text-zinc-400 shrink-0">{it.icon}</span>
                    <span className="truncate flex-1">{it.label}</span>
                    {it.hint && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-zinc-400">{it.hint}</span>
                    )}
                    {sel && <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-zinc-500">{cmd.enter}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-black/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-400">
          <span className="flex items-center gap-2">↑↓ · {cmd.enter}</span>
          <span>Zincel ⌘K</span>
        </div>
      </div>
    </>
  );
}

// ── NavRow — scramble on hover, original overlay styling ──────────────────────
function NavRow({
  tab, index, isActive, onHover, onClick,
}: { tab: Tab; index: number; isActive: boolean; isFocused: boolean; onHover: () => void; onClick: () => void }) {
  const [text, scramble] = useScrambleText(tab.label);
  return (
    <li>
      <NavLink
        to={tab.href}
        onMouseEnter={() => { onHover(); scramble(tab.label); }}
        onFocus={() => { onHover(); scramble(tab.label); }}
        onClick={onClick}
        className={`group flex items-baseline gap-4 py-3 transition-colors duration-200 ${
          isActive ? "text-zinc-400" : "text-zinc-950/70 hover:text-zinc-950"
        }`}
      >
        <span className="text-xs text-zinc-500 group-hover:text-zinc-500">
          0{index + 1}
        </span>
        <span className="text-4xl font-light tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          {text}
        </span>
      </NavLink>
    </li>
  );
}

// ── MenuOverlay — beige curtain, original layout ──────────────────────────────
function MenuOverlay({
  open, onClose, tabs, pathname, contactInfo, labels, logo,
}: {
  open: boolean; onClose: () => void; tabs: Tab[]; pathname: string;
  contactInfo?: ContactInfo; labels: Labels; logo: string;
}) {
  const normalized = pathname.toLowerCase();
  const isServicesActive = normalized.startsWith("/servicios");

  
{  /** FONDO DEL OVERLAP */
}  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[60] bg-zinc-100 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", pointerEvents: open ? "auto" : "none" }}
    >
      {/* Top bar */}
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 pt-6 lg:px-8">
        <NavLink to="/" onClick={onClose}>
          <img src={logo} alt="Zincel" className="h-10" />
        </NavLink>
        <div className="absolute left-1/2 -translate-x-1/2">
          <button
            type="button" onClick={onClose}
            className="inline-flex items-center justify-center p-3 text-zinc-800 transition-colors hover:text-zinc-300"
            aria-label="Cerrar menú"
          >
            <MenuIcon state="open" />
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 lg:flex-row lg:px-8">
        {/* Left — Nav links */}
        <nav className="flex flex-1 flex-col justify-center py-12 lg:py-0">
          <ul className="flex flex-col">
            {tabs.map((tab, index) => {
              const lc = tab.href.toLowerCase();
              const isActive = lc === "/servicios" ? isServicesActive : normalized === lc;
              return (
                <div
                  key={tab.href}
                  style={{
                    transform: open ? "translateY(0)" : "translateY(12px)",
                    opacity: open ? 1 : 0,
                    transition: `opacity 400ms ease ${index * 60}ms, transform 400ms ease ${index * 60}ms`,
                  }}
                >
                  <NavRow
                    tab={tab} index={index} isActive={isActive} isFocused={false}
                    onHover={() => {}} onClick={onClose}
                  />
                </div>
              );
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className="hidden w-px bg-black/10 lg:block" />

        {/* Right — Contact info */}
        <div
          className="flex flex-col justify-end pb-16 lg:w-80 lg:justify-center lg:px-8 lg:py-0"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 500ms ease 450ms, transform 500ms ease 450ms",
          }}
        >
          <p className="mb-8 text-xs uppercase tracking-[0.18em] text-zinc-400">
            {labels.contactTitle}
          </p>
          <div className="space-y-6">
            {contactInfo?.email && (
              <a href={`mailto:${contactInfo.email}`} className="group flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.emailLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-800 transition-colors group-hover:text-zinc-950">
                  <Mail className="h-3.5 w-3.5 shrink-0" />{contactInfo.email}
                </span>
              </a>
            )}
            {contactInfo?.phone && (
              <a href={`tel:${contactInfo.phone}`} className="group flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.phoneLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-800 transition-colors group-hover:text-zinc-950">
                  <Phone className="h-3.5 w-3.5 shrink-0" />{contactInfo.phone}
                </span>
              </a>
            )}
            {contactInfo?.address && (
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.addressLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-800">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />{contactInfo.address}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ContactAside ──────────────────────────────────────────────────────────────
function ContactAside({
  open, onClose, tabs, contactInfo, labels,
}: { open: boolean; onClose: () => void; tabs: Tab[]; contactInfo?: ContactInfo; labels: Labels }) {
  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-black/20 transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />
      <aside
        className="fixed inset-y-0 right-0 z-[80] w-full max-w-sm bg-[#f7f1e7] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex h-16 items-center justify-between px-6 pt-4">
          <button
            type="button" onClick={onClose} data-cursor="label:Cerrar"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 p-2.5 text-zinc-600 transition-colors hover:bg-black/10 hover:text-zinc-950"
            aria-label="Cerrar"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex flex-col gap-10 px-8 py-10">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{labels.contactTitle}</p>
          <div className="space-y-6">
            {contactInfo?.email && (
              <a href={`mailto:${contactInfo.email}`} className="group flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.emailLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-600 transition-colors group-hover:text-zinc-950">
                  <Mail className="h-3.5 w-3.5 shrink-0" />{contactInfo.email}
                </span>
              </a>
            )}
            {contactInfo?.phone && (
              <a href={`tel:${contactInfo.phone}`} className="group flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.phoneLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-600 transition-colors group-hover:text-zinc-950">
                  <Phone className="h-3.5 w-3.5 shrink-0" />{contactInfo.phone}
                </span>
              </a>
            )}
            {contactInfo?.address && (
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">{labels.addressLabel}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />{contactInfo.address}
                </span>
              </div>
            )}
          </div>
          <div className="h-px bg-black/10" />
          <nav>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.href}>
                  <NavLink
                    to={tab.href} onClick={onClose}
                    className={({ isActive }) =>
                      `block py-2 text-sm transition-colors ${isActive ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-950"}`
                    }
                  >
                    {tab.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN HEADER
// ═════════════════════════════════════════════════════════════════════════════

export function Header({
  logo,
  logoLight = logo,
  logoDark = logoZincelWhite,
  brandName = "Zincel",
  tabs,
  contactInfo = {
    email: "kenif.alejandro@zincelideas.com",
    phone: "+51 933 838 792",
    address: "Lima, Perú",
  },
  enableCustomCursor   = true,
  enableCommandPalette = true,
  enableMagnetic       = true,
  enableScrollProgress = true,
  enablePageCurtain    = true,
  enableLogoMorph      = true,
}: HeaderProps) {
  const { resolved: userTheme } = useTheme();
  const { isDarkOverlapping, isLightOverlapping } = useImageOverlap({
    targetElementId: "banner", debounceDelay: 10,
  });

  const localizedContent = {
    tabs: [
      { label: "Servicios", href: "/servicios" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Sobre Nosotros", href: "/sobre-nosotros" },
      { label: "Precios Web", href: "/precios-web" },
      { label: "Experiencias", href: "/experiencias" },
    ],
    emailLabel: "Correo",
    phoneLabel: "Teléfono",
    addressLabel: "Ubicación",
    contactTitle: "Contáctanos",
  };

  const resolvedTabs = tabs ?? localizedContent.tabs;

  const isDarkTheme = (isDarkOverlapping && !isLightOverlapping) || userTheme === "dark";
  const activeLogo = isDarkTheme ? logoDark : logoLight;

  const [isScrolled, setIsScrolled]   = useState(false);
  const [isHidden,   setIsHidden]     = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isHovering, setIsHovering]   = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCmdkOpen,  setIsCmdkOpen]  = useState(false);

  const lastScrollY = useRef(0);
  const location = useLocation();
  const curtainRef = useRef<PageCurtainHandle>(null);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 24);
      if (currentScrollY > lastScrollY.current && currentScrollY > 96) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    }, 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isModalOpen || isCmdkOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen, isModalOpen, isCmdkOpen]);

  useEffect(() => {
    setIsMenuOpen(false); setIsModalOpen(false); setIsCmdkOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!enableCommandPalette) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField = !!target && (
        ["INPUT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable
      );
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); setIsCmdkOpen(v => !v);
      } else if (e.key === "/" && !inField && !isCmdkOpen) {
        e.preventDefault(); setIsCmdkOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableCommandPalette, isCmdkOpen]);

  const tone = isDarkTheme
    ? {
        bar: isScrolled ? "bg-[#181716]/88 border-white/10" : "bg-[#181716]/72 border-white/10",
        btn: "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
        progressTrack: "bg-white/10", progressFill: "bg-white",
      }
    : {
        bar: isScrolled ? "bg-[#f7f1e7]/92 border-black/10" : "bg-[#f7f1e7]/78 border-black/10",
        btn: "border-black/10 bg-white/60 text-zinc-900 hover:bg-white hover:text-zinc-950",
        progressTrack: "bg-black/10", progressFill: "bg-zinc-950",
      };

  const Mag: React.FC<{ children: React.ReactNode; strength?: number; radius?: number }> = enableMagnetic
    ? MagneticWrap
    : ({ children }) => <span className="inline-flex">{children}</span>;

  return (
    <>
      {/* ── HEADER BAR ──────────────────────────────────────────────────── */}
      <header
        id="banner"
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            {/* 3-column grid: logo | dots | controls — ensures true center on all sizes */}
            <div className={`grid grid-cols-[1fr_auto_1fr] h-16 items-center px-2 sm:px-4 rounded-2xl backdrop-blur-md border transition-colors duration-300 ${isScrolled ? tone.bar : "bg-transparent border-transparent"}`}>

              {/* Logo — left */}
              <NavLink to="/" className="flex items-center gap-3" data-cursor="label:Inicio">
                {logo ? (
                  <img
                    src={activeLogo} alt={brandName}
                    className={`h-8 sm:h-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      enableLogoMorph && isScrolled ? "rotate-[8deg]" : "rotate-0"
                    }`}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-zinc-950" />
                )}
              </NavLink>

              {/* Menu dots — true center */}
              <Mag strength={0.4} radius={70}>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  data-cursor={isMenuOpen ? "label:Cerrar" : "label:Menú"}
                  className={`inline-flex items-center justify-center rounded-full p-3 transition-colors ${
                    isDarkTheme ? "text-white/80 hover:text-white" : "text-zinc-900 hover:text-zinc-950"
                  }`}
                  aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  <MenuIcon state={isMenuOpen ? "open" : isHovering ? "hover" : "closed"} />
                </button>
              </Mag>

              {/* Controls — right, flex justify-end */}
              <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                <ThemeToggle size={34} />
        
                {enableCommandPalette && (
                  <Mag strength={0.3} radius={60}>
                    <button
                      type="button" onClick={() => setIsCmdkOpen(true)} data-cursor="label:⌘K"
                      className={`hidden sm:inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] transition-colors ${tone.btn}`}
                      aria-label="Buscar"
                    >
                      <Command size={13} strokeWidth={1.8} />
                      <span className="font-mono text-[11px] tracking-[0.04em]">K</span>
                    </button>
                  </Mag>
                )}

                <Mag strength={0.3} radius={70}>
                  <button
                    type="button" onClick={() => setIsModalOpen((v) => !v)} data-cursor="label:Contacto"
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 sm:px-4 text-[13px] transition-colors ${tone.btn}`}
                  >
                    {/* Icon only on mobile, full label on sm+ */}
                    <MessageCircle size={15} className="sm:hidden" />
                    <span className="hidden sm:inline">Contáctanos</span>
                  </button>
                </Mag>
              </div>
            </div>

            {enableScrollProgress && (
              <div className={`absolute inset-x-6 bottom-0 h-px overflow-hidden rounded-full ${tone.progressTrack}`}>
                <div
                  className={`h-full ${tone.progressFill}`}
                  style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "left center", transition: "transform 120ms linear" }}
                />
              </div>
            )}
          </div>
      
      </header>

      <MenuOverlay
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        tabs={resolvedTabs}
        pathname={location.pathname}
        contactInfo={contactInfo}
        labels={{
          contactTitle: localizedContent.contactTitle,
          emailLabel:   localizedContent.emailLabel,
          phoneLabel:   localizedContent.phoneLabel,
          addressLabel: localizedContent.addressLabel,
        }}
        logo={logoZincelBlack}
      />

      <ContactAside
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tabs={resolvedTabs}
        contactInfo={contactInfo}
        labels={{
          contactTitle: localizedContent.contactTitle,
          emailLabel:   localizedContent.emailLabel,
          phoneLabel:   localizedContent.phoneLabel,
          addressLabel: localizedContent.addressLabel,
        }}
      />

      {enableCommandPalette && (
        <CommandPalette
          open={isCmdkOpen}
          onClose={() => setIsCmdkOpen(false)}
          tabs={resolvedTabs}
          contactInfo={contactInfo}
          onOpenContact={() => { setIsCmdkOpen(false); setIsModalOpen(true); }}
        />
      )}

      <CustomCursor enabled={enableCustomCursor} />

      {enablePageCurtain && <PageCurtain ref={curtainRef} color="#181716" labelColor="#f7f1e7" />}
    </>
  );
}

export default Header;
