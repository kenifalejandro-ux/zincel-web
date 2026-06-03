import { forwardRef, useImperativeHandle, useRef, useEffect, type ReactNode } from "react";
import { draw, drawArcs, resetMask, project, type MapPoint } from "./mapEngine";
import { PALETTE } from "./constants";
import type { Pin } from "./data";

export interface WorldMapHandle {
  redraw: () => void;
  drawArcsProgress: (p: number) => void;
}

interface Props {
  pins: Pin[];
  showArcs?: boolean;
  children?: ReactNode;
}

const WorldMap = forwardRef<WorldMapHandle, Props>(function WorldMap(
  { pins, showArcs = true, children },
  ref
) {
  const mapCanvas = useRef<HTMLCanvasElement>(null);
  const arcCanvas = useRef<HTMLCanvasElement>(null);

  const points: MapPoint[] = pins.map((p) => project(p.lon, p.lat));

  const redraw = () => {
    if (mapCanvas.current) draw(mapCanvas.current, {});
    if (arcCanvas.current) drawArcs(arcCanvas.current, showArcs ? points : [], 1, PALETTE);
  };

  useImperativeHandle(ref, () => ({
    redraw,
    drawArcsProgress: (p: number) => {
      if (arcCanvas.current) drawArcs(arcCanvas.current, showArcs ? points : [], p, PALETTE);
    },
  }));

  useEffect(() => {
    redraw();
    let rz: number;
    const onResize = () => {
      window.clearTimeout(rz);
      rz = window.setTimeout(() => { resetMask(); redraw(); }, 180);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArcs]);

  return (
    <>
      <canvas ref={mapCanvas} className="absolute inset-0 h-full w-full" />
      <canvas ref={arcCanvas} className="pointer-events-none absolute inset-0 h-full w-full" />
      {children}
    </>
  );
});

export default WorldMap;
