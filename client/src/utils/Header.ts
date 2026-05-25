// src/utils/Header.ts

import { debounce } from "./debounce";

declare global {
  interface Window {
    _zincelHeaderScrollAttached?: boolean;
  }
}

export function setupHeader() {
  const banner = document.getElementById("banner");
  const tabs = document.getElementById("tabs");
  const floatingIcon = document.getElementById("floating-icon");
  const modalBackground = document.getElementById("modal-background");
  const modalContact = document.getElementById("modal-contact");
  const logoImg = document.getElementById("logo-img") as HTMLImageElement | null;
  const modalLinks = modalContact
    ? Array.from(modalContact.querySelectorAll<HTMLAnchorElement>("a"))
    : [];
  let lastScrollTop = 0;

  // Si faltan todos los elementos, salir
  if (!banner && !tabs && !floatingIcon && !modalBackground && !modalContact) {
    console.warn("setupHeader: elementos del header no encontrados (ninguno presente).");
    return () => {};
  }

  // --- Scroll handler (debounced) ---
  const handleScroll = debounce(() => {
    if (!banner || !tabs || !floatingIcon || !logoImg) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
      banner.classList.add("hidden");
      banner.classList.remove("active");
      tabs.classList.add("hidden");

      if (window.innerWidth <= 430 && modalContact && !modalContact.classList.contains("active")) {
        floatingIcon.classList.add("hidden");
      }
    } else {
      banner.classList.remove("hidden");
      tabs.classList.remove("hidden");
      floatingIcon.classList.remove("hidden");
      banner.classList.toggle("active", scrollTop > 50);
    }

    lastScrollTop = scrollTop;
  }, 10);

  // --- Función para cerrar modal ---
  function closeModal() {
    if (!modalContact || !modalBackground || !floatingIcon) return;
    modalContact.classList.remove("active");
    modalBackground.classList.remove("active");
    floatingIcon.classList.remove("active");
  }

  // --- Click handlers ---
  function onFloatingClick(e: MouseEvent) {
    e.stopPropagation();
    if (!modalContact || !modalBackground || !floatingIcon) return;
    modalContact.classList.toggle("active");
    modalBackground.classList.toggle("active");
    floatingIcon.classList.toggle("active");
  }

  function onModalBackgroundClick() {
    closeModal();
  }

  // Attach floatingIcon listener (una sola vez)
  if (floatingIcon && !floatingIcon.dataset.headerAttached) {
    floatingIcon.addEventListener("click", onFloatingClick as EventListener);
    floatingIcon.dataset.headerAttached = "1";
  }

  // Attach background listener (una sola vez)
  if (modalBackground && !modalBackground.dataset.headerAttached) {
    modalBackground.addEventListener("click", onModalBackgroundClick as EventListener);
    modalBackground.dataset.headerAttached = "1";
  }

  // Attach links dentro del modal
  modalLinks.forEach((link) => {
    if (!link.dataset.headerAttached) {
      link.addEventListener("click", closeModal as EventListener);
      link.dataset.headerAttached = "1";
    }
  });

  // Attach scroll/resize listeners globales (una sola vez por página)
  if (!window._zincelHeaderScrollAttached) {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    window._zincelHeaderScrollAttached = true;
  }

  // Ejecutar una vez al inicio
  handleScroll();

  // --- Cleanup (muy importante en React) ---
  return function cleanup() {
    if (floatingIcon && floatingIcon.dataset.headerAttached) {
      floatingIcon.removeEventListener("click", onFloatingClick as EventListener);
      delete floatingIcon.dataset.headerAttached;
    }
    if (modalBackground && modalBackground.dataset.headerAttached) {
      modalBackground.removeEventListener("click", onModalBackgroundClick as EventListener);
      delete modalBackground.dataset.headerAttached;
    }
    modalLinks.forEach((link) => {
      if (link.dataset.headerAttached) {
        link.removeEventListener("click", closeModal as EventListener);
        delete link.dataset.headerAttached;
      }
    });
    if (window._zincelHeaderScrollAttached) {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      delete window._zincelHeaderScrollAttached;
    }
  };
}
