import SEO from "../global/seo";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PricingBand {
  label: string;
  title: string;
  price: string;
  description: string;
}

export default function PreciosWeb() {
  const { t } = useTranslation();

  const pricingBands = t("preciosWeb.bands", { returnObjects: true }) as PricingBand[];
  const includes = t("preciosWeb.includes", { returnObjects: true }) as string[];

  return (
    <>
      <SEO
        title={t("preciosWeb.seoTitle")}
        description={t("preciosWeb.seoDescription")}
        keywords={t("preciosWeb.seoKeywords")}
        url="https://www.zincelideas.com/precios-web"
      />

      <div className="min-h-screen bg-[#f3efe7] text-zinc-900">
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-12 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
            <div className="absolute right-[-8%] top-24 h-[28rem] w-[28rem] rounded-full bg-[#ddd4c6]/70 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              {/**PRICING OVERVIEW */}
              <div className="space-y-14">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {t("preciosWeb.overview")}
                </p>
                <h1 className="max-w-4xl text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.04em]">
                  {t("preciosWeb.title")}
                </h1>
                <p className="max-w-2xl text-[17px] leading-7 text-zinc-700 lg:text-lg">
                  {t("preciosWeb.description")}
                </p>
                <a
                  href="https://www.zincelideas.com/planes-web"
                  className="inline-flex items-center gap-3 bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-black"
                >
                  {t("preciosWeb.plansCta", "Ver planes web")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/**--------------- ENTRADA  ------------------*/}
              <section className=" rounded-t-[100px] py-20 lg:py-14 bg-zinc-900">
                <div className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-1 lg:px-12">
                  {pricingBands.map((band) => (
                    <article key={band.title} className="border-t border-black/10 pt-6">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                        {band.label}
                      </p>
                      <h2 className="mt-4 text-3xl text-zinc-200">{band.title}</h2>
                      <p className="mt-4 text-xl text-zinc-100">{band.price}</p>
                      <p className="mt-5 text-base leading-7 text-zinc-400">{band.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <div className="border-t border-black/10 pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {t("preciosWeb.pricingFactors")}
                </p>
                <div className="mt-4 space-y-4">
                  <p className="text-base leading-7 text-zinc-700">
                    {t("preciosWeb.pricingFactorsBodyOne")}
                  </p>
                  <p className="text-base leading-7 text-zinc-700">
                    {t("preciosWeb.pricingFactorsBodyTwo")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-[#f8f4ec] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {t("preciosWeb.included")}
                </p>
                <h2 className="text-3xl leading-tight tracking-[-0.03em] lg:text-4xl">
                  {t("preciosWeb.includedTitle")}
                </h2>
              </div>

              <div className="grid gap-4">
                {includes.map((item, index) => (
                  <article key={item} className="border-b border-black/10 pb-4 last:border-b-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-lg leading-7 text-zinc-700">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
