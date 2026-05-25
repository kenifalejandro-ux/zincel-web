import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBehance, faFacebookF, faInstagram, faLinkedinIn, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import { trackWhatsAppClick, WHATSAPP_URL } from "../../utils/whatsapp";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/zincelideasglobales", icon: faInstagram },
  { label: "Facebook", href: "https://www.facebook.com/zincelideasglobales", icon: faFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zincelideasglobales", icon: faLinkedinIn },
  { label: "Behance", href: "https://www.behance.net/zincelideasglobales", icon: faBehance },
  { label: "TikTok", href: "https://www.tiktok.com/@zincelideasglobales", icon: faTiktok },
];

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    { label: t("footer.links.home"), href: "/" },
    { label: t("footer.links.services"), href: "/servicios" },
    { label: t("footer.links.portfolio"), href: "/portfolio" },
    { label: t("footer.links.about"), href: "/sobre-nosotros" },
    { label: t("footer.links.pricing"), href: "/precios-web" },
    { label: t("footer.links.experiences"), href: "/experiencias" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#181716] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-18%] h-96 w-96 rounded-full bg-[#776b57]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Zincel</p>
            <h2 className="max-w-3xl text-3xl leading-[1.02] tracking-[-0.03em] lg:text-5xl">
              {t("footer.title")}
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-300">{t("footer.description")}</p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">{t("footer.contact")}</p>
              <a href="mailto:kenif.alejandro@zincelideas.com" className="inline-flex items-center gap-3 text-zinc-200 transition-colors hover:text-white">
                <Mail className="h-4 w-4" />
                kenif.alejandro@zincelideas.com
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-zinc-200 transition-colors hover:text-white"
                onClick={() => trackWhatsAppClick({ text: "+51 933 838 792", section: "Footer", component: "Footer", variant: "primary" })}
              >
                <Phone className="h-4 w-4" />
                +51 933 838 792
              </a>
            </div>

            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">{t("footer.navigation")}</p>
              <nav className="grid gap-3">
                {footerLinks.map((link) => (
                  <NavLink key={link.href} to={link.href} className="text-zinc-200 transition-colors hover:text-white">
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">{t("footer.social")}</p>
            <div className="grid w-fit grid-cols-5 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  <FontAwesomeIcon icon={link.icon} className="w-4 text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <span>{t("footer.madeIn", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.studioLine")}</span>
        </div>
      </div>
    </footer>
  );
}
