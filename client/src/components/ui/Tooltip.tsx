/**client/src/components/ui/tooltip.tsx */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
  content: string;
  active: boolean;
  showHand?: boolean;
  handPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  position?: { x: number; y: number } | null;
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  active,
  showHand = true,
  handPosition = "bottom-right",
  position = null,
  offsetX = 18,
  offsetY = 18,
  className = "",
}) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active || position) return;

    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [active, position]);

  const handPositionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };
  const currentMouse = position ?? mouse;

  return (
    <>
      <AnimatePresence>
        {showHand && !active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`fixed ${handPositionClasses[handPosition]} z-40 pointer-events-none`}
          >
            <span className="text-4xl">👆</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: currentMouse.x + offsetX,
              top: currentMouse.y + offsetY,
              pointerEvents: "none",
            }}
            className={`z-50 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-lg ${className}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
