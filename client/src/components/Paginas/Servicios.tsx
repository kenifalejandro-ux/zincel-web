/** client/src/components/Paginas/Servicios.tsx */

import { useTranslation } from "react-i18next";
import ServiceBenefitsSection from "../sections/ServiceBenefitsSection";
import Entregables from "../sections/Entregables";
import Procesos from "../sections/Procesos";
import ContactoServices from "../sections/ContactoServices";
import FloatingCta from "../shared/FloatingCta";
import { getServicesPageData } from "../../content/servicesPageData";
import PageSEO from "../global/PageSEO";

export default function Servicios() {
  const { t } = useTranslation();
  const { pageData, brandingData, desarrolloWebData, modelado3DData, uiuxData, marketingData } =
    getServicesPageData();

  const whatsappText = t("heroServicios.whatsappText");

  return (
    <>
      <PageSEO pageId="servicios" />
      <ServiceBenefitsSection {...desarrolloWebData} />
      <ServiceBenefitsSection {...brandingData} />
      <ServiceBenefitsSection {...uiuxData} />
      <ServiceBenefitsSection {...modelado3DData} />
      <ServiceBenefitsSection {...marketingData} />

      <Entregables {...pageData} />
      <Procesos {...pageData} />
      <ContactoServices {...pageData} whatsappText={whatsappText} />
      <FloatingCta whatsappText={whatsappText} />
    </>
  );
}
