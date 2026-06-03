import { PALETTE, type Palette } from "./constants";

export interface MapPoint {
  x: number;
  y: number;
}

export interface DrawOptions {
  showLand?: boolean;
  step?: number;
  dotR?: number;
  palette?: Palette;
}

const CONTINENTS: [number, number][][] = [
  [[-165,60],[-160,68],[-140,69],[-122,71],[-100,72],[-85,68],[-80,62],[-78,55],[-92,57],[-95,49],[-82,45],[-70,47],[-60,47],[-65,43],[-75,38],[-80,32],[-81,25],[-90,29],[-97,26],[-105,23],[-110,30],[-117,33],[-124,40],[-124,48],[-130,54],[-150,58]],
  [[-92,18],[-88,16],[-83,11],[-79,9],[-77,8],[-82,14],[-88,17]],
  [[-45,60],[-30,68],[-22,76],[-30,82],[-50,82],[-58,76],[-55,67],[-50,61]],
  [[-80,9],[-72,11],[-60,6],[-50,0],[-35,-5],[-35,-12],[-42,-23],[-48,-25],[-55,-35],[-65,-42],[-71,-50],[-75,-52],[-72,-44],[-70,-30],[-72,-18],[-78,-6],[-81,-2]],
  [[-17,15],[-10,30],[0,35],[10,37],[20,33],[32,31],[35,24],[43,12],[51,12],[42,2],[40,-8],[35,-22],[25,-34],[18,-35],[12,-17],[9,4],[-8,5],[-16,12]],
  [[-9,37],[-9,43],[-2,48],[2,51],[-2,58],[6,62],[12,55],[10,48],[15,46],[20,40],[28,41],[30,47],[40,48],[40,60],[28,66],[12,64],[6,58],[-1,52],[-8,44]],
  [[30,46],[40,50],[55,54],[70,56],[88,55],[100,52],[112,52],[122,53],[135,56],[146,61],[150,55],[140,48],[135,42],[127,40],[122,30],[120,22],[108,15],[100,8],[95,15],[90,22],[80,16],[72,22],[63,26],[55,28],[46,32],[38,40],[33,43]],
  [[68,24],[72,20],[77,8],[80,13],[88,22],[80,26],[72,28]],
  [[97,4],[106,1],[118,-1],[130,-3],[141,-6],[131,-8],[118,-8],[106,-7],[98,-1]],
  [[114,-22],[122,-18],[130,-12],[137,-12],[143,-11],[146,-19],[150,-26],[149,-33],[140,-38],[130,-32],[120,-34],[114,-30]],
  [[133,33],[138,36],[141,40],[140,45],[136,38],[132,33]],
  [[-6,50],[-2,53],[-3,58],[-7,57],[-8,52]],
  [[44,-16],[47,-15],[50,-20],[46,-25],[44,-22]],
  [[171,-37],[175,-40],[173,-45],[167,-46],[169,-41]],
];

export const project = (lon: number, lat: number): MapPoint => ({
  x: (lon + 180) / 360,
  y: (90 - lat) / 180,
});

let landMask: Uint8ClampedArray | null = null;
let maskW = 0;
let maskH = 0;

function buildMask(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.fillStyle = "#fff";
  CONTINENTS.forEach((poly) => {
    x.beginPath();
    poly.forEach(([lon, lat], i) => {
      const p = project(lon, lat);
      i ? x.lineTo(p.x * w, p.y * h) : x.moveTo(p.x * w, p.y * h);
    });
    x.closePath();
    x.fill();
  });
  landMask = x.getImageData(0, 0, w, h).data;
  maskW = w;
  maskH = h;
}

function isLand(nx: number, ny: number): boolean {
  if (!landMask) return false;
  const px = Math.min(maskW - 1, Math.max(0, Math.floor(nx * maskW)));
  const py = Math.min(maskH - 1, Math.max(0, Math.floor(ny * maskH)));
  return landMask[(py * maskW + px) * 4 + 3] > 128;
}

export function resetMask() {
  landMask = null;
}

export function draw(canvas: HTMLCanvasElement, opts: DrawOptions = {}) {
  const pal = opts.palette ?? PALETTE;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  if (!W || !H) return;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  if (!landMask || Math.abs(maskW - W) > 4) buildMask(Math.round(W), Math.round(H));

  ctx.lineWidth = 1;
  for (let lon = -180; lon <= 180; lon += 15) {
    const x = ((lon + 180) / 360) * W;
    ctx.strokeStyle = lon % 90 === 0 ? pal.gridStrong : pal.grid;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let lat = -90; lat <= 90; lat += 15) {
    const y = ((90 - lat) / 180) * H;
    ctx.strokeStyle = lat === 0 ? pal.gridStrong : pal.grid;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  if (opts.showLand !== false) {
    const step = opts.step ?? 9;
    const r = opts.dotR ?? 1.15;
    for (let py = step / 2; py < H; py += step) {
      for (let px = step / 2; px < W; px += step) {
        if (!isLand(px / W, py / H)) continue;
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(px * 0.21 + py * 0.13);
        ctx.fillStyle = pal.land;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
}

export function drawArcs(
  canvas: HTMLCanvasElement,
  points: MapPoint[],
  progress = 1,
  palette: Palette = PALETTE
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  if (!W || !H) return;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  if (points.length < 2) return;

  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const ax = a.x * W, ay = a.y * H, bx = b.x * W, by = b.y * H;
    const mx = (ax + bx) / 2, my = (ay + by) / 2;
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy);
    const cx = mx - dy * 0.18;
    const cy = my + dx * 0.18 - len * 0.1;

    ctx.beginPath();
    const segs = 60;
    for (let s = 0; s <= segs * progress; s++) {
      const tt = s / segs;
      const x = (1 - tt) * (1 - tt) * ax + 2 * (1 - tt) * tt * cx + tt * tt * bx;
      const y = (1 - tt) * (1 - tt) * ay + 2 * (1 - tt) * tt * cy + tt * tt * by;
      s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    const g = ctx.createLinearGradient(ax, ay, bx, by);
    g.addColorStop(0, `rgba(${palette.accentRgb},0)`);
    g.addColorStop(0.5, `rgba(${palette.accentRgb},0.28)`);
    g.addColorStop(1, `rgba(${palette.accentRgb},0)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
