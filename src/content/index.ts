export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];

export const isLang = (v: string): v is Lang => v === "en" || v === "es";

export interface NavItem {
  to: string;
  label: string;
}

export interface SiteContent {
  htmlLang: string;
  ogLocale: string;
  siteName: string;
  fullName: string;
  role: string;
  nav: { home: string; about: string; research: string; consultancy: string; publications: string; contact: string };
  footer: { rights: string; email: string };
  langSwitch: { label: string; en: string; es: string };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroLead: string;
    heroBody: string;
    cta: string;
    anchorsTitle: string;
    anchors: { title: string; body: string }[];
    geoTitle: string;
    geoBody: string;
    geoMonitoring: string;
    closing: string;
    closingCta: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    bio: string[];
    positionalityTitle: string;
    positionality: string;
    languagesTitle: string;
    languages: string;
    timelineTitle: string;
    timeline: { period: string; entry: string }[];
    rolesTitle: string;
    roles: string[];
    placeholderNote: string;
  };
  research: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    projectsTitle: string;
    projects: { title: string; body: string }[];
    methodsTitle: string;
    methods: string[];
    themesTitle: string;
    themes: string[];
  };
  consultancy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    servicesTitle: string;
    services: { title: string; body: string }[];
    engagementsTitle: string;
    engagements: { title: string; body: string }[];
    clientsTitle: string;
    clientsNote: string;
    cta: string;
  };
  publications: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    listTitle: string;
    placeholder: string;
    orcidLabel: string;
    orcidNote: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    emailLabel: string;
    emailValue: string;
    formTitle: string;
    fields: {
      name: string;
      organisation: string;
      email: string;
      purpose: string;
      purposeOptions: { value: string; label: string }[];
      message: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
    notConfigured: string;
  };
}

