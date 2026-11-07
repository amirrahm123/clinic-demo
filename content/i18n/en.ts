import type { Dictionary } from "./index";

// English UI strings. Natural, UK/US-neutral English for international patients.

export const en: Dictionary = {
  meta: {
    title: "Praxisklinik Isarblick – Orthopedics, Dermatology & Aesthetics near Munich",
    description:
      "Private practice for regenerative medicine in Munich-Bogenhausen: orthopedics, physiotherapy, dermatology, gynecology and aesthetic medicine – with imaging and an in-house lab under one roof.",
    ogTagline: "Private practice · Munich-Bogenhausen",
    locale: "en_US",
  },

  a11y: {
    skipToContent: "Skip to content",
    homeLink: "Praxisklinik Isarblick – home",
    mainNav: "Main navigation",
    mobileNav: "Main navigation (mobile)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    close: "Close",
    newTab: "(opens in a new tab)",
    language: "Language",
    switchToOther: "Zur deutschen Version wechseln",
    call: "Call",
    skipIntro: "Skip intro",
  },

  intro: {
    skip: "Skip",
    tagline: "Regenerative medicine. Under one roof.",
  },

  langBanner: {
    text: "Diese Seite auf Deutsch ansehen",
    dismiss: "Ausblenden",
  },

  header: {
    nav: {
      complaints: "Symptoms",
      departments: "Departments",
      team: "Medical team",
      practice: "Practice",
      international: "International",
    },
    book: "Book appointment",
  },

  hero: {
    eyebrow: "Private practice · Munich-Bogenhausen",
    line1: "Regenerative medicine.",
    line2: "Under one roof.",
    text: "Orthopedics, dermatology, aesthetics, gynecology and physio – with imaging and lab in-house, in Munich-Bogenhausen.",
    book: "Book appointment",
    findSpecialist: "Find the right specialist",
    chipsLead: "Topics:",
    chips: {
      knie: "Knee",
      ruecken: "Back",
      schulter: "Shoulder",
      haut: "Skin",
      gyne: "Women’s health",
    },
    imageAlt: "Physiotherapy treatment of the upper back at Isarblick",
  },

  openNow: {
    open: "Open now · until {time}",
    closed: "Closed · opens {day}{time}",
    days: { mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat", su: "Sun" },
  },

  trust: {
    label: "Isarblick at a glance",
    reviews: "Google reviews",
    ratingSr: "out of 5 stars – Google profile",
    specialties: "6\u00a0specialties under one roof",
  },

  bodyMap: {
    title: "Show us where it hurts.",
    intro: "Tap a body region: common causes, how Isarblick investigates it and which department fits.",
    steps: ["Choose an area", "Answer one question", "See who can help"],
    stepsLabel: "How it works",
    views: { front: "Front", back: "Back" },
    viewLabel: "Figure view",
    legendLabel: "Department colours",
    allZones: "All areas",
    selected: "Selected",
    search: {
      heading: "What’s bothering you?",
      label: "Search a complaint or body area",
      placeholders: [
        "Knee pain when climbing stairs…",
        "Lower back pain…",
        "Hair loss…",
        "Skin rash…",
      ],
      quickLabel: "Common requests",
      hint: "Or tap the area on the body",
      resultsLabel: "Suggestions",
      resultsCount: "{n} suggestions – use the arrow keys to choose, Enter opens",
      oneResult: "1 suggestion – Enter opens",
      noMatch: "We couldn’t find an exact match – describe it and we’ll get back to you.",
      clear: "Clear input",
    },
    summaryHint: "Causes, diagnostics and treatment",
    otherAnswer: "different answer",
    diagLabel: "How we investigate it at Isarblick",
    therapyLabel: "Possible treatments",
    alsoRelevant: "Also relevant:",
    warningLabel: "Warning",
    viaDoctolib: "via Doctolib",
    reset: "Reset selection",
    freeText: {
      option: "Something else? Describe it",
      label: "Describe your complaint in your own words",
      placeholder: "e.g. knee pain for two weeks when climbing stairs",
      note: "Your text is not sent anywhere – it is only checked in your browser.",
      submit: "Find the right help",
      submitHint: "Enter submits, Shift + Enter adds a line break.",
      zoneSuggestion: "It sounds like your {zone}",
      showZone: "Show {zone}",
      sameZone: "That fits this area. Choose the closest answer above or book directly.",
      notes: {
        headache:
          "Tension headaches often come from the neck. For other headaches your GP is the right first stop.",
        jaw: "Jaw and temple pain is often linked to the chewing muscles and the neck. For toothache your dentist is the right first stop.",
      },
      regionLabel: "Region without a marker on the figure",
      regionReview: "General guidance – it does not replace an examination.",
      suggestion: "This sounds like a case for {dept}",
      book: "Book {dept}",
      noMatch: "We’d like to hear more: call us and we’ll find the right specialist for you.",
      emergencyTitle: "This may be an emergency",
      emergencyText: "With chest pain, shortness of breath, paralysis, numbness or severe bleeding, please call\u00a0112 immediately.",
      emergencyCall: "Call\u00a0112",
    },
  },

  departments: {
    title: "Six departments, one address.",
    facts: [
      "X-ray, ultrasound and lab in-house",
      "6\u00a0specialties at one address in Munich",
      "Online booking per department via Doctolib",
    ],
  },

  journey: {
    title: "From diagnosis to treatment – often in a single *morning*.",
    text: "X-ray, ultrasound, spine measurement and the lab are in-house. Findings and treatment often follow on the same day.",
    starsSr: "5 out of 5 stars",
    source: "Google review",
    stepsLabel: "Your visit in five steps",
    stepOf: "Step {n} of {total}",
    showStep: "Show step",
    trackLabel: "Steps – scrolls horizontally",
    reviewsLabel: "Google reviews",
    translated: "(translated)",
    reviewPrev: "Previous review",
    reviewNext: "Next review",
    reviewCounter: "Review {n} of {total}",
  },

  team: {
    title: "Eight specialists.",
    titleDept: "Our {dept} team.",
    filterLabel: "Filter by department",
    filterAll: "All",
    shown: "{n} doctors shown",
    all: "Full team",
    trackLabel: "Physicians – scrolls horizontally",
    prev: "previous",
    next: "next",
    portraitOf: "Portrait of",
    viewProfile: "View profile",
    profile: {
      portraitOf: "Portrait of",
      focus: "Focus",
      career: "Career",
      qualifications: "Qualifications",
      memberships: "Memberships",
      publications: "Publications",
      book: "Book {dept}",
      call: "Call",
      prev: "Previous doctor",
      next: "Next doctor",
      close: "Close profile",
    },
  },

  // TODO(client): billing wording, costs of a first consultation, visit duration and
  // further languages are unconfirmed – the answers say so instead of inventing figures.
  firstVisit: {
    title: "Your first visit.",
    text: "What to know before your first appointment – from billing to getting here. For anything else, our team is a phone call away.",
    call: "Call us",
    label: "Common questions about the first visit",
    questions: [
      {
        id: "private",
        question: "Is Isarblick a private practice? Who pays?",
        answer:
          "Yes, Isarblick is a private practice. We treat privately insured patients and self-payers; patients with statutory insurance can use our services as self-payers.",
      },
      {
        id: "costs",
        question: "What does a first consultation cost roughly?",
        answer:
          "Our team will tell you the costs in advance – call us. Billing follows the German fee schedule for physicians (GOÄ).",
      },
      {
        id: "bring",
        question: "What should I bring?",
        answer:
          "Your ID, your insurance card or proof of insurance, previous findings, existing imaging (e.g. on CD) and your current medication list.",
      },
      {
        id: "duration",
        question: "How long does the first visit take?",
        answer:
          "That depends on the department and your concern. Our team will tell you how much time to plan for when you book.",
      },
      {
        id: "languages",
        question: "Which languages do you speak?",
        answer: "German and English.",
      },
      {
        id: "directions",
        question: "Parking and getting here",
        answer: "{address}. {parking}. By public transport: {transit}.",
      },
    ],
  },

  visit: {
    title: "Visiting us in Munich.",
    text: "Musterstraße\u00a012 in Munich-Bogenhausen: underground parking in the building, U4 a few minutes away.",
    images: {
      main: "Patient relaxing during a facial treatment at Isarblick Aesthetics",
      arch: "Skin cancer screening with digital photo documentation at Isarblick Dermatology",
      third: "Participants of a group class at Isarblick Physiotherapy",
    },
    route: "Plan your route",
    routeSr: "(Google Maps, opens in a new tab)",
    hours: [{ department: "All departments", hours: "Appointments by arrangement" }],
    parking: "Underground car park in the building",
    transit: "U4 Arabellapark, then 5 minutes on foot",
    international: {
      eyebrow: "International Patients",
      title: "Regenerative medicine near Munich.",
      text: "Services, treatments, our medical team and answers to common questions for patients travelling from abroad.",
      cta: "Information for international patients",
    },
    booking: { title: "Book an appointment" },
    map: {
      title: "Route sketch: getting to Bogenhausen",
      desc: "Schematic map: Praxisklinik Isarblick is at Musterstraße 12 in Munich-Bogenhausen, a short walk from U4 Arabellapark. Underground parking in the building.",
      labels: {
        munich: "Munich",
        aschheim: "Bogenhausen",
        a94: "A 94",
        a99: "A 99",
        u2: "U2",
        s2: "S2",
        messestadtWest: "Messestadt West",
        feldkirchen: "Feldkirchen",
        bus263: "Bus 263",
        bus230: "Bus 230",
        roc: "Isarblick",
        parking: "Car park",
      },
    },
  },

  footer: {
    departments: "Departments",
    roc: "Isarblick",
    contact: "Contact",
    links: { team: "Medical team", careers: "Careers", events: "Events", guide: "Health guide" },
    contactLinks: { directions: "Getting here", international: "International Patients" },
    copyright: "© 2026 Praxisklinik Isarblick · Munich-Bogenhausen",
    legal: { imprint: "Imprint", privacy: "Privacy policy", press: "Press" },
    germanNote: "(German)",
  },

  booking: {
    title: "Book an appointment",
    text: "Choose your department – we’ll take you straight to the right calendar.",
    unsure: "Not sure which department is right? Give us a call:",
    physioSub: "Contact & call-back",
    onlineSub: "Online via Doctolib",
    contact: "Get in touch",
  },

  legal: {
    imprint: "Imprint",
    privacy: "Privacy policy",
    text: "This page is being revised. Until then, the current version is available at",
    home: "Back to home",
  },

  notFound: {
    eyebrow: "404 · Page not found",
    title: "This page doesn’t exist.",
    text: "Back to the start, straight to a booking – or give us a call.",
    home: "Back to home",
    book: "Book appointment",
    call: "Call us",
  },
};
