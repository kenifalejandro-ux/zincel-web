// client/src/utils/idle.ts
// Ejecuta un callback cuando el hilo esté libre y devuelve un cancelador.
type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export const runWhenIdle = (cb: () => void, delay = 600): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const idleWindow = window as IdleWindow;

  if (typeof idleWindow.requestIdleCallback === "function") {
    let didRun = false;
    const run = () => {
      if (didRun) return;
      didRun = true;
      window.clearTimeout(timeoutId);
      cb();
    };
    const timeoutId = window.setTimeout(run, delay);
    const id = idleWindow.requestIdleCallback(run, { timeout: delay });
    return () => {
      window.clearTimeout(timeoutId);
      if (typeof idleWindow.cancelIdleCallback === "function") {
        idleWindow.cancelIdleCallback(id);
      }
    };
  }

  const id = window.setTimeout(cb, delay);
  return () => window.clearTimeout(id);
};
