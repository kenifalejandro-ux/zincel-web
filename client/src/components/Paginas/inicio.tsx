import { Link } from "react-router-dom";
import SEO from "../global/seo";
import { ContactSection } from "../sections/InicioSections";
import { ArrowRight } from "lucide-react";
import ServiciosContent from "../sections/servicios";
import { useTranslation } from "react-i18next";
import HeroHeaderVideos from "../hero/HeroHeaderVideos";

export default function Inicio() {
  const { t } = useTranslation();

  const positioning = t("inicio.positioning", { returnObjects: true }) as { value: string; detail: string }[];
  const principles = t("inicio.principles", { returnObjects: true }) as { step: string; title: string; body: string }[];
  const engagement = t("inicio.engagement", { returnObjects: true }) as { label: string; text: string }[];

  return (
    <div className="min-h-screen bg-[#f3efe7] text-zinc-900">
      <HeroHeaderVideos />
      <SEO
        title={t("inicio.seoTitle")}
        description={t("inicio.seoDescription")}
        keywords={t("inicio.seoKeywords")}
        url="https://www.zincelideas.com"
        image="https://www.zincelideas.com/imagenes-optim/ImageInicio/build-branding.avif"
        imageAlt={t("inicio.imageAlt")}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.zincelideas.com#website",
              url: "https://www.zincelideas.com",
              name: "Zincel",
              alternateName: "Zincel Ideas",
              description: "Agencia de diseño web, branding, UI/UX y modelado 3D en Lima, Perú. Creamos sitios profesionales que convierten visitantes en clientes.",
              inLanguage: "es-PE",
              publisher: { "@type": "Organization", "@id": "https://www.zincelideas.com#organization", name: "Zincel", logo: { "@type": "ImageObject", url: "https://www.zincelideas.com/imagenes-optim/logo-zincel/logo-zincel-black.svg", width: 512, height: 512 } },
            },
            {
              "@type": "Organization",
              "@id": "https://www.zincelideas.com#organization",
              name: "Zincel",
              url: "https://www.zincelideas.com",
              logo: "https://www.zincelideas.com/imagenes-optim/logo-zincel/logo-zincel-black.svg",
              description: "Estudio creativo en Lima especializado en diseño web profesional, branding empresarial, diseño UI/UX y modelado 3D para empresas peruanas.",
              foundingDate: "2024",
              founders: [{ "@type": "Person", name: "Kenif Carlos Alejandro Garro" }],
              address: { "@type": "PostalAddress", streetAddress: "San Isidro", addressLocality: "San Isidro, Lima", addressRegion: "Lima", postalCode: "27", addressCountry: "PE" },
              geo: { "@type": "GeoCoordinates", latitude: -12.0464, longitude: -77.0428 },
              telephone: "+51 933 838 792",
              email: "hello@zincelideas.com",
              priceRange: "$$-$$$",
              paymentAccepted: ["Transferencia", "Efectivo", "Tarjetas"],
              sameAs: ["https://www.facebook.com/zincelideas", "https://www.instagram.com/zincelideas", "https://www.linkedin.com/company/zincelideas", "https://www.behance.net/zincelideas", "https://www.tiktok.com/@zincelideas"],
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://www.zincelideas.com#localbusiness",
              name: "Zincel - Agencia de Diseño Web y Branding",
              url: "https://www.zincelideas.com",
              telephone: "+51 933 838 792",
              priceRange: "$$-$$$",
              image: "https://www.zincelideas.com/imagenes-optim/ImageInicio/build-branding.avif",
              description: "Agencia local en Lima: diseño de páginas web optimizadas SEO, branding y visuales 3D para empresas que buscan crecer digitalmente en Perú.",
              address: { "@type": "PostalAddress", addressLocality: "San Isidro, Lima", addressCountry: "PE" },
              geo: { "@type": "GeoCoordinates", latitude: -12.0464, longitude: -77.0428 },
              openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
              areaServed: { "@type": "Place", name: "Lima, Perú" },
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.zincelideas.com#breadcrumb",
              itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.zincelideas.com" }],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "¿Cuánto cuesta una página web profesional en Lima 2026?", acceptedAnswer: { "@type": "Answer", text: "Desde S/500 para sitios básicos hasta S/. 3000+ para proyectos con e-commerce, SEO avanzado y branding. Cotiza personalizado por WhatsApp sin costo." } },
                { "@type": "Question", name: "¿Por qué elegir una agencia de diseño web en Lima como Zincel?", acceptedAnswer: { "@type": "Answer", text: "Entendemos el mercado peruano: pagos en soles, entrega rápida, enfoque local y optimización para búsquedas en Perú. +40% leads promedio en clientes." } },
                { "@type": "Question", name: "¿Incluyen SEO en sus diseños web?", acceptedAnswer: { "@type": "Answer", text: "Sí, todos los sitios incluyen SEO on-page básico y Core Web Vitals optimizados para rankear mejor en Google Perú." } },
              ],
            },
          ],
        }}
      />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
          <div className="absolute right-[-8%] top-1/3 h-96 w-96 rounded-full bg-[#d9d0c3]/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <section className="border-b border-black/5 py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t("inicio.positioningEyebrow")}</p>
                <div className="grid gap-4 border-black/5 pt-4">
                  {positioning.map((item) => (
                    <article key={item.value} className="border-b border-black/5 pb-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.value}</p>
                      <p className="mt-3 text-base leading-7 text-zinc-700">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em]">
                  {t("inicio.positioningTitle")}
                </h2>
                <p className="max-w-2xl text-[17px] leading-7 text-zinc-700 lg:text-lg">{t("inicio.positioningBody")}</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/portfolio" className="inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-zinc-900 transition-transform duration-300 hover:-translate-y-0.5">
                    {t("inicio.exploreProjects")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/servicios" className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors duration-300 hover:bg-white/60">
                    {t("inicio.discoverServices")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <ServiciosContent className="bg-zinc-100 rounded-[3rem]" />

          <section className="border-y border-black/5 py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t("inicio.howWeWork")}</p>
                <h2 className="text-3xl leading-tight tracking-[-0.03em] text-zinc-900 lg:text-5xl">{t("inicio.howWeWorkTitle")}</h2>
              </div>
              <div className="space-y-4">
                {principles.map((item) => (
                  <article key={item.step}>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.step}</p>
                    <h3 className="mt-4 text-2xl text-zinc-900">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-24">
            <div className="grid gap-5 lg:grid-cols-3">
              {engagement.map((item) => (
                <article key={item.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-4 text-xl leading-8 text-zinc-800">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
