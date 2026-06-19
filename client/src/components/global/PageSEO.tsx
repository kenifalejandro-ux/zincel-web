import SEO from "./seo";

type PageId =
  | "inicio"
  | "servicios"
  | "portfolio"
  | "sobre-nosotros"
  | "precios-web"
  | "experiencias"
  | "contactanos"
  | "gracias";

type PageKind = "home" | "about" | "service" | "information" | "contact" | "utility";

type FAQItem = {
  question: string;
  answer: string;
};

type SchemaNode = Record<string, unknown>;

type PageConfig = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  kind: PageKind;
  imageAlt: string;
  schemaName: string;
  category?: string;
  robots?: string;
  cta?: string;
  faq?: FAQItem[];
};

const FALLBACK_SITE_URL = "https://www.zincelideas.com";
const SITE_NAME = "Zincel";
const LEGAL_NAME = "Zincel Ideas S.A.C.";
const COMPANY_DESCRIPTION =
  "Agencia de diseño web, branding, UI/UX y modelado 3D en Lima, Perú. Creamos sitios profesionales que convierten visitantes en clientes.";
const CONTACT_EMAIL = "kenif.alejandro@zincelideas.com";
const CONTACT_PHONE = "+51 933 838 792";
const SITE_LOCALE = "es_PE";
const DEFAULT_IMAGE_PATH = "/imagenes-optim/ImageInicio/build-branding.avif";
const LOGO_PATH = "/imagenes-optim/logo-zincel/logo-zincel-black.svg";