const en: SiteContent = {
  htmlLang: "en",
  ogLocale: "en_GB",
  siteName: "Dr. Catharina van der Boor",
  fullName: "Dr. Catharina van der Boor",
  role: "Global Mental Health researcher and consultant",
  nav: { home: "Home", about: "About", research: "Research", consultancy: "Consultancy", publications: "Publications", contact: "Contact" },
  footer: { rights: "All rights reserved.", email: "Email" },
  langSwitch: { label: "Language", en: "EN", es: "ES" },
  home: {
    metaTitle: "Dr. Catharina van der Boor — Global Mental Health researcher and consultant",
    metaDescription:
      "Independent academic and consultant in Global Mental Health. MHPSS programme design, cultural adaptation of mental health instruments, and implementation science in conflict-affected and low-resource settings.",
    heroLead: "Global Mental Health researcher and consultant.",
    heroBody:
      "I work with UN agencies, INGOs, ministries of health, and research consortia on the design, evaluation, and cultural adaptation of mental health and psychosocial support programmes in conflict-affected and low-resource settings.",
    cta: "Discuss a collaboration",
    anchorsTitle: "Areas of work",
    anchors: [
      {
        title: "MHPSS in conflict-affected settings",
        body: "Programme design and evaluation aligned with IASC MHPSS guidelines and the Minimum Service Package, drawing on field experience in Ukraine, Uganda, and Colombia.",
      },
      {
        title: "Cultural adaptation and psychometrics",
        body: "Translation, cultural adaptation, and psychometric validation of mental health instruments across languages and contexts.",
      },
      {
        title: "Implementation science",
        body: "Mixed-methods research on the scalability, fidelity, and contextual fit of psychological interventions, with capacity-building of local providers.",
      },
    ],
    geoTitle: "Geographies",
    geoBody:
      "Demonstrated work across Uganda, Ukraine, Colombia, Sweden, India, Switzerland, the United Kingdom, the Netherlands, and Andorra.",
    geoMonitoring: "Additional monitoring and evaluation work covering Syria, Somalia, and Sudan.",
    closing: "If your organisation is scoping consultancy or research collaboration in MHPSS, I welcome a short note describing the work.",
    closingCta: "Get in touch",
  },
  about: {
    metaTitle: "About — Dr. Catharina van der Boor",
    metaDescription:
      "Biography, positionality, languages, and academic timeline of Dr. Catharina van der Boor, researcher in Global Mental Health.",
    title: "About",
    bio: [
      "I am a researcher and consultant in Global Mental Health, working at the intersection of clinical psychology, public health, and implementation science. My work focuses on how mental health and psychosocial support can be made available, acceptable, and effective in settings shaped by conflict, displacement, and resource scarcity.",
      "I hold an academic post at the London School of Hygiene & Tropical Medicine and collaborate with research and operational partners across Europe, Africa, Latin America, and South Asia.",
    ],
    positionalityTitle: "Positionality",
    positionality:
      "[To confirm] A short positionality statement will be added here, situating my training, language repertoire, and the perspectives I bring to research in low- and middle-income and conflict-affected settings.",
    languagesTitle: "Languages",
    languages: "[To confirm] Working languages used in research and consultancy.",
    timelineTitle: "Academic timeline",
    timeline: [
      { period: "[To confirm]", entry: "Current academic post at the London School of Hygiene & Tropical Medicine." },
      { period: "[To confirm]", entry: "Doctoral training and thesis." },
      { period: "[To confirm]", entry: "Earlier postgraduate and undergraduate qualifications." },
    ],
    rolesTitle: "Academic roles",
    roles: [
      "London School of Hygiene & Tropical Medicine — [To confirm position and dates].",
      "Universitat Carlemany — academic affiliation.",
    ],
    placeholderNote:
      "Items marked [To confirm] are placeholders pending verified content. Nothing has been invented.",
  },
  research: {
    metaTitle: "Research — Dr. Catharina van der Boor",
    metaDescription:
      "Current projects, methodological expertise, and thematic areas in Global Mental Health research.",
    title: "Research",
    intro:
      "My research programme combines mixed-methods empirical work with methodological development, with a particular focus on mental health interventions for populations affected by conflict and displacement.",
    projectsTitle: "Current projects",
    projects: [
      { title: "[To confirm]", body: "A short description of an ongoing project will be added here once verified." },
      { title: "[To confirm]", body: "A second ongoing project description." },
      { title: "[To confirm]", body: "A third ongoing project description." },
    ],
    methodsTitle: "Methodological expertise",
    methods: [
      "Mixed-methods study design",
      "Quantitative analysis in R",
      "Qualitative analysis in NVivo",
      "Cultural adaptation and translation of instruments",
      "Psychometric validation",
      "Implementation science frameworks",
    ],
    themesTitle: "Thematic areas",
    themes: [
      "Mental health and psychosocial support (MHPSS) in humanitarian settings",
      "Refugee and forcibly displaced populations",
      "Scalable psychological interventions",
      "Capacity-building and task-sharing",
      "Measurement of mental health across cultures",
    ],
  },
  consultancy: {
    metaTitle: "Consultancy — Dr. Catharina van der Boor",
    metaDescription:
      "Consultancy services in MHPSS programme design and evaluation, cultural adaptation, implementation science, and training.",
    title: "Consultancy",
    intro:
      "I take on a small number of consultancy engagements each year, typically with UN agencies, INGOs, ministries of health, and research consortia. Engagements are scoped to where rigorous, context-aware methods can make the most difference.",
    servicesTitle: "Services",
    services: [
      { title: "MHPSS programme design and evaluation", body: "Design and evaluation of mental health and psychosocial support programmes in conflict-affected settings, aligned with IASC MHPSS guidelines and the Minimum Service Package." },
      { title: "Cultural adaptation and psychometric validation", body: "Translation, cultural adaptation, and psychometric validation of mental health instruments." },
      { title: "Implementation science", body: "Implementation science for scalable psychological interventions, including fidelity, feasibility, and acceptability assessment." },
      { title: "Mixed-methods research", body: "Quantitative analysis in R and qualitative analysis in NVivo, integrated within a mixed-methods design." },
      { title: "Capacity-building and training", body: "Training of practitioners, researchers, and ministry staff. Past delivery includes 60+ professionals trained, with 30 Ministry of Health staff trained in Kyiv." },
      { title: "Needs assessments", body: "Mental health needs assessments aligned with IASC MHPSS guidelines and the Minimum Service Package." },
    ],
    engagementsTitle: "Engagement models",
    engagements: [
      { title: "Short-term technical advisory", body: "Targeted advisory on protocol design, instrument selection, sampling, or analytic strategy." },
      { title: "Evaluation lead", body: "Lead role on programme or intervention evaluations, from design through reporting." },
      { title: "Training delivery", body: "Workshops and longer training programmes for clinical, research, and ministry audiences." },
      { title: "Technical writing and review", body: "Drafting and review of protocols, technical reports, and peer-reviewed manuscripts." },
    ],
    clientsTitle: "Past clients and partners",
    clientsNote:
      "[To confirm] A list of past clients and partners will be added here once verified.",
    cta: "Discuss a brief",
  },
  publications: {
    metaTitle: "Publications — Dr. Catharina van der Boor",
    metaDescription:
      "Selected peer-reviewed publications in Global Mental Health and a link to the full ORCID record.",
    title: "Publications",
    intro:
      "A selection of peer-reviewed publications is listed below. The full and current record is maintained on ORCID.",
    listTitle: "Selected publications",
    placeholder:
      "[To confirm] A curated list of 6–10 selected peer-reviewed publications will appear here once verified. Nothing has been listed pending confirmation, in line with the project's content rules.",
    orcidLabel: "View full publication list on ORCID",
    orcidNote: "[ORCID URL to confirm]",
  },
  contact: {
    metaTitle: "Contact — Dr. Catharina van der Boor",
    metaDescription:
      "Contact form and direct email for consultancy, collaboration, supervision, and media enquiries.",
    title: "Contact",
    intro:
      "For consultancy, research collaboration, supervision, or media enquiries, please use the form below or write directly. A short note describing the work, timelines, and host organisation is most useful.",
    emailLabel: "Direct email",
    emailValue: "Catharina.van-der-boor@lshtm.ac.uk",
    formTitle: "Send a message",
    fields: {
      name: "Your name",
      organisation: "Organisation",
      email: "Email address",
      purpose: "Purpose of enquiry",
      purposeOptions: [
        { value: "consultancy", label: "Consultancy" },
        { value: "research", label: "Research collaboration" },
        { value: "supervision", label: "Postgraduate supervision" },
        { value: "media", label: "Media or policy enquiry" },
        { value: "other", label: "Other" },
      ],
      message: "Message",
    },
    submit: "Send message",
    submitting: "Sending…",
    success: "Thank you. Your message has been sent and will be answered shortly.",
    error: "Something went wrong sending your message. Please try again, or write directly by email.",
    notConfigured:
      "The contact form is not yet configured. In the meantime, please write directly to the email address above.",
  },
};

