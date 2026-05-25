import { gtmPush } from "./gtm";

export const WHATSAPP_URL = "https://wa.me/51933838792";

export type WhatsAppClickMeta = {
  text?: string;
  section?: string;
  component?: string;
  variant?: string;
  href?: string;
};

export const buildWhatsAppUrl = (text?: string, baseUrl: string = WHATSAPP_URL): string => {
  const normalizedText = text?.trim();

  if (!normalizedText) {
    return baseUrl;
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(normalizedText)}`;
};

const getPageData = () => {
  if (typeof window === "undefined") {
    return { path: "", location: "" };
  }

  return {
    path: window.location.pathname + window.location.search,
    location: window.location.href,
  };
};

export const trackWhatsAppClick = (meta: WhatsAppClickMeta = {}): void => {
  const page = getPageData();
  const pageTitle = typeof document !== "undefined" ? document.title : "";

  gtmPush("whatsapp_click", {
    whatsapp_text: meta.text ?? "",
    whatsapp_section: meta.section ?? "",
    whatsapp_component: meta.component ?? "",
    whatsapp_variant: meta.variant ?? "",
    whatsapp_url: meta.href ?? WHATSAPP_URL,
    whatsapp_page: page.path,
    page_path: page.path,
    page_location: page.location,
    page_title: pageTitle,
  });
};

export const openWhatsApp = (meta: WhatsAppClickMeta = {}): void => {
  const href = meta.href ?? buildWhatsAppUrl(meta.text);

  trackWhatsAppClick({
    ...meta,
    href,
  });

  if (typeof window !== "undefined") {
    window.open(href, "_blank", "noopener,noreferrer");
  }
};
