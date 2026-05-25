// src/components/global/SEO.tsx
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  url,
  image,
  imageAlt,
  type = "website",
  locale = "es_PE",
  siteName = "Zincel",
  schema,
}) => {
  useEffect(() => {
    // Limpia metadatos anteriores
    document.querySelectorAll("meta[data-dynamic]").forEach((el) => el.remove());
    document.querySelectorAll("script[data-schema]").forEach((el) => el.remove());

    // Título
    document.title = title || "Zincel | Diseño Web, Branding y Modelado 3D";

    const addMeta = (name: string, content: string, property = false) => {
      if (!content) return;
      const tag = document.createElement("meta");
      if (property) tag.setAttribute("property", name);
      else tag.setAttribute("name", name);
      tag.setAttribute("content", content);
      tag.setAttribute("data-dynamic", "true");
      document.head.appendChild(tag);
    };

    const addLink = (rel: string, href: string) => {
      if (!href) return;
      const link = document.createElement("link");
      link.setAttribute("rel", rel);
      link.setAttribute("href", href);
      link.setAttribute("data-dynamic", "true");
      document.head.appendChild(link);
    };

    const addScript = (json: object) => {
      if (!json) return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(json);
      script.setAttribute("data-schema", "true");
      document.head.appendChild(script);
    };

    // SEO básico
    addMeta("description", description || "");
    addMeta("keywords", keywords || "");
    addMeta("robots", "index, follow");
    addMeta("content-language", locale || "");
    addLink("canonical", url || "");

    // Open Graph
    addMeta("og:title", title || "", true);
    addMeta("og:description", description || "", true);
    addMeta("og:image", image || "", true);
    addMeta("og:image:alt", imageAlt || "", true);
    addMeta("og:url", url || "", true);
    addMeta("og:type", type, true);
    addMeta("og:locale", locale, true);
    addMeta("og:site_name", siteName, true);

    // Twitter
    addMeta("twitter:card", "summary_large_image");
    addMeta("twitter:title", title || "");
    addMeta("twitter:description", description || "");
    addMeta("twitter:image", image || "");
    addMeta("twitter:image:alt", imageAlt || "");

    // Schema.org (opcional)
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((obj) => addScript(obj));
    }
  }, [title, description, keywords, url, image, imageAlt, type, locale, siteName, schema]);

  return null;
};

export default SEO;