const pageConfigs: Record<PageId, PageConfig> = {
  inicio: {
    title: "Diseño Web Lima 2026 | Agencia Profesional Páginas Web y Branding - Zincel",
    description:
      "Agencia de diseño web en Lima: páginas rápidas, SEO optimizado y branding que generan más leads.",
    keywords: [
      "diseño web lima",
      "agencia diseño web lima",
      "páginas web profesionales lima",
      "branding lima",
      "crear página web lima",
    ],
    path: "/",
    kind: "home",
    imageAlt: "Agencia Zincel: diseño web profesional y branding en Lima, Perú 2026",
    schemaName: "Inicio",
    cta: "Cotizar mi proyecto web",
    faq: [
      {
        question: "¿Cuánto cuesta una página web profesional en Lima 2026?",
        answer:
          "Desde S/500 para sitios básicos hasta S/3000+ para proyectos con e-commerce, SEO avanzado y branding. Cotiza personalizado por WhatsApp sin costo.",
      },
      {
        question: "¿Por qué elegir una agencia de diseño web en Lima como Zincel?",
        answer:
          "Entendemos el mercado peruano: pagos en soles, entrega rápida, enfoque local y optimización para búsquedas en Perú. +40% leads promedio en clientes.",
      },
      {
        question: "¿Incluyen SEO en sus diseños web?",
        answer:
          "Sí, todos los sitios incluyen SEO on-page básico y Core Web Vitals optimizados para rankear mejor en Google Perú.",
      },
    ],
  },
  servicios: {
    title: "Servicios Creativos y Digitales | Zincel",
    description:
      "Servicios de desarrollo web, branding, diseño UI/UX y modelado 3D para marcas que buscan una presencia más clara, sólida y profesional en Lima, Perú.",
    keywords: [
      "desarrollo web lima",
      "branding perú",
      "diseño ui ux lima",
      "modelado 3d perú",
      "servicios creativos zincel",
    ],
    path: "/servicios",
    kind: "service",
    imageAlt: "Servicios de diseño web, branding y 3D de Zincel en Lima.",
    schemaName: "Servicios Creativos y Digitales",
    category: "Diseño web, branding, UI/UX y modelado 3D",
    cta: "Solicitar cotización de servicios",
  },
  portfolio: {
    title: "Portafolio Diseño Web y Branding Lima | Proyectos Zincel 2026",
    description:
      "Explora nuestro portafolio: diseño web, branding, UI/UX y visuales 3D desarrollados en Lima para marcas que buscan una presencia más sólida y mejor construida.",
    keywords: [
      "portafolio diseño web lima",
      "branding lima",
      "proyectos diseño web perú",
      "portafolio agencia creativa",
      "ui ux lima",
      "modelado 3d lima",
    ],
    path: "/portfolio",
    kind: "information",
    imageAlt: "Portafolio Zincel con proyectos de diseño web, branding y dirección visual en Lima",
    schemaName: "Portafolio",
  },
  "sobre-nosotros": {
    title: "Sobre Nosotros | Agencia Diseño Web y Branding en Lima - Zincel 2026",
    description:
      "Conoce a Zincel: estudio creativo en Lima especializado en diseño web profesional, branding empresarial y modelado 3D.",
    keywords: [
      "sobre nosotros Zincel",
      "estudio diseño web Lima",
      "agencia branding Lima Perú",
      "diseño UI UX Lima",
      "modelado 3D Lima",
    ],
    path: "/sobre-nosotros",
    kind: "about",
    imageAlt: "Equipo Zincel: estudio de diseño web, branding y modelado 3D en Lima, Perú",
    schemaName: "Sobre Nosotros",
  },
  "precios-web": {
    title: "Precios Web Lima | Rangos y paquetes de diseño web - Zincel",
    description:
      "Consulta rangos referenciales para diseño web en Lima: landing pages, webs corporativas y proyectos a medida.",
    keywords: [
      "precios diseño web lima",
      "costo página web perú",
      "paquetes web lima",
      "cotizar sitio web lima",
    ],
    path: "/precios-web",
    kind: "service",
    imageAlt: "Planes y precios de diseño web profesional de Zincel en Lima.",
    schemaName: "Precios Web",
    category: "Diseño y desarrollo de páginas web en Lima",
    cta: "Ver planes y cotizar mi web",
    faq: [
      {
        question: "¿Cuánto cuesta una página web en Lima 2026?",
        answer:
          "Desde S/500 para sitios básicos hasta S/3000+ para proyectos con e-commerce, SEO avanzado y branding. La cotización es personalizada y sin costo por WhatsApp.",
      },
      {
        question: "¿Qué incluye el precio de la página web?",
        answer:
          "Diseño responsive, optimización SEO on-page, Core Web Vitals optimizados, formulario de contacto y despliegue. Los planes superiores agregan e-commerce y branding.",
      },
      {
        question: "¿Cómo pago el desarrollo de mi web?",
        answer:
          "Aceptamos transferencia, efectivo y tarjetas. Trabajamos en soles, normalmente con un adelanto y un saldo a la entrega.",
      },
    ],
  },
  experiencias: {
    title: "Experiencias 3D Interactivas para Web | Zincel",
    description:
      "Creamos experiencias interactivas y modelado 3D para web que sorprenden a tus clientes y elevan tu marca. Diseño inmersivo desde Lima, Perú.",
    keywords: [
      "experiencias 3d web",
      "web interactiva lima",
      "modelado 3d para web",
      "webgl perú",
      "experiencias inmersivas zincel",
    ],
    path: "/experiencias",
    kind: "service",
    imageAlt: "Experiencias 3D interactivas para web creadas por Zincel.",
    schemaName: "Experiencias 3D Interactivas",
    category: "Experiencias interactivas y modelado 3D para web",
    cta: "Crear una experiencia 3D",
  },
  contactanos: {
    title: "Contáctanos | Cotiza tu Proyecto Web con Zincel",
    description:
      "Escríbenos y cotiza tu proyecto de diseño web, branding o 3D. Respondemos en menos de 24 horas. Trabajamos desde Lima para el mundo.",
    keywords: [
      "contacto zincel",
      "cotizar página web lima",
      "agencia diseño web contacto",
      "presupuesto web perú",
    ],
    path: "/contactanos",
    kind: "contact",
    imageAlt: "Contacto y cotizaciones de Zincel en Lima, Perú.",
    schemaName: "Contáctanos",
    cta: "Solicitar cotización comercial",
  },
  gracias: {
    title: "Gracias — Zincel",
    description: "Gracias por contactarnos. Te responderemos en menos de 24 horas.",
    keywords: ["confirmación de contacto", "zincel"],
    path: "/gracias",
    kind: "utility",
    imageAlt: "Confirmación de contacto enviada a Zincel.",
    schemaName: "Gracias",
    robots: "noindex, nofollow",
  },
};

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL;

  if (typeof envUrl === "string" && envUrl.trim()) {
    return normalizeUrl(envUrl.trim());
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return normalizeUrl(window.location.origin);
  }

  return FALLBACK_SITE_URL;
}

function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

function buildBreadcrumbs(page: PageConfig) {
  if (page.path === "/") {
    return [{ name: "Inicio", path: "/" }];
  }

  return [
    { name: "Inicio", path: "/" },
    { name: page.schemaName, path: page.path },
  ];
}