const es: SiteContent = {
  htmlLang: "es",
  ogLocale: "es_ES",
  siteName: "Dra. Catharina van der Boor",
  fullName: "Dra. Catharina van der Boor",
  role: "Investigadora y consultora en Salud Mental Global",
  nav: { home: "Inicio", about: "Sobre mí", research: "Investigación", consultancy: "Consultoría", publications: "Publicaciones", contact: "Contacto" },
  footer: { rights: "Todos los derechos reservados.", email: "Correo electrónico" },
  langSwitch: { label: "Idioma", en: "EN", es: "ES" },
  home: {
    metaTitle: "Dra. Catharina van der Boor — Investigadora y consultora en Salud Mental Global",
    metaDescription:
      "Académica y consultora independiente en Salud Mental Global. Diseño y evaluación de programas MHPSS, adaptación cultural de instrumentos y ciencia de la implementación en contextos afectados por conflictos.",
    heroLead: "Investigadora y consultora en Salud Mental Global.",
    heroBody:
      "Colaboro con agencias de Naciones Unidas, ONG internacionales, ministerios de salud y consorcios de investigación en el diseño, la evaluación y la adaptación cultural de programas de salud mental y apoyo psicosocial en contextos afectados por conflictos y de bajos recursos.",
    cta: "Plantear una colaboración",
    anchorsTitle: "Áreas de trabajo",
    anchors: [
      {
        title: "MHPSS en contextos de conflicto",
        body: "Diseño y evaluación de programas alineados con las guías MHPSS del IASC y el Paquete Mínimo de Servicios, con experiencia de campo en Ucrania, Uganda y Colombia.",
      },
      {
        title: "Adaptación cultural y psicometría",
        body: "Traducción, adaptación cultural y validación psicométrica de instrumentos de salud mental en distintos idiomas y contextos.",
      },
      {
        title: "Ciencia de la implementación",
        body: "Investigación con métodos mixtos sobre la escalabilidad, la fidelidad y el ajuste contextual de intervenciones psicológicas, junto con la formación de proveedores locales.",
      },
    ],
    geoTitle: "Geografías",
    geoBody:
      "Trabajo realizado en Uganda, Ucrania, Colombia, Suecia, India, Suiza, Reino Unido, Países Bajos y Andorra.",
    geoMonitoring: "Trabajo adicional de monitoreo y evaluación en Siria, Somalia y Sudán.",
    closing:
      "Si su organización está valorando una consultoría o colaboración de investigación en MHPSS, le invito a enviarme una nota breve describiendo el encargo.",
    closingCta: "Ponerse en contacto",
  },
  about: {
    metaTitle: "Sobre mí — Dra. Catharina van der Boor",
    metaDescription:
      "Biografía, posicionalidad, idiomas y trayectoria académica de la Dra. Catharina van der Boor, investigadora en Salud Mental Global.",
    title: "Sobre mí",
    bio: [
      "Soy investigadora y consultora en Salud Mental Global, trabajando en la intersección entre la psicología clínica, la salud pública y la ciencia de la implementación. Mi trabajo se centra en cómo la salud mental y el apoyo psicosocial pueden estar disponibles, ser aceptables y resultar efectivos en contextos marcados por conflicto, desplazamiento y escasez de recursos.",
      "Ocupo una posición académica en la London School of Hygiene & Tropical Medicine y colaboro con socios de investigación y operativos en Europa, África, América Latina y el sur de Asia.",
    ],
    positionalityTitle: "Posicionalidad",
    positionality:
      "[Por confirmar] Aquí se incluirá una breve declaración de posicionalidad, situando mi formación, mi repertorio lingüístico y las perspectivas que aporto a la investigación en contextos de ingresos bajos y medios y afectados por conflictos.",
    languagesTitle: "Idiomas",
    languages: "[Por confirmar] Idiomas de trabajo utilizados en investigación y consultoría.",
    timelineTitle: "Trayectoria académica",
    timeline: [
      { period: "[Por confirmar]", entry: "Posición académica actual en la London School of Hygiene & Tropical Medicine." },
      { period: "[Por confirmar]", entry: "Formación doctoral y tesis." },
      { period: "[Por confirmar]", entry: "Estudios de posgrado y de grado anteriores." },
    ],
    rolesTitle: "Roles académicos",
    roles: [
      "London School of Hygiene & Tropical Medicine — [posición y fechas por confirmar].",
      "Universitat Carlemany — afiliación académica.",
    ],
    placeholderNote:
      "Los elementos marcados como [Por confirmar] son marcadores de posición pendientes de verificación. No se ha inventado nada.",
  },
  research: {
    metaTitle: "Investigación — Dra. Catharina van der Boor",
    metaDescription:
      "Proyectos en curso, experiencia metodológica y áreas temáticas de investigación en Salud Mental Global.",
    title: "Investigación",
    intro:
      "Mi programa de investigación combina trabajo empírico con métodos mixtos y desarrollo metodológico, con énfasis en intervenciones de salud mental para poblaciones afectadas por conflictos y desplazamiento.",
    projectsTitle: "Proyectos en curso",
    projects: [
      { title: "[Por confirmar]", body: "Aquí se incluirá una breve descripción de un proyecto en curso, una vez verificado." },
      { title: "[Por confirmar]", body: "Descripción de un segundo proyecto en curso." },
      { title: "[Por confirmar]", body: "Descripción de un tercer proyecto en curso." },
    ],
    methodsTitle: "Experiencia metodológica",
    methods: [
      "Diseño de estudios con métodos mixtos",
      "Análisis cuantitativo en R",
      "Análisis cualitativo en NVivo",
      "Adaptación cultural y traducción de instrumentos",
      "Validación psicométrica",
      "Marcos de la ciencia de la implementación",
    ],
    themesTitle: "Áreas temáticas",
    themes: [
      "Salud mental y apoyo psicosocial (MHPSS) en contextos humanitarios",
      "Poblaciones refugiadas y desplazadas forzosamente",
      "Intervenciones psicológicas escalables",
      "Formación de capacidades y reparto de tareas",
      "Medición de la salud mental entre culturas",
    ],
  },
  consultancy: {
    metaTitle: "Consultoría — Dra. Catharina van der Boor",
    metaDescription:
      "Servicios de consultoría en diseño y evaluación de programas MHPSS, adaptación cultural, ciencia de la implementación y formación.",
    title: "Consultoría",
    intro:
      "Acepto un número limitado de encargos de consultoría cada año, habitualmente con agencias de Naciones Unidas, ONG internacionales, ministerios de salud y consorcios de investigación. Los encargos se acotan a aquellos espacios donde unos métodos rigurosos y sensibles al contexto pueden marcar la mayor diferencia.",
    servicesTitle: "Servicios",
    services: [
      { title: "Diseño y evaluación de programas MHPSS", body: "Diseño y evaluación de programas de salud mental y apoyo psicosocial en contextos afectados por conflictos, alineados con las guías MHPSS del IASC y el Paquete Mínimo de Servicios." },
      { title: "Adaptación cultural y validación psicométrica", body: "Traducción, adaptación cultural y validación psicométrica de instrumentos de salud mental." },
      { title: "Ciencia de la implementación", body: "Ciencia de la implementación para intervenciones psicológicas escalables, incluyendo evaluación de fidelidad, factibilidad y aceptabilidad." },
      { title: "Investigación con métodos mixtos", body: "Análisis cuantitativo en R y análisis cualitativo en NVivo, integrados en un diseño de métodos mixtos." },
      { title: "Formación y capacitación", body: "Formación de profesionales clínicos, investigadores y personal ministerial. Entregas previas incluyen más de 60 profesionales formados, con 30 miembros del Ministerio de Salud formados en Kiev." },
      { title: "Evaluaciones de necesidades", body: "Evaluaciones de necesidades en salud mental alineadas con las guías MHPSS del IASC y el Paquete Mínimo de Servicios." },
    ],
    engagementsTitle: "Modelos de colaboración",
    engagements: [
      { title: "Asesoría técnica de corto plazo", body: "Asesoría puntual sobre diseño de protocolos, selección de instrumentos, muestreo o estrategia analítica." },
      { title: "Liderazgo de evaluaciones", body: "Liderazgo de evaluaciones de programas o intervenciones, desde el diseño hasta el informe final." },
      { title: "Formación", body: "Talleres y programas de formación más largos para públicos clínicos, de investigación y ministeriales." },
      { title: "Redacción y revisión técnica", body: "Redacción y revisión de protocolos, informes técnicos y manuscritos revisados por pares." },
    ],
    clientsTitle: "Clientes y socios anteriores",
    clientsNote:
      "[Por confirmar] Aquí se incluirá un listado de clientes y socios anteriores, una vez verificado.",
    cta: "Plantear un encargo",
  },
  publications: {
    metaTitle: "Publicaciones — Dra. Catharina van der Boor",
    metaDescription:
      "Selección de publicaciones revisadas por pares en Salud Mental Global y enlace al registro completo en ORCID.",
    title: "Publicaciones",
    intro:
      "A continuación se ofrece una selección de publicaciones revisadas por pares. El registro completo y actualizado se mantiene en ORCID.",
    listTitle: "Publicaciones seleccionadas",
    placeholder:
      "[Por confirmar] Aquí aparecerá una selección de 6 a 10 publicaciones revisadas por pares, una vez verificadas. No se ha incluido ningún listado mientras no se confirme, conforme a las normas de contenido del proyecto.",
    orcidLabel: "Ver el listado completo en ORCID",
    orcidNote: "[URL de ORCID por confirmar]",
  },
  contact: {
    metaTitle: "Contacto — Dra. Catharina van der Boor",
    metaDescription:
      "Formulario de contacto y correo directo para consultoría, colaboración, supervisión y consultas de medios.",
    title: "Contacto",
    intro:
      "Para consultoría, colaboración de investigación, supervisión o consultas de medios, le ruego que utilice el formulario o escriba directamente. Una nota breve describiendo el trabajo, los plazos y la organización solicitante resulta de gran ayuda.",
    emailLabel: "Correo directo",
    emailValue: "[Correo de LSHTM por confirmar]",
    formTitle: "Enviar un mensaje",
    fields: {
      name: "Su nombre",
      organisation: "Organización",
      email: "Correo electrónico",
      purpose: "Motivo de la consulta",
      purposeOptions: [
        { value: "consultancy", label: "Consultoría" },
        { value: "research", label: "Colaboración de investigación" },
        { value: "supervision", label: "Supervisión de posgrado" },
        { value: "media", label: "Consulta de medios o de política" },
        { value: "other", label: "Otro" },
      ],
      message: "Mensaje",
    },
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    success: "Gracias. Su mensaje ha sido enviado y se le responderá en breve.",
    error: "Se ha producido un error al enviar su mensaje. Por favor, inténtelo de nuevo o escriba directamente al correo indicado.",
    notConfigured:
      "El formulario de contacto aún no está configurado. Mientras tanto, le ruego que escriba directamente al correo indicado más arriba.",
  },
};

const content: Record<Lang, SiteContent> = { en, es };

export const getContent = (lang: Lang): SiteContent => content[lang];
