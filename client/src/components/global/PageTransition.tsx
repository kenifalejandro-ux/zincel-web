import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    const page = document.querySelector("#page-root");
    if (!page) return;

    gsap.fromTo(
      page,
      {
        opacity: 0,
        scale: 0.985,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: "power2.out",
        clearProps: "opacity,scale",
      }
    );
  }, [location.pathname]);

  return null;
}
