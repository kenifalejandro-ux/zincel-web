import { useNavigate } from "react-router-dom";
import { openWhatsApp, type WhatsAppClickMeta } from "../utils/whatsapp";

export const useWhatsApp = () => {
  const navigate = useNavigate();

  return (meta: WhatsAppClickMeta = {}) => {
    openWhatsApp(meta);
    navigate("/gracias");
  };
};
