// German UI strings – the source of truth for the Dictionary type.
// Every key here must exist in en.ts (enforced by TypeScript).

export const de = {
  meta: {
    title:
      "Praxisklinik Isarblick – Orthopädie, Dermatologie & Ästhetik in München-Bogenhausen",
    description:
      "Privatpraxis für regenerative Medizin in München-Bogenhausen: Orthopädie, Physiotherapie, Dermatologie, Gynäkologie und Ästhetische Medizin – mit Bildgebung und Labor unter einem Dach.",
    ogTagline: "Privatpraxis · München-Bogenhausen",
    locale: "de_DE",
  },

  a11y: {
    skipToContent: "Zum Inhalt springen",
    homeLink: "Praxisklinik Isarblick – zur Startseite",
    mainNav: "Hauptnavigation",
    mobileNav: "Hauptnavigation mobil",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    menu: "Menü",
    close: "Schließen",
    newTab: "(öffnet in neuem Tab)",
    language: "Sprache",
    switchToOther: "Switch to English",
    call: "Anrufen",
    skipIntro: "Intro überspringen",
  },

  intro: {
    skip: "Überspringen",
    tagline: "Regenerative Medizin. Unter einem Dach.",
  },

  langBanner: {
    text: "View this page in English",
    dismiss: "Dismiss",
  },

  header: {
    nav: {
      complaints: "Beschwerden",
      departments: "Fachbereiche",
      team: "Ärzteteam",
      practice: "Praxis",
      international: "International",
    },
    book: "Termin buchen",
  },

  hero: {
    eyebrow: "Privatpraxis · München-Bogenhausen",
    line1: "Regenerative Medizin.",
    line2: "Unter einem Dach.",
    text: "Orthopädie, Dermatologie, Ästhetik, Gynäkologie und Physio – mit Bildgebung und Labor im Haus, in München-Bogenhausen.",
    book: "Termin buchen",
    findSpecialist: "Passende Fachrichtung finden",
    chipsLead: "Themen:",
    chips: {
      knie: "Knie",
      ruecken: "Rücken",
      schulter: "Schulter",
      haut: "Haut",
      gyne: "Frauengesundheit",
    },
    imageAlt: "Physiotherapeutische Behandlung des oberen Rückens in der Praxisklinik",
  },

  openNow: {
    open: "Jetzt geöffnet · bis {time}",
    closed: "Geschlossen · öffnet {day}{time}",
    days: { mo: "Mo.", tu: "Di.", we: "Mi.", th: "Do.", fr: "Fr.", sa: "Sa.", su: "So." },
  },

  trust: {
    label: "Isarblick auf einen Blick",
    reviews: "Google-Bewertungen",
    ratingSr: "von 5 Sternen – Google-Profil",
    specialties: "6\u00a0Fachbereiche unter einem Dach",
  },

  bodyMap: {
    title: "Zeigen Sie uns, wo es schmerzt.",
    intro:
      "Tippen Sie auf eine Körperregion: häufige Ursachen, die Abklärung in der Praxisklinik und der passende Fachbereich.",
    steps: ["Bereich wählen", "Eine Frage beantworten", "Passende Hilfe sehen"],
    stepsLabel: "So funktioniert es",
    views: { front: "Vorne", back: "Hinten" },
    viewLabel: "Ansicht der Figur",
    legendLabel: "Farben der Fachbereiche",
    allZones: "Alle Bereiche",
    selected: "Ausgewählt",
    search: {
      heading: "Was beschäftigt Sie?",
      label: "Beschwerde oder Körperregion suchen",
      placeholders: [
        "Knieschmerzen beim Treppensteigen…",
        "Schmerzen im unteren Rücken…",
        "Haarausfall…",
        "Hautausschlag…",
      ],
      quickLabel: "Häufige Anliegen",
      hint: "Oder tippen Sie auf den Bereich am Körper",
      resultsLabel: "Vorschläge",
      resultsCount: "{n} Vorschläge – mit den Pfeiltasten wählen, Enter öffnet",
      oneResult: "1 Vorschlag – Enter öffnet",
      noMatch: "Wir haben keinen genauen Treffer gefunden – beschreiben Sie es kurz, wir melden uns.",
      clear: "Eingabe löschen",
    },
    summaryHint: "Ursachen, Abklärung und Behandlung",
    otherAnswer: "andere Antwort",
    diagLabel: "So klären wir es in der Praxisklinik ab",
    therapyLabel: "Mögliche Behandlungen",
    alsoRelevant: "Auch relevant:",
    warningLabel: "Warnhinweis",
    viaDoctolib: "via Doctolib",
    reset: "Auswahl zurücksetzen",
    freeText: {
      option: "Etwas anderes? Beschreiben Sie es",
      label: "Beschreiben Sie Ihre Beschwerden in eigenen Worten",
      placeholder: "z. B. seit zwei Wochen Schmerzen im Knie beim Treppensteigen",
      note: "Ihr Text wird nirgendwohin gesendet – die Auswertung erfolgt nur in Ihrem Browser.",
      submit: "Passende Hilfe finden",
      submitHint: "Enter sendet ab, Shift + Enter macht einen Zeilenumbruch.",
      zoneSuggestion: "Das klingt nach: {zone}",
      showZone: "{zone} anzeigen",
      sameZone:
        "Das passt zu diesem Bereich. Wählen Sie oben die passendste Antwort – oder buchen Sie direkt.",
      notes: {
        headache:
          "Spannungskopfschmerzen gehen oft vom Nacken aus. Bei anderen Kopfschmerzen ist Ihre Hausarztpraxis die richtige erste Anlaufstelle.",
        jaw: "Kiefer- und Schläfenschmerzen hängen oft mit Kaumuskulatur und Nacken zusammen. Bei Zahnschmerzen ist Ihre Zahnarztpraxis die richtige erste Anlaufstelle.",
      },
      regionLabel: "Bereich ohne Punkt auf der Figur",
      regionReview: "Allgemeine Einordnung – ersetzt keine Untersuchung.",
      suggestion: "Das klingt nach einem Fall für {dept}",
      book: "{dept} buchen",
      noMatch: "Wir möchten mehr erfahren: Rufen Sie uns an, wir finden die passende Spezialistin oder den passenden Spezialisten.",
      emergencyTitle: "Das kann ein Notfall sein",
      emergencyText: "Bei Brustschmerz, Atemnot, Lähmungen, Taubheit oder starker Blutung wählen Sie bitte sofort den Notruf\u00a0112.",
      emergencyCall: "112\u00a0anrufen",
    },
  },

  departments: {
    title: "Sechs Fachbereiche, eine Adresse.",
    // Three fact lines right of the heading (no paragraph)
    facts: [
      "Röntgen, Ultraschall und Labor im Haus",
      "6\u00a0Fachbereiche an einer Adresse in München",
      "Online-Termine je Fachbereich über Doctolib",
    ],
  },

  journey: {
    // *word* = the one italic accent word outside the hero
    title: "Von der Diagnose zur Behandlung – oft an einem *Vormittag*.",
    text: "Röntgen, Ultraschall, Wirbelsäulenvermessung und Labor sind im Haus. Befund und Behandlung folgen oft am selben Tag.",
    starsSr: "5 von 5 Sternen",
    source: "Google-Bewertung",
    stepsLabel: "Ihr Besuch in fünf Schritten",
    stepOf: "Schritt {n} von {total}",
    showStep: "Schritt anzeigen",
    trackLabel: "Schritte – horizontal scrollbar",
    reviewsLabel: "Google-Bewertungen",
    translated: "",
    reviewPrev: "Vorherige Bewertung",
    reviewNext: "Nächste Bewertung",
    reviewCounter: "Bewertung {n} von {total}",
  },

  team: {
    title: "Acht Spezialistinnen und Spezialisten.",
    titleDept: "Unser Team {dept}.",
    filterLabel: "Nach Fachbereich filtern",
    filterAll: "Alle",
    shown: "{n} Ärztinnen und Ärzte angezeigt",
    all: "Gesamtes Team",
    trackLabel: "Ärztinnen und Ärzte – horizontal scrollbar",
    prev: "zurück",
    next: "weiter",
    portraitOf: "Porträt von",
    viewProfile: "Profil ansehen",
    profile: {
      portraitOf: "Porträt von",
      focus: "Schwerpunkte",
      career: "Werdegang",
      qualifications: "Qualifikationen",
      memberships: "Mitgliedschaften",
      publications: "Publikationsliste",
      book: "{dept} buchen",
      call: "Anrufen",
      prev: "Vorherige Ärztin / vorheriger Arzt",
      next: "Nächste Ärztin / nächster Arzt",
      close: "Profil schließen",
    },
  },

  // TODO(client): billing wording, costs of a first consultation, visit duration and
  // further languages are unconfirmed – the answers say so instead of inventing figures.
  firstVisit: {
    title: "Ihr erster Besuch.",
    text: "Was Sie vor dem ersten Termin wissen sollten – von der Abrechnung bis zur Anfahrt. Für alles Weitere erreichen Sie unser Team telefonisch.",
    call: "Anrufen",
    label: "Häufige Fragen zum ersten Besuch",
    questions: [
      {
        id: "private",
        question: "Ist die Praxisklinik eine Privatpraxis? Wer übernimmt die Kosten?",
        answer:
          "Ja, die Praxisklinik ist eine Privatpraxis. Wir behandeln Privatversicherte und Selbstzahler; gesetzlich Versicherte können unsere Leistungen als Selbstzahler in Anspruch nehmen.",
      },
      {
        id: "costs",
        question: "Was kostet ein Erstgespräch ungefähr?",
        answer:
          "Unser Team nennt Ihnen die Kosten vorab – rufen Sie uns an. Die Abrechnung erfolgt nach der Gebührenordnung für Ärzte (GOÄ).",
      },
      {
        id: "bring",
        question: "Was sollte ich mitbringen?",
        answer:
          "Ihren Ausweis, die Versichertenkarte oder einen Versicherungsnachweis, bisherige Befunde, vorhandene Bildgebung (z. B. auf CD) und Ihre aktuelle Medikamentenliste.",
      },
      {
        id: "duration",
        question: "Wie lange dauert der erste Besuch?",
        answer:
          "Das hängt vom Fachbereich und Ihrer Fragestellung ab. Unser Team sagt Ihnen bei der Terminvergabe, wie viel Zeit Sie einplanen sollten.",
      },
      {
        id: "languages",
        question: "Welche Sprachen sprechen Sie?",
        answer: "Deutsch und Englisch.",
      },
      {
        id: "directions",
        question: "Parken und Anfahrt",
        answer: "{address}. {parking}. Mit öffentlichen Verkehrsmitteln: {transit}.",
      },
    ],
  },

  visit: {
    title: "Ihr Besuch bei uns in München.",
    text: "Musterstraße\u00a012 in München-Bogenhausen: Tiefgarage im Haus, die U4 ist wenige Minuten entfernt.",
    images: {
      main: "Patientin entspannt während einer Gesichtsbehandlung bei Isarblick Aesthetics",
      arch: "Hautkrebsscreening mit digitaler Fotodokumentation in der Isarblick Dermatologie",
      third: "Teilnehmende eines Gruppenkurses der Isarblick Physiotherapie",
    },
    route: "Route planen",
    routeSr: "(Google Maps, öffnet in neuem Tab)",
    hours: [{ department: "Alle Fachbereiche", hours: "Termine nach Vereinbarung" }],
    parking: "Tiefgarage im Haus",
    transit: "U4 Arabellapark, dann 5 Minuten zu Fuß",
    international: {
      eyebrow: "International Patients",
      title: "Regenerative medicine near Munich.",
      text: "Services, treatments, our medical team and answers to common questions for patients travelling from abroad.",
      cta: "Information in English",
    },
    booking: { title: "Termin buchen" },
    // Schematic map (components/VisitMap.tsx) – TODO(client): verify route details
    map: {
      title: "Anfahrtsskizze: so finden Sie uns in Bogenhausen",
      desc: "Schematische Karte: Die Praxisklinik Isarblick liegt an der Musterstraße 12 in München-Bogenhausen, wenige Gehminuten von der U4-Station Arabellapark. Tiefgarage im Haus.",
      labels: {
        munich: "München",
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
        parking: "Parkhaus",
      },
    },
  },

  footer: {
    departments: "Fachbereiche",
    roc: "Isarblick",
    contact: "Kontakt",
    links: { team: "Ärzteteam", careers: "Karriere", events: "Events", guide: "Ratgeber" },
    contactLinks: { directions: "Anfahrt", international: "International Patients" },
    copyright: "© 2026 Praxisklinik Isarblick · München-Bogenhausen",
    legal: { imprint: "Impressum", privacy: "Datenschutz", press: "Presse" },
    germanNote: "",
  },

  booking: {
    title: "Termin buchen",
    text: "Wählen Sie Ihren Fachbereich – wir leiten Sie direkt zum passenden Kalender.",
    unsure: "Unsicher, welcher Bereich passt? Rufen Sie uns an:",
    physioSub: "Kontakt & Rückruf",
    onlineSub: "Online via Doctolib",
    contact: "Kontakt aufnehmen",
  },

  legal: {
    imprint: "Impressum",
    privacy: "Datenschutz",
    text: "Diese Seite wird derzeit überarbeitet. Die aktuell gültige Fassung finden Sie bis dahin unter",
    home: "Zur Startseite",
  },

  notFound: {
    eyebrow: "404 · Seite nicht gefunden",
    title: "Diese Seite gibt es nicht.",
    text: "Zur Startseite, direkt zum Termin – oder rufen Sie uns an.",
    home: "Zur Startseite",
    book: "Termin buchen",
    call: "Anrufen",
  },
};
