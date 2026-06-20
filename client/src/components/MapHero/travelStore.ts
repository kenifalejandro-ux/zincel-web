// client/src/components/MapHero/travelStore.ts
// Mini-store para pasar la posición en pantalla del pin clicado
// desde Hero.tsx (donde ocurre el click) hacia FullscreenModal.tsx
// (hermano en el árbol), para que el modal aparezca DESDE el pin.

export interface TravelOrigin {
  x: number; // px en viewport — centro del pin al hacer click
  y: number;
  pinId: string;
}

let current: TravelOrigin | null = null;

export const setTravelOrigin = (o: TravelOrigin) => { current = o; };
export const getTravelOrigin = (): TravelOrigin | null => current;
export const clearTravelOrigin = () => { current = null; };