/**client/src/content/servicePageData.ts */

import i18n from "../i18n";

type TranslatedBenefit = { title: string; description: string };
type StaticBenefit = { image?: string; videoSrc?: string; videoPoster?: string };
type Benefit = TranslatedBenefit & StaticBenefit;

const STATIC_BENEFITS: Record<string, StaticBenefit[]> = {
  desarrolloWeb: [
    { image: "./imagenes-optim/imagenes/ux" },
    {},
    {},
  ],
  branding: [
    { image: "./imagenes-optim/servicios/branding/branding" },
    { image: "./imagenes-optim/servicios/branding/branding-safety" },
    { image: "./imagenes-optim/servicios/branding/brochureBCingenieros" },
  ],
  uiux: [
    { image: "./imagenes-optim/servicios/ui/wireframe-calera-boceto" },
    {},
    { image: "./imagenes-optim/servicios/ui/wireframe-calera-colors" },
  ],
  modelado3d: [
    { videoSrc: "/videos-optim/hero/inti-pintay/inti-pintay.mp4", videoPoster: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay.avif" },
    {},
    {},
  ],
  marketing: [
    { image: "./imagenes-optim/servicios/campañas/ads003" },
  ],
};

function mergeBenefits(key: string, staticKey: string): Benefit[] {
  const translated = i18n.t(key, { returnObjects: true }) as unknown as TranslatedBenefit[];
  const statics = STATIC_BENEFITS[staticKey] ?? [];
  return translated.map((b, i) => ({ ...b, ...(statics[i] ?? {}) }));
}

function ts(key: string): string {
  return i18n.t(key) as string;
}

function ta<T>(key: string): T {
  return i18n.t(key, { returnObjects: true }) as unknown as T;
}

const sp = "serviciosPage";

export function getServicesPageData() {
  return {
    pageData: {
      seo: {
        title: ts(`${sp}.seo.title`),
        description: ts(`${sp}.seo.description`),
        keywords: ts(`${sp}.seo.keywords`),
        url: "https://www.zincelideas.com/servicios",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: ts(`${sp}.seo.title`),
          provider: { "@type": "Organization", name: "Zincel", url: "https://www.zincelideas.com" },
          areaServed: { "@type": "Place", name: "Lima, Perú" },
          description: ts(`${sp}.seo.description`),
          offers: { "@type": "Offer", priceCurrency: "PEN", price: "1300", url: "https://www.zincelideas.com/servicios" },
        },
      },
      deliverablesTitle: ts(`${sp}.deliverablesTitle`),
      deliverablesDescription: ts(`${sp}.deliverablesDescription`),
      deliverables: ta<{ title: string; description: string }[]>(`${sp}.deliverables`),
      processTitle: ts(`${sp}.processTitle`),
      processDescription: ts(`${sp}.processDescription`),
      process: ta<{ step: string; title: string; description: string }[]>(`${sp}.process`),
      closingTitle: ts(`${sp}.closingTitle`),
      closingDescription: ts(`${sp}.closingDescription`),
      closingButtonLabel: ts(`${sp}.closingButtonLabel`),
    },
    desarrolloWebData: {
      eyebrow: ts(`${sp}.desarrolloWeb.eyebrow`),
      whatsappText: ts(`${sp}.desarrolloWeb.whatsappText`),
      reverse: true,
      benefitsTitle: ts(`${sp}.desarrolloWeb.benefitsTitle`),
      benefitsDescription: ts(`${sp}.desarrolloWeb.benefitsDescription`),
      benefits: mergeBenefits(`${sp}.desarrolloWeb.benefits`, "desarrolloWeb"),
    },
    brandingData: {
      eyebrow: ts(`${sp}.branding.eyebrow`),
      whatsappText: ts(`${sp}.branding.whatsappText`),
      reverse: false,
      benefitsTitle: ts(`${sp}.branding.benefitsTitle`),
      benefitsDescription: ts(`${sp}.branding.benefitsDescription`),
      benefits: mergeBenefits(`${sp}.branding.benefits`, "branding"),
    },
    uiuxData: {
      eyebrow: ts(`${sp}.uiux.eyebrow`),
      whatsappText: ts(`${sp}.uiux.whatsappText`),
      reverse: true,
      benefitsTitle: ts(`${sp}.uiux.benefitsTitle`),
      benefitsDescription: ts(`${sp}.uiux.benefitsDescription`),
      benefits: mergeBenefits(`${sp}.uiux.benefits`, "uiux"),
    },
    modelado3DData: {
      eyebrow: ts(`${sp}.modelado3d.eyebrow`),
      whatsappText: ts(`${sp}.modelado3d.whatsappText`),
      reverse: false,
      galleryLayout: "viewport" as const,
      benefitsTitle: ts(`${sp}.modelado3d.benefitsTitle`),
      benefitsDescription: ts(`${sp}.modelado3d.benefitsDescription`),
      benefits: mergeBenefits(`${sp}.modelado3d.benefits`, "modelado3d"),
    },
    marketingData: {
      eyebrow: ts(`${sp}.marketing.eyebrow`),
      whatsappText: ts(`${sp}.marketing.whatsappText`),
      reverse: true,
      benefitsTitle: ts(`${sp}.marketing.benefitsTitle`),
      benefitsDescription: ts(`${sp}.marketing.benefitsDescription`),
      benefits: mergeBenefits(`${sp}.marketing.benefits`, "marketing"),
    },
  };
}