function createBreadcrumbSchema(page: PageConfig): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: buildBreadcrumbs(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

function createOrganizationSchema(): SchemaNode {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(LOGO_PATH),
    },
    description: COMPANY_DESCRIPTION,
    foundingDate: "2024",
    founders: [{ "@type": "Person", name: "Kenif Carlos Alejandro Garro" }],
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        availableLanguage: ["es", "en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Independencia, Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.0464,
      longitude: -77.0428,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Lima" },
      { "@type": "Country", name: "Perú" },
    ],
    priceRange: "$$-$$$",
    paymentAccepted: ["Transferencia", "Efectivo", "Tarjetas"],
    sameAs: [
      "https://www.facebook.com/zincelideas",
      "https://www.instagram.com/zincelideas",
      "https://www.linkedin.com/company/zincelideas",
      "https://www.behance.net/zincelideas",
      "https://www.tiktok.com/@zincelideas",
    ],
    knowsAbout: ["Diseño web", "Branding", "Diseño UI/UX", "Modelado 3D", "SEO"],
  };
}

function createLocalBusinessSchema(): SchemaNode {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#localbusiness`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: siteUrl,
    image: toAbsoluteUrl(DEFAULT_IMAGE_PATH),
    logo: toAbsoluteUrl(LOGO_PATH),
    description: COMPANY_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Independencia, Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.0464,
      longitude: -77.0428,
    },
    areaServed: ["Lima", "Perú"],
    priceRange: "$$-$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/zincelideas",
      "https://www.instagram.com/zincelideas",
      "https://www.linkedin.com/company/zincelideas",
      "https://www.behance.net/zincelideas",
      "https://www.tiktok.com/@zincelideas",
    ],
  };
}

function createWebSiteSchema(): SchemaNode {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    alternateName: LEGAL_NAME,
    description: pageConfigs.inicio.description,
    inLanguage: "es-PE",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    potentialAction: {
      "@type": "QuoteAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/contactanos`,
      },
      name: "Solicitar cotización comercial",
    },
  };
}

function createWebPageSchema(page: PageConfig, imageUrl: string): SchemaNode {
  const siteUrl = getSiteUrl();
  const pageUrl = toAbsoluteUrl(page.path);
  const webPageType =
    page.kind === "about" ? "AboutPage" : page.kind === "contact" ? "ContactPage" : "WebPage";

  return {
    "@context": "https://schema.org",
    "@type": webPageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "es-PE",
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    about: {
      "@id": `${siteUrl}#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };
}

function createPrimarySchema(page: PageConfig, imageUrl: string): SchemaNode | null {
  const siteUrl = getSiteUrl();
  const pageUrl = toAbsoluteUrl(page.path);

  if (page.kind === "service") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#primary`,
      name: page.schemaName,
      description: page.description,
      serviceType: page.category ?? page.schemaName,
      provider: {
        "@id": `${siteUrl}#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "Perú",
      },
      image: imageUrl,
      url: pageUrl,
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Empresas y emprendimientos en Perú",
      },
    };
  }

  if (page.kind === "contact") {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "@id": `${pageUrl}#primary`,
      contactType: "sales",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      availableLanguage: ["es", "en"],
      areaServed: {
        "@type": "Country",
        name: "Perú",
      },
    };
  }

  return null;
}

function createFaqSchema(page: PageConfig): SchemaNode | null {
  if (!page.faq?.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function createConversionActionSchema(page: PageConfig): SchemaNode | null {
  if (!page.cta || page.kind === "utility") {
    return null;
  }

  const contactUrl = toAbsoluteUrl("/contactanos");
  const actionType = "QuoteAction";

  return {
    "@context": "https://schema.org",
    "@type": actionType,
    name: page.cta,
    target: {
      "@type": "EntryPoint",
      urlTemplate: contactUrl,
    },
    result: {
      "@type": "Thing",
      name: "Cotización y contacto comercial",
    },
  };
}

type PageSEOProps = {
  pageId: PageId;
};

export default function PageSEO({ pageId }: PageSEOProps) {
  const page = pageConfigs[pageId];
  const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH);
  const primarySchema = createPrimarySchema(page, imageUrl);
  const faqSchema = createFaqSchema(page);
  const conversionActionSchema = createConversionActionSchema(page);

  const schema: SchemaNode[] = [
    createWebSiteSchema(),
    createOrganizationSchema(),
    createLocalBusinessSchema(),
    createWebPageSchema(page, imageUrl),
    createBreadcrumbSchema(page),
  ];

  if (primarySchema) {
    schema.push(primarySchema);
  }

  if (faqSchema) {
    schema.push(faqSchema);
  }

  if (conversionActionSchema) {
    schema.push(conversionActionSchema);
  }

  return (
    <SEO
      title={page.title}
      description={page.description}
      keywords={page.keywords.join(", ")}
      url={toAbsoluteUrl(page.path)}
      image={imageUrl}
      imageAlt={page.imageAlt}
      type="website"
      locale={SITE_LOCALE}
      siteName={SITE_NAME}
      schema={schema}
      robots={page.robots}
    />
  );
}
