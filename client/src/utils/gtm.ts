//src/utils/gtm.ts

type GTMData = Record<string, any>;

// Extiende la ventana para TS
declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

export const gtmPush = (eventName: string, data: GTMData = {}): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
};
