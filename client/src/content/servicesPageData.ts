/**client/src/content/servicePageData.ts */

type Benefit = { title: string; description: string; image?: string; videoSrc?: string; videoPoster?: string };

export function getServicesPageData() {
  return {
    pageData: {
      seo: {
        title: "Servicios Creativos y Digitales | Zincel",
        description: "Servicios de desarrollo web, branding, diseño UI/UX y modelado 3D para marcas que buscan una presencia más clara, sólida y profesional.",
        keywords: "desarrollo web lima, branding perú, diseño ui ux lima, modelado 3d perú, servicios creativos zincel",
        url: "https://www.zincelideas.com/servicios",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Servicios Creativos y Digitales | Zincel",
          provider: { "@type": "Organization", name: "Zincel", url: "https://www.zincelideas.com" },
          areaServed: { "@type": "Place", name: "Lima, Perú" },
          description: "Servicios de desarrollo web, branding, diseño UI/UX y modelado 3D para marcas que buscan una presencia más clara, sólida y profesional.",
          offers: { "@type": "Offer", priceCurrency: "PEN", price: "1300", url: "https://www.zincelideas.com/servicios" },
        },
      },
      deliverablesTitle: "Lo que aterrizamos en cada proyecto.",
      deliverablesDescription: "Cada entrega busca dejarte una web lista para operar, actualizar y escalar; no solo una maqueta atractiva.",
      deliverables: [
        { title: "Arquitectura y narrativa", description: "Definición de estructura, contenidos clave, ritmo de lectura y llamadas a la acción con intención comercial. Analizamos profundamente tu oferta para construir una jerarquía de información que guíe al usuario sin fricciones hacia el contacto." },
        { title: "Diseño responsive", description: "Sistema visual adaptado a móvil, tablet y desktop, con prioridad en legibilidad y jerarquía. Aseguramos que el layout mantenga la calidad tipográfica y el espaciado óptimo sin importar desde qué dispositivo te lean." },
        { title: "Implementación optimizada", description: "Construcción técnica orientada a performance, SEO on-page y mantenimiento razonable. Entregamos un código limpio que carga en instantes, porque el 2050 no espera a nadie." },
        { title: "Soporte de lanzamiento", description: "Entrega, revisión final y acompañamiento inicial para ajustar detalles después de publicar. Porque el trabajo no termina cuando subimos la web a producción." },
      ],
      processTitle: "Un proceso corto, claro y con criterio.",
      processDescription: "Preferimos procesos precisos y bien dirigidos para que las decisiones importantes se tomen rápido y con contexto.",
      process: [
        { step: "01", title: "Diagnóstico", description: "Vemos qué necesita comunicar la marca, qué está frenando la conversión y qué nivel visual debería tener la web." },
        { step: "02", title: "Dirección visual", description: "Construimos una propuesta visual y de estructura que haga que el sitio se sienta más sólido y más actual." },
        { step: "03", title: "Desarrollo", description: "Llevamos el diseño a una implementación real, rápida y lista para publicarse con seguridad." },
        { step: "04", title: "Lanzamiento", description: "Validamos detalles finales, publicamos y ajustamos lo necesario para dejar el sitio afinado." },
      ],
      closingTitle: "Si tu web ya no representa el nivel de tu negocio, es momento de rediseñarla en serio.",
      closingDescription: "Podemos empezar con una conversación breve para definir alcance, prioridades y el tipo de experiencia que más te conviene construir.",
      closingButtonLabel: "Hablemos de tu proyecto",
    },
    desarrolloWebData: {
      eyebrow: "Desarrollo Web",
      whatsappText: "Quiero una página web profesional",
      reverse: true,
      benefitsTitle: "Páginas web rápidas y optimizadas que convierten visitantes en clientes.",
      benefitsDescription: "Creamos sitios web profesionales con arquitectura clara, performance sólida y una experiencia que eleva la percepción de tu negocio desde el primer scroll.",
      benefits: [
        { title: "Experiencia responsive", description: "El sitio mantiene legibilidad, ritmo visual y claridad en móvil, tablet y desktop.", image: "./imagenes-optim/imagenes/ux" },
        { title: "Jerarquía que guía la atención", description: "Ordenamos titulares, secciones y llamadas a la acción para que cada visita entienda rápido qué ofreces y cuál es el siguiente paso." },
        { title: "Narrativa comercial más clara", description: "Estructuramos el contenido para que tu propuesta se sienta más confiable, más precisa y más fácil de convertir en una conversación real." },
      ] as Benefit[],
    },
    brandingData: {
      eyebrow: "Branding",
      whatsappText: "Quiero mejorar el branding de mi marca",
      reverse: false,
      benefitsTitle: "Identidad visual completa para diferenciar tu marca del mercado.",
      benefitsDescription: "Diseñamos sistemas de marca que no se quedan solo en el logo: construimos lenguaje visual, tono, orden y coherencia para que tu empresa se vea más madura y memorable.",
      benefits: [
        { title: "Logo profesional", description: "Creamos un signo visual con mejor criterio formal para que la marca se perciba más seria y reconocible.", image: "./imagenes-optim/servicios/branding/branding" },
        { title: "Sistema de marca", description: "Definimos color, tipografía y lineamientos para que toda la comunicación mantenga orden y coherencia.", image: "./imagenes-optim/servicios/branding/branding-safety" },
        { title: "Aplicaciones visuales", description: "Aterrizamos la identidad en piezas concretas para que funcione de verdad y no se quede solo en presentación.", image: "./imagenes-optim/servicios/branding/brochureBCingenieros" },
      ] as Benefit[],
    },
    uiuxData: {
      eyebrow: "Diseño UI/UX",
      whatsappText: "Quiero mejorar la experiencia de mi proyecto digital",
      reverse: true,
      benefitsTitle: "Interfaces intuitivas que mejoran la experiencia y las conversiones.",
      benefitsDescription: "Pensamos productos y pantallas con una lógica clara, más liviana y más humana. El objetivo es que cada flujo se sienta fácil de entender y convincente de usar.",
      benefits: [
        { title: "Research y definición", description: "Leemos el contexto del producto y las necesidades del usuario para tomar decisiones con más criterio.", image: "./imagenes-optim/servicios/ui/wireframe-calera-boceto" },
        { title: "Wireframes y estructura", description: "Construimos recorridos y jerarquías claras antes de entrar al detalle visual." },
        { title: "Prototipos y validación", description: "Aterrizamos interacciones en prototipos para revisar usabilidad, consistencia y comprensión.", image: "./imagenes-optim/servicios/ui/wireframe-calera-colors" },
      ] as Benefit[],
    },
    modelado3DData: {
      eyebrow: "Modelado 3D",
      whatsappText: "Quiero modelado 3D para mi proyecto",
      reverse: false,
      galleryLayout: "viewport" as const,
      benefitsTitle: "Visualizaciones 3D fotorrealistas para productos, espacios y conceptos.",
      benefitsDescription: "Usamos 3D para sumar presencia, atmósfera y sofisticación. Es una capa visual poderosa cuando quieres vender innovación, premium o una propuesta más aspiracional.",
      benefits: [
        { title: "Renders de alto impacto", description: "Mostramos productos y espacios con más claridad visual para que el valor se entienda desde el primer vistazo.", videoSrc: "/videos-optim/hero/inti-pintay/inti-pintay.mp4", videoPoster: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay.avif" },
        { title: "Texturas e iluminación", description: "Trabajamos materiales, luz y acabado para que la pieza se sienta más real y mejor resuelta." },
        { title: "Animación y presentación", description: "Creamos secuencias cuando hace falta explicar mejor un concepto o potenciar la propuesta visual." },
      ] as Benefit[],
    },
    marketingData: {
      eyebrow: "Campañas Digitales",
      whatsappText: "Quiero gestionar campañas digitales con Zincel",
      reverse: true,
      benefitsTitle: "Campañas en Meta, TikTok y Google con análisis real de cada sol invertido.",
      benefitsDescription: "Gestionamos campañas en las tres plataformas principales desde nuestro propio CRM con integración directa a sus APIs. Sin reportes de terceros: tus métricas, conversiones y audiencias en un solo sistema que controlamos nosotros.",
      benefits: [
        { title: "Gestión en las tres plataformas", description: "Creamos y optimizamos campañas en Meta Ads, TikTok Ads y Google Ads con criterio unificado, para que el presupuesto trabaje en los canales donde está tu audiencia.", image: "./imagenes-optim/servicios/campañas/ads003" },
        { title: "CRM propio con API integrada", description: "Nuestro CRM se conecta directamente a Meta, TikTok y Google. Importamos campañas, trazamos resultados y tomamos decisiones con datos reales, no con capturas de pantalla." },
        { title: "Análisis de conversión y optimización", description: "Seguimos el costo por resultado, el rendimiento por audiencia y el comportamiento de cada anuncio para optimizar en tiempo real y maximizar el retorno." },
      ] as Benefit[],
    },
  };
}
