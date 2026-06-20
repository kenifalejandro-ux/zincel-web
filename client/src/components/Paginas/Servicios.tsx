/** client/src/components/Paginas/Servicios.tsx */

import ServiceBenefitsSection from "../sections/ServiceBenefitsSection";
import Entregables from "../sections/Entregables";
import Procesos from "../sections/Procesos";
import ContactoServices from "../sections/ContactoServices";
import FloatingCta from "../shared/FloatingCta";
import { getServicesPageData } from "../../content/servicesPageData";
import PageSEO from "../global/PageSEO";

const WHATSAPP_TEXT = "Hola, vi sus servicios y quiero saber cómo pueden ayudar a mi marca";

export default function Servicios() {
  const { pageData, brandingData, desarrolloWebData, modelado3DData, uiuxData, marketingData } =
    getServicesPageData();

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
      <ContactoServices {...pageData} whatsappText={WHATSAPP_TEXT} />
      <FloatingCta whatsappText={WHATSAPP_TEXT} />
    </>
  );
}
