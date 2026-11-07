import type { BodyMapText } from "./bodyMap";

// German body-map copy (source of truth). Every zone and topic asks exactly one
// question with three answers; each answer has its own causes (3) and "why" text.
// Wording follows roc.de / roc-gyne.de and conservative, general medical language –
// no invented treatments, numbers or promises.

export const bodyMapDe: BodyMapText = {
  genericFlag:
    "Plötzliche, sehr starke Schmerzen, Fieber, Taubheit oder Lähmungserscheinungen? Bitte sofort ärztlich abklären lassen – im Notfall 112.",
  causesLabel: "Häufige Ursachen",
  whyLabel: "Warum es schmerzt",
  disclaimer: "Diese Informationen ersetzen keine ärztliche Untersuchung.",
  zones: {
    knie: {
      short: "Knie",
      title: "Knieschmerzen",
      intro:
        "Das Knie trägt bei jedem Schritt ein Vielfaches des Körpergewichts – entsprechend häufig sind Beschwerden, vom Sport bis zum Verschleiß.",
      question: {
        text: "Wann treten die Schmerzen vor allem auf?",
        options: [
          {
            label: "Nach Sport oder einem Verdrehen",
            causes: [
              "Meniskusreizung oder -riss",
              "Bänderverletzung, z. B. am Kreuz- oder Innenband",
              "Prellung oder Knochenmarködem",
            ],
            why: "Drehbewegungen unter Last beanspruchen Meniskus und Bänder besonders stark – schon eine kleine Fehlbewegung kann sie verletzen.",
          },
          {
            label: "Morgens steif, Anlaufschmerz",
            causes: [
              "Arthrose (Knorpelverschleiß)",
              "Reizung der Gelenkschleimhaut",
              "Beginnende Verschleißveränderungen am Meniskus",
            ],
            why: "Abgenutzter Knorpel federt schlechter ab. Nach Ruhephasen braucht das Gelenk Zeit, bis es wieder „in Gang“ kommt.",
          },
          {
            label: "Vorne am Knie, beim Treppensteigen",
            causes: [
              "Reizung hinter der Kniescheibe (femoropatellares Schmerzsyndrom)",
              "Patellaspitzensyndrom („Springerknie“)",
              "Knorpelschaden hinter der Kniescheibe",
            ],
            why: "Beim Treppensteigen und in der Hocke ist der Druck hinter der Kniescheibe am größten.",
          },
        ],
      },
      diag: "Klinische Untersuchung, Ultraschall und Röntgen direkt vor Ort – bei Bedarf ergänzt durch Laborwerte aus dem Haus.",
      therapy: [
        "Regenerative Injektionen (z. B. Eigenblut/PRP, Hydrogel)",
        "Stammzellbasierte Verfahren",
        "Physiotherapie und gezielter Muskelaufbau",
        "Minimalinvasive Verfahren wie die Denervierung",
      ],
      flag: "Das Knie ist stark geschwollen, heiß, gerötet oder nicht mehr belastbar? Bitte zeitnah ärztlich abklären – bei Fieber sofort.",
    },

    ruecken: {
      short: "Unterer Rücken",
      title: "Rückenschmerzen",
      intro:
        "Rückenschmerzen gehören zu den häufigsten Beschwerden überhaupt. Meist sind sie gut behandelbar – entscheidend ist, die Ursache zu kennen.",
      question: {
        text: "Wie würden Sie die Schmerzen beschreiben?",
        options: [
          {
            label: "Dumpf, nach langem Sitzen",
            causes: [
              "Muskuläre Verspannungen und Fehlhaltung",
              "Reizung der kleinen Wirbelgelenke (Facettengelenke)",
              "Schwäche der stabilisierenden Rumpfmuskulatur",
            ],
            why: "Langes Sitzen belastet die Lendenwirbelsäule einseitig – Muskeln ermüden, verhärten und ziehen an ihren Ansätzen.",
          },
          {
            label: "Ausstrahlend ins Bein",
            causes: [
              "Bandscheibenvorwölbung oder -vorfall",
              "Reizung einer Nervenwurzel (Ischias)",
              "Verengung des Wirbelkanals",
            ],
            why: "Drückt Bandscheibengewebe auf eine Nervenwurzel, strahlt der Schmerz entlang des Nervs bis ins Bein aus.",
          },
          {
            label: "Morgens steif, besser mit Bewegung",
            causes: [
              "Verschleiß der kleinen Wirbelgelenke",
              "Muskuläre Steifigkeit",
              "Selten: entzündliche Wirbelsäulenerkrankungen",
            ],
            why: "Wirbelgelenke reagieren nach Ruhe empfindlich; Bewegung verteilt die Gelenkflüssigkeit. Anhaltende Morgensteifigkeit sollte abgeklärt werden.",
          },
        ],
      },
      diag: "Strahlenfreie Wirbelsäulenvermessung, Röntgen und klinische Untersuchung – Labor bei Verdacht auf eine entzündliche Ursache.",
      therapy: [
        "Physiotherapie und Haltungstraining",
        "Gezielte Injektionen an Wirbelgelenken oder Nervenwurzeln",
        "Regenerative und minimalinvasive Verfahren",
      ],
      flag: "Taubheit im Genital- oder Gesäßbereich, Probleme beim Wasserlassen oder Lähmungen im Bein? Das ist ein Notfall – bitte sofort 112.",
    },

    schulter: {
      short: "Schulter",
      title: "Schulterschmerzen",
      intro:
        "Die Schulter ist das beweglichste Gelenk des Körpers – und wird vor allem durch Sehnen und Muskeln stabilisiert. Das macht sie anfällig.",
      question: {
        text: "Was trifft am ehesten zu?",
        options: [
          {
            label: "Schmerz beim Heben über den Kopf",
            causes: [
              "Impingement (Engpass unter dem Schulterdach)",
              "Reizung der Rotatorenmanschette",
              "Schleimbeutelentzündung",
            ],
            why: "Beim Anheben des Arms gleiten Sehnen durch einen engen Raum unter dem Schulterdach – bei Schwellung wird es dort schnell eng.",
          },
          {
            label: "Nach Sturz oder plötzlichem Ruck",
            causes: [
              "Riss der Rotatorenmanschette",
              "Verletzung der Gelenklippe, Instabilität",
              "Prellung oder knöcherne Verletzung",
            ],
            why: "Ein plötzlicher Zug kann Sehnen und Gelenklippe verletzen – eine frühe Abklärung erweitert die Behandlungsmöglichkeiten.",
          },
          {
            label: "Zunehmend steif, auch nachts",
            causes: [
              "Schultersteife (Frozen Shoulder)",
              "Kalkschulter",
              "Arthrose des Schultergelenks",
            ],
            why: "Entzündet sich die Gelenkkapsel, verdickt und schrumpft sie – die Beweglichkeit nimmt schrittweise ab, nachts schmerzt es oft stärker.",
          },
        ],
      },
      diag: "Ultraschall und Röntgen vor Ort sowie klinische Funktionstests der Schultermuskulatur.",
      therapy: [
        "Regenerative Injektionen (z. B. Eigenblut/PRP)",
        "Physiotherapie und gezielte Kräftigung",
        "Minimalinvasive Verfahren",
      ],
      flag: "Schulterschmerz links mit Druck in der Brust, Atemnot oder Übelkeit? Das kann das Herz betreffen – bitte sofort 112.",
    },

    // TODO(client): medical review
    nacken: {
      short: "Nacken",
      title: "Nackenschmerzen",
      intro:
        "Viele Nackenbeschwerden entstehen durch Haltung und Anspannung – manchmal steckt die Halswirbelsäule selbst dahinter.",
      question: {
        text: "Wann treten die Beschwerden vor allem auf?",
        options: [
          {
            label: "Nach langem Sitzen oder Bildschirmarbeit",
            causes: [
              "Muskuläre Verspannungen",
              "Fehlhaltung mit nach vorne geneigtem Kopf",
              "Reizung der kleinen Wirbelgelenke",
            ],
            why: "Wird der Kopf dauerhaft nach vorne geneigt, arbeiten die Nackenmuskeln gegen ein Vielfaches seines Gewichts – sie ermüden und verspannen.",
          },
          {
            label: "Ausstrahlend in Arm oder Hand, mit Kribbeln",
            causes: [
              "Bandscheibenvorwölbung oder -vorfall der Halswirbelsäule",
              "Reizung einer Nervenwurzel",
              "Verengung der Nervenaustrittsöffnungen durch Verschleiß",
            ],
            why: "Drückt Bandscheiben- oder Knochengewebe auf eine Nervenwurzel, strahlt der Schmerz entlang des Nervs in Arm und Hand aus – oft begleitet von Kribbeln.",
          },
          {
            label: "Plötzlich eingeschränkt, „steifer Hals“",
            causes: [
              "Akute Blockierung der kleinen Wirbelgelenke",
              "Muskuläre Schutzspannung",
              "Selten: Verletzung nach Unfall oder Sturz",
            ],
            why: "Eine schnelle Bewegung oder ungünstige Schlafposition kann ein Wirbelgelenk reizen – die Muskulatur spannt reflexartig an und sperrt die Bewegung.",
          },
        ],
      },
      diag: "Klinische Untersuchung, strahlenfreie Wirbelsäulenvermessung und bei Bedarf Röntgen.",
      therapy: [
        "Physiotherapie und Haltungstraining",
        "Gezielte Injektionen",
        "Regenerative Verfahren",
      ],
    },

    // TODO(client): medical review
    oben: {
      short: "Oberer Rücken",
      title: "Schmerzen im oberen Rücken",
      intro:
        "Zwischen den Schulterblättern treffen Haltung, Atmung und Armbewegung zusammen – Fehlbelastungen zeigen sich hier früh.",
      question: {
        text: "Was trifft am ehesten zu?",
        options: [
          {
            label: "Zwischen den Schulterblättern, nach langem Sitzen",
            causes: [
              "Muskuläre Dysbalancen und Haltungsschwächen",
              "Überlastung durch einseitige Tätigkeiten",
              "Verspannung der Schulterblattmuskulatur",
            ],
            why: "Eine nach vorne gerundete Haltung verlängert die Muskeln zwischen den Schulterblättern dauerhaft – sie arbeiten ständig und schmerzen.",
          },
          {
            label: "Stechend beim tiefen Einatmen oder Drehen",
            causes: [
              "Blockierung der Brustwirbelsäule",
              "Reizung der Rippen-Wirbel-Gelenke",
              "Muskulärer Hartspann",
            ],
            why: "Beim Atmen bewegen sich die Rippen an ihren Gelenken zur Wirbelsäule – ist eines blockiert, schmerzt jeder tiefe Atemzug.",
          },
          {
            label: "Dauerhaft, auch in Ruhe oder nachts",
            causes: [
              "Verschleißveränderungen der Brustwirbelsäule",
              "Selten: Wirbelkörperveränderungen, z. B. bei Osteoporose",
              "Beschwerden mit Ursprung in inneren Organen",
            ],
            why: "Anhaltende Schmerzen, die sich nicht durch Bewegung oder Haltung beeinflussen lassen, sollten strukturiert abgeklärt werden – auch über die Wirbelsäule hinaus.",
          },
        ],
      },
      diag: "Haltungs- und Bewegungsanalyse, strahlenfreie Wirbelsäulenvermessung.",
      therapy: [
        "Physiotherapie und Mobilisation",
        "Gezieltes Kräftigungstraining, auch in Gruppenkursen",
        "Orthopädische Abklärung bei anhaltenden Beschwerden",
      ],
      flag: "Plötzlicher Brustschmerz, Atemnot oder Ausstrahlung in Arm oder Kiefer? Das kann das Herz betreffen – bitte sofort 112.",
    },

    // TODO(client): medical review
    ellenbogen: {
      short: "Ellenbogen",
      title: "Ellenbogenschmerzen",
      intro:
        "Ellenbogenschmerzen entstehen meist an den Sehnenansätzen – nicht nur beim Tennis, sondern auch bei Maus- und Handwerksarbeit.",
      question: {
        text: "Wo schmerzt es vor allem?",
        options: [
          {
            label: "Außen, beim Greifen oder Heben",
            causes: [
              "Tennisellenbogen (Reizung der Sehnenansätze außen)",
              "Überlastung der Unterarmstrecker",
              "Reizung der Gelenkkapsel",
            ],
            why: "Wiederholte Greif- und Drehbewegungen belasten die Sehnenansätze am Knochen – kleine Überlastungen summieren sich.",
          },
          {
            label: "Innen, beim Beugen oder Tragen",
            causes: [
              "Golferellenbogen (Reizung der Sehnenansätze innen)",
              "Überlastung der Unterarmbeuger",
              "Reizung des Ellennervs (Kribbeln im kleinen Finger)",
            ],
            why: "Die Beugemuskulatur des Unterarms setzt innen am Ellenbogen an – Tragen und kraftvolles Beugen reizen diesen Ansatz.",
          },
          {
            label: "Hinten, geschwollen oder nach Aufstützen",
            causes: [
              "Schleimbeutelentzündung an der Ellenbogenspitze",
              "Reizung des Trizepsansatzes",
              "Prellung nach Sturz oder Stoß",
            ],
            why: "Der Schleimbeutel an der Ellenbogenspitze polstert die Haut über dem Knochen – Druck oder Stoß reizen ihn, und er füllt sich mit Flüssigkeit.",
          },
        ],
      },
      diag: "Klinische Untersuchung und Ultraschall der Sehnenansätze vor Ort.",
      therapy: [
        "Regenerative Injektionen (z. B. Eigenblut/PRP)",
        "Physiotherapie und exzentrisches Training",
        "Entlastung und Bandagen",
      ],
      flag: "Der Ellenbogen ist stark geschwollen, heiß und gerötet oder Sie haben Fieber? Bitte zeitnah ärztlich abklären lassen.",
    },

    // TODO(client): medical review
    hand: {
      short: "Hand",
      title: "Hand & Handgelenk",
      intro:
        "In Hand und Handgelenk verlaufen Sehnen und Nerven auf engstem Raum – schon kleine Schwellungen machen sich bemerkbar.",
      question: {
        text: "Welche Beschwerden stehen im Vordergrund?",
        options: [
          {
            label: "Kribbeln oder eingeschlafene Finger, besonders nachts",
            causes: [
              "Karpaltunnelsyndrom",
              "Reizung des Ellennervs",
              "Schwellung der Sehnenscheiden mit Druck auf den Nerv",
            ],
            why: "Schwillt Gewebe im engen Karpaltunnel an, drückt es auf den Mittelnerv – typisch sind nächtliches Kribbeln und Taubheit.",
          },
          {
            label: "Schmerz beim Greifen, Daumen oder Finger steif",
            causes: [
              "Arthrose der Finger- oder Daumensattelgelenke",
              "Sehnenscheidenentzündung",
              "Schnappfinger (Verengung des Ringbands)",
            ],
            why: "Daumen- und Fingergelenke werden bei jedem Griff belastet – abgenutzter Knorpel und gereizte Sehnen machen sich früh bemerkbar.",
          },
          {
            label: "Nach Sturz oder Überlastung, Handgelenk geschwollen",
            causes: [
              "Verstauchung oder Bandverletzung des Handgelenks",
              "Prellung oder knöcherne Verletzung",
              "Überlastungsreizung der Sehnen am Handgelenk",
            ],
            why: "Bei einem Sturz auf die Hand fängt das Handgelenk die gesamte Kraft ab – Bänder und die kleinen Handwurzelknochen sind dabei besonders gefährdet.",
          },
        ],
      },
      diag: "Klinische Untersuchung, Ultraschall und Röntgen vor Ort.",
      therapy: [
        "Gezielte Injektionen",
        "Schienen und Physiotherapie",
        "Regenerative Verfahren bei Arthrose",
      ],
      flag: "Nach einem Sturz stark geschwollen, fehlgestellt oder nicht mehr belastbar? Bitte zeitnah ärztlich abklären lassen.",
    },

    // TODO(client): medical review
    huefte: {
      short: "Hüfte",
      title: "Hüftschmerzen",
      intro:
        "Hüftschmerzen zeigen sich oft in der Leiste oder an der Außenseite – und werden manchmal mit Rückenschmerzen verwechselt.",
      question: {
        text: "Wo spüren Sie den Schmerz vor allem?",
        options: [
          {
            label: "In der Leiste, beim Anlaufen oder Treppensteigen",
            causes: [
              "Hüftarthrose (Knorpelverschleiß)",
              "Engpass im Hüftgelenk (Impingement)",
              "Reizung der Gelenklippe (Labrum)",
            ],
            why: "Die Hüfte trägt beim Gehen ein Mehrfaches des Körpergewichts. Leistenschmerz beim Anlaufen ist oft ein frühes Arthrose-Zeichen.",
          },
          {
            label: "Außen an der Hüfte, beim Liegen auf der Seite",
            causes: [
              "Schleimbeutelentzündung an der Hüftaußenseite",
              "Sehnenreizung der Gesäßmuskulatur",
              "Reizung des seitlichen Sehnenbands (Tractus)",
            ],
            why: "Über dem großen Rollhügel laufen Sehnen und Schleimbeutel auf engem Raum – Druck beim Liegen und einseitige Belastung reizen sie.",
          },
          {
            label: "Tief im Gesäß, ausstrahlend ins Bein",
            causes: [
              "Reizung des Kreuz-Darmbein-Gelenks",
              "Beschwerden mit Ursprung in der Lendenwirbelsäule",
              "Verspannung der tiefen Gesäßmuskulatur",
            ],
            why: "Hüfte, Kreuz-Darmbein-Gelenk und Lendenwirbelsäule liegen eng beieinander – ihre Beschwerden ähneln sich und werden leicht verwechselt.",
          },
        ],
      },
      diag: "Klinische Untersuchung, Röntgen und Ultraschall vor Ort.",
      therapy: [
        "Regenerative Injektionen",
        "Physiotherapie und Muskelaufbau",
        "Minimalinvasive Verfahren",
      ],
    },

    // TODO(client): medical review
    fuss: {
      short: "Fuß",
      title: "Sprunggelenk & Fuß",
      intro:
        "Füße und Sprunggelenke tragen uns täglich tausende Schritte – Verletzungen und Fehlbelastungen sind entsprechend häufig.",
      question: {
        text: "Wann treten die Beschwerden auf?",
        options: [
          {
            label: "Nach dem Umknicken",
            causes: [
              "Bandverletzung des Sprunggelenks",
              "Prellung oder knöcherne Verletzung",
              "Reizung der Gelenkkapsel",
            ],
            why: "Nach einem Umknicken heilen Bänder oft nicht vollständig aus – das Gelenk bleibt instabil und knickt leichter erneut um.",
          },
          {
            label: "Beim Abrollen oder unter dem Fuß",
            causes: [
              "Plantarfasziitis (Fersensporn)",
              "Überlastung des Fußgewölbes bei Fehlstellung, z. B. Knick-Senkfuß",
              "Überlastung der Mittelfußknochen",
            ],
            why: "Beim Abrollen spannt sich die Sehnenplatte unter dem Fuß wie eine Bogensehne – bei Fehlstellung oder Überlastung reizt sich ihr Ansatz.",
          },
          {
            label: "Morgens steif, Schmerz im Sprunggelenk bei Belastung",
            causes: [
              "Arthrose des Sprunggelenks",
              "Folgen früherer Verletzungen",
              "Reizung der Gelenkschleimhaut",
            ],
            why: "Abgenutzter Knorpel federt schlechter ab – nach Ruhephasen braucht das Gelenk Zeit, bis es wieder „in Gang“ kommt.",
          },
        ],
      },
      diag: "Klinische Untersuchung, Ultraschall und Röntgen vor Ort.",
      therapy: [
        "Regenerative Injektionen",
        "Physiotherapie und Stabilitätstraining",
        "Einlagen- und Belastungsberatung",
      ],
      flag: "Der Fuß ist nach einer Verletzung nicht mehr belastbar, deutlich fehlgestellt oder taub? Bitte zeitnah ärztlich abklären lassen.",
    },

    // TODO(client): medical review
    ferse: {
      short: "Ferse",
      title: "Ferse & Achillessehne",
      intro:
        "Schmerzen an Ferse und Achillessehne treten häufig bei Läufern auf – aber auch nach Schuhwechsel oder Gewichtszunahme.",
      question: {
        text: "Wo genau schmerzt es?",
        options: [
          {
            label: "Unter der Ferse, besonders bei den ersten Schritten",
            causes: [
              "Fersensporn (Plantarfasziitis)",
              "Reizung des Fersenfettpolsters",
              "Überlastung durch Schuhwechsel oder Gewichtszunahme",
            ],
            why: "Die Sehnenplatte unter dem Fuß verkürzt sich über Nacht – die ersten Schritte am Morgen ziehen an ihrem gereizten Ansatz.",
          },
          {
            label: "Hinten an der Achillessehne, beim Laufen",
            causes: [
              "Reizung der Achillessehne",
              "Überlastung bei zu schneller Trainingssteigerung",
              "Verkürzte Wadenmuskulatur",
            ],
            why: "Die Achillessehne überträgt beim Laufen Kräfte vom Mehrfachen des Körpergewichts – steigt die Belastung zu schnell, reagiert sie gereizt.",
          },
          {
            label: "Am Sehnenansatz, geschwollen und druckempfindlich",
            causes: [
              "Schleimbeutelreizung am Sehnenansatz",
              "Knöcherner Vorsprung am Fersenbein (Haglund-Ferse)",
              "Reizung durch Druck der Schuhferse",
            ],
            why: "Zwischen Achillessehne und Fersenbein liegt ein Schleimbeutel – reibt ein harter Schuhrand oder ein knöcherner Vorsprung daran, entzündet er sich.",
          },
        ],
      },
      diag: "Ultraschall der Sehne und klinische Untersuchung vor Ort.",
      therapy: [
        "Regenerative Injektionen (z. B. Eigenblut/PRP)",
        "Exzentrisches Training in der Physiotherapie",
        "Belastungssteuerung und Einlagen",
      ],
      flag: "Plötzlicher, peitschenschlagartiger Schmerz an Wade oder Ferse und der Zehenstand gelingt nicht mehr? Das kann ein Sehnenriss sein – bitte sofort ärztlich abklären lassen.",
    },

    // TODO(client): medical review
    gesicht: {
      short: "Gesicht",
      title: "Gesicht & Haut",
      causesLabel: "Häufige Anliegen",
      intro:
        "Ob medizinische Hautfrage oder ästhetischer Wunsch: Gesicht und Haut betreuen wir interdisziplinär zwischen Dermatologie und Ästhetik.",
      question: {
        text: "Was beschäftigt Sie am meisten?",
        options: [
          {
            label: "Ein Muttermal oder eine Hautveränderung",
            causes: [
              "Neue oder veränderte Muttermale",
              "Sonnenschäden der Haut, z. B. aktinische Keratosen",
              "Gut- oder bösartige Hauttumoren",
            ],
            why: "Das Gesicht ist der Sonne am stärksten ausgesetzt – Hautveränderungen entstehen hier besonders häufig und sollten dermatologisch beurteilt werden.",
          },
          {
            label: "Akne, Rötungen oder Pigmentflecken",
            causes: [
              "Akne und Unreinheiten",
              "Rosazea und Couperose",
              "Pigmentflecken und ungleichmäßiger Teint",
            ],
            why: "Talgdrüsen, feine Gefäße und Pigmentzellen reagieren empfindlich auf Hormone, UV-Licht und Reize – gezielte Behandlungen können das Hautbild verbessern.",
          },
          {
            label: "Falten, Volumenverlust oder müde wirkende Haut",
            causes: [
              "Hautalterung und Falten",
              "Volumenverlust und erschlaffte Konturen",
              "Verlust an Spannkraft und Frische",
            ],
            why: "Mit den Jahren nehmen Kollagen und Elastizität der Haut ab – UV-Licht und Umwelteinflüsse beschleunigen diesen Prozess.",
          },
        ],
      },
      diag: "Dermatologische Untersuchung inklusive Auflichtmikroskopie; ausführliche ästhetische Beratung.",
      therapy: [
        "Medizinische Hautbehandlungen",
        "Ästhetische Behandlungen und Chirurgie",
        "Hautkrebsvorsorge",
      ],
      flag: "Ein Muttermal wächst, blutet oder verändert Farbe oder Form? Bitte zeitnah dermatologisch abklären lassen.",
    },

    // TODO(client): medical review
    gyne: {
      short: "Unterleib",
      chipLabel: "Frauengesundheit",
      title: "Frauengesundheit",
      causesLabel: "Häufige Anlässe",
      intro:
        "Beschwerden im Unterleib, Zyklusfragen oder Vorsorge – vertrauensvolle Begleitung in jeder Lebensphase.",
      question: {
        text: "Was führt Sie zu uns?",
        options: [
          {
            label: "Schmerzen oder Beschwerden im Unterleib",
            causes: [
              "Zyklusbedingte Schmerzen",
              "Entzündungen oder Infektionen",
              "Zysten oder Myome",
            ],
            why: "Unterleibsbeschwerden haben viele mögliche Ursachen – Zyklus, Hormone und die Organe des kleinen Beckens. Mit Untersuchung und Ultraschall lassen sie sich meist gut einordnen.",
          },
          {
            label: "Zyklus- oder Blutungsveränderungen",
            causes: [
              "Hormonelle Schwankungen",
              "Veränderungen der Gebärmutter oder Eierstöcke",
              "Zyklusveränderungen in der Perimenopause",
            ],
            why: "Viele Beschwerden folgen dem hormonellen Rhythmus – deshalb lohnt der Blick auf Zyklus und Lebensphase.",
          },
          {
            label: "Vorsorge, Verhütung oder Kinderwunsch",
            causes: [
              "Vorsorge- und Kontrolluntersuchungen",
              "Beratung zu Verhütung",
              "Kinderwunschberatung",
            ],
            why: "Vertrauensvolle Begleitung in jeder Lebensphase – mit Zeit für Ihre Fragen und medizinischen Entscheidungen auf Augenhöhe.",
          },
        ],
      },
      diag: "Gynäkologische Untersuchung, Ultraschall und Laborwerte aus dem Haus.",
      therapy: [
        "Individuelle Diagnostik und Beratung",
        "Hormonelle und nicht-hormonelle Therapien",
        "Vorsorge",
      ],
      flag: "Plötzliche, starke Unterbauchschmerzen, starke Blutungen oder Fieber? Bitte sofort ärztlich abklären – im Notfall 112.",
    },

    // TODO(client): medical review
    haut: {
      short: "Haut",
      title: "Haut & Allergien",
      causesLabel: "Häufige Anliegen",
      intro:
        "Hautgesundheit auf höchstem Niveau – von chronischen Hauterkrankungen über Allergien bis zur Vorsorge.",
      question: {
        text: "Was trifft am ehesten zu?",
        options: [
          {
            label: "Juckende, trockene oder gerötete Haut",
            causes: ["Ekzeme und Neurodermitis", "Schuppenflechte (Psoriasis)", "Kontaktallergien"],
            why: "Die Haut reagiert auf innere und äußere Einflüsse – oft zeigen sich Allergien oder Entzündungen zuerst hier.",
          },
          {
            label: "Allergische Reaktion oder Unverträglichkeit",
            causes: [
              "Heuschnupfen und Pollenallergie",
              "Nahrungsmittel- oder Medikamentenunverträglichkeiten",
              "Nesselsucht (Urtikaria)",
            ],
            why: "Bei einer Allergie reagiert das Immunsystem auf an sich harmlose Stoffe – ein strukturierter Allergietest hilft, den Auslöser zu finden.",
          },
          {
            label: "Muttermale oder eine neue Hautveränderung",
            causes: [
              "Muttermale und Hautveränderungen",
              "Sonnenschäden der Haut",
              "Gut- oder bösartige Hauttumoren",
            ],
            why: "Neue oder veränderte Hautstellen sollten dermatologisch beurteilt werden – mit der Auflichtmikroskopie lässt sich meist schnell klären, was dahintersteckt.",
          },
        ],
      },
      diag: "Dermatologische Untersuchung, Auflichtmikroskopie und Allergietests.",
      therapy: [
        "Leitliniengerechte medizinische Therapie",
        "Allergologische Abklärung",
        "Hautkrebsvorsorge",
      ],
      flag: "Plötzliche Schwellung von Gesicht, Lippen oder Zunge oder Atemnot nach einem Kontakt? Das ist ein Notfall – bitte sofort 112.",
    },

    // TODO(client): medical review
    aesthetik: {
      short: "Ästhetik",
      title: "Ästhetik & Prävention",
      causesLabel: "Häufige Anliegen",
      whyLabel: "Gut zu wissen",
      intro:
        "Moderne ästhetische Medizin für ein frisches, natürliches Ergebnis – immer auf Basis einer ausführlichen ärztlichen Beratung.",
      question: {
        text: "Was möchten Sie verbessern?",
        options: [
          {
            label: "Falten und Volumenverlust",
            causes: [
              "Mimikfalten, z. B. Stirn, Zornesfalte oder Krähenfüße",
              "Volumenverlust an Wangen oder Lippen",
              "Erschlaffte Konturen",
            ],
            why: "Minimalinvasive Behandlungen können Falten glätten und Volumen ersetzen – das Ziel ist ein frisches, natürliches Ergebnis.",
          },
          {
            label: "Ein frischeres, gleichmäßigeres Hautbild",
            causes: [
              "Müde wirkende oder trockene Haut",
              "Unreinheiten und Pigmentflecken",
              "Feine Linien",
            ],
            why: "Regenerative Hautbehandlungen unterstützen Feuchtigkeit und Kollagenbildung – das Hautbild wirkt frischer und ebenmäßiger.",
          },
          {
            label: "Ein ästhetisch-chirurgischer Eingriff",
            causes: ["Schlupflider", "Fettpolster und Körperkonturen", "Haut- und Weichteilveränderungen"],
            why: "Jede Behandlung beginnt mit einem persönlichen Gespräch und einem individuellen Plan – ohne Zeitdruck.",
          },
        ],
      },
      diag: "Ausführliche Beratung durch eine Fachärztin für Plastische und Ästhetische Chirurgie.",
      therapy: [
        "Minimalinvasive ästhetische Behandlungen",
        "Regenerative Hautbehandlungen",
        "Ästhetische Chirurgie",
      ],
    },

    // TODO(client): medical review
    labor: {
      short: "Check-up",
      chipLabel: "Check-up & Labor",
      title: "Check-up & Labor",
      causesLabel: "Typische Anlässe",
      whyLabel: "Gut zu wissen",
      intro:
        "Viele Beschwerden haben eine messbare Ursache. Unser hauseigenes Labor liefert Werte, die direkt in Ihre Behandlung einfließen.",
      question: {
        text: "Was ist der Grund für Ihren Check-up?",
        options: [
          {
            label: "Allgemeiner Gesundheits-Check",
            causes: [
              "Blutbild, Leber- und Nierenwerte",
              "Blutzucker und Blutfette",
              "Vitamin- und Mineralstoffstatus",
            ],
            why: "Die Blutentnahme erfolgt direkt vor Ort – Ergebnisse besprechen wir im Zusammenhang mit Ihren Beschwerden.",
          },
          {
            label: "Müdigkeit, Erschöpfung oder Leistungsknick",
            causes: [
              "Vitamin-D-, B12- oder Eisenmangel",
              "Schilddrüsenwerte",
              "Entzündungs- und Stoffwechselwerte",
            ],
            why: "Viele Beschwerden haben eine messbare Ursache – ein Mangel oder eine Schilddrüsenveränderung zeigt sich oft zuerst im Blutbild.",
          },
          {
            label: "Begleitend zu einer Behandlung in der Praxisklinik",
            causes: [
              "Entzündungsstatus vor einer regenerativen Therapie",
              "Hormonwerte zur gynäkologischen Abklärung",
              "Verlaufskontrollen unter Therapie",
            ],
            why: "Laborwerte aus dem Haus fließen direkt in Ihre Behandlung ein – ohne externe Wege.",
          },
        ],
      },
      diag: "Blutentnahme und Auswertung in der Praxisklinik Labor.",
      therapy: ["Gezielte Supplementierung", "Abgestimmte Therapieplanung", "Verlaufskontrollen"],
    },

    // ---- Revision 2 – Inhalte nach roc-gyne.de / roc.de formuliert --------------

    // TODO(client): medical review
    brust: {
      short: "Brust",
      title: "Brustgesundheit & Vorsorge",
      causesLabel: "Häufige Anlässe",
      intro:
        "Die Brust gehört zur gynäkologischen Vorsorge: Tastuntersuchung und Brustultraschall helfen, Veränderungen früh zu erkennen – sorgfältig und verständlich erklärt.",
      question: {
        text: "Was führt Sie zu uns?",
        options: [
          {
            label: "Vorsorge und Kontrolle",
            causes: [
              "Regelmäßige Krebsvorsorge der Brust",
              "Tastuntersuchung und Brustultraschall",
              "Beratung bei familiärer Vorbelastung",
            ],
            why: "Viele Veränderungen der Brust sind gutartig. Regelmäßige Vorsorge erkennt Auffälligkeiten früh – und schafft Sicherheit.",
          },
          {
            label: "Ich habe eine Veränderung bemerkt",
            urgent: true,
            causes: [
              "Tastbare Knoten oder Verhärtungen",
              "Veränderungen der Haut oder Brustwarze, Ausfluss",
              "Neue, einseitige Schmerzen",
            ],
            why: "Eine bemerkte Veränderung sollte zeitnah untersucht werden – meist ist sie gutartig, und eine frühe Abklärung ist entscheidend, wenn doch eine Behandlung nötig wird.",
          },
          {
            label: "Spannungsgefühl oder Schmerzen abhängig vom Zyklus",
            causes: [
              "Zyklusabhängiges Spannungsgefühl (Mastodynie)",
              "Hormonelle Veränderungen",
              "Gutartige Veränderungen des Brustdrüsengewebes",
            ],
            why: "Das Brustgewebe reagiert auf den hormonellen Rhythmus – Spannungsgefühle vor der Periode sind häufig und meist harmlos, sollten aber abgeklärt werden.",
          },
        ],
      },
      diag: "Tastuntersuchung und Brustultraschall in der Praxis; bei Bedarf strukturierte Weiterleitung an ein zertifiziertes Brustzentrum.",
      therapy: [
        "Regelmäßige Krebsvorsorge mit Brustultraschall",
        "Abklärung und Begleitung bei auffälligen Befunden",
        "Strukturierte Nachsorge bei gynäkologischen Krebserkrankungen",
      ],
      flag: "Neuer Knoten, Veränderungen der Haut oder Brustwarze oder Ausfluss? Bitte zeitnah untersuchen lassen.",
    },

    // TODO(client): medical review
    wechseljahre: {
      short: "Wechseljahre",
      chipLabel: "Wechseljahre & Hormone",
      title: "Wechseljahre & Hormone",
      causesLabel: "Häufige Anlässe",
      intro:
        "Die Wechseljahre verändern Hormone, Schlaf, Haut, Gelenke, Energie und Sexualität. Viele Frauen spüren die ersten Zeichen früher als erwartet – wir begleiten Sie in Perimenopause und Postmenopause.",
      question: {
        text: "Welche Beschwerden stehen im Vordergrund?",
        options: [
          {
            label: "Hitzewallungen, Schlafprobleme, innere Unruhe",
            causes: [
              "Hitzewallungen und Schweißausbrüche",
              "Schlafstörungen",
              "Stimmungsschwankungen und innere Unruhe",
            ],
            why: "Hinter vielen Beschwerden steckt die hormonelle Umstellung. Werden sie richtig eingeordnet, lassen sie sich oft gut lindern.",
          },
          {
            label: "Gewicht, Gelenke, Haut oder Haare verändern sich",
            causes: [
              "Gewichtszunahme",
              "Gelenk- und Muskelbeschwerden",
              "Trockene Haut und Haarausfall",
            ],
            why: "Östrogen wirkt auf Stoffwechsel, Bindegewebe und Haut – sinkt der Spiegel, verändern sich Gewicht, Gelenke und Hautbild.",
          },
          {
            label: "Der Zyklus verändert sich, erste Anzeichen",
            causes: [
              "Zyklusveränderungen in der Perimenopause",
              "Unregelmäßige oder stärkere Blutungen",
              "Erste Symptome in jüngerem Alter",
            ],
            why: "Viele Frauen spüren die ersten Zeichen früher als erwartet – Hormonwerte aus dem hauseigenen Labor helfen, die Phase einzuordnen.",
          },
        ],
      },
      diag: "Ausführliches Beratungsgespräch, gynäkologische Untersuchung und Hormonwerte aus dem hauseigenen Labor.",
      therapy: [
        "Beratung zu modernen Optionen zur Linderung typischer Beschwerden",
        "Therapie zum Beispiel mit bioidentischen Hormonen",
        "Langfristige Gesundheitsvorsorge in dieser Lebensphase",
      ],
    },

    // TODO(client): medical review
    beckenboden: {
      short: "Beckenboden",
      chipLabel: "Beckenboden (EMSELLA®)",
      title: "Beckenboden & Inkontinenz",
      causesLabel: "Häufige Anlässe",
      intro:
        "Beckenbodenschwäche, Senkungsbeschwerden oder Inkontinenz nehmen wir ernst – von konservativen Maßnahmen bis zu spezialisierten Therapien wie dem EMSELLA®-Stuhl.",
      question: {
        text: "Was trifft am ehesten zu?",
        options: [
          {
            label: "Urinverlust beim Husten, Lachen oder Sport",
            causes: [
              "Belastungsinkontinenz",
              "Beckenbodenschwäche nach Schwangerschaft und Geburt",
              "Hormonell bedingte Gewebeschwäche",
            ],
            why: "Beim Husten oder Springen steigt der Druck im Bauchraum – ist der Beckenboden geschwächt, hält er dem Druck nicht stand.",
          },
          {
            label: "Plötzlicher, starker Harndrang",
            causes: [
              "Dranginkontinenz (überaktive Blase)",
              "Reizblase",
              "Mischformen aus Belastungs- und Dranginkontinenz",
            ],
            why: "Bei einer überaktiven Blase meldet sich der Harndrang plötzlich und stark – eine gezielte Diagnostik unterscheidet die Formen, denn sie werden unterschiedlich behandelt.",
          },
          {
            label: "Druck- oder Fremdkörpergefühl, Vorbeugen",
            causes: [
              "Senkungsbeschwerden",
              "Schwacher Beckenboden ohne Inkontinenz",
              "Prävention und Verbesserung der Beckenbodenkraft",
            ],
            why: "Der EMSELLA®-Stuhl stimuliert die Beckenbodenmuskulatur mit hochfokussierten elektromagnetischen Impulsen – vollständig bekleidet, ohne aktives Training.",
          },
        ],
      },
      diag: "Gynäkologische Untersuchung und Beratung; Diagnostik bei Beckenbodenschwäche, Senkungsbeschwerden oder Inkontinenz.",
      therapy: [
        "Beckenbodentraining mit dem Original EMSELLA®-Stuhl (nicht-invasiv, schmerzfrei, ca. 30 Minuten)",
        "Konservative Maßnahmen und Physiotherapie",
        "Vaginale Lasertherapie bei Stress- und Dranginkontinenz",
      ],
    },

    // TODO(client): medical review
    vorsorge: {
      short: "Vorsorge",
      chipLabel: "Vorsorge & Ultraschall",
      title: "Gynäkologische Vorsorge",
      causesLabel: "Typische Anlässe",
      whyLabel: "Gut zu wissen",
      intro:
        "Umfassende Vorsorgeuntersuchungen zur Erhaltung Ihrer Gesundheit und Früherkennung von Erkrankungen – sorgfältig, verständlich und auf dem neuesten Stand der Medizin.",
      question: {
        text: "Was ist der Anlass für Ihren Besuch?",
        options: [
          {
            label: "Jährliche Krebsvorsorge",
            causes: [
              "Reguläre Krebsvorsorge",
              "Abstrich und gynäkologische Untersuchung",
              "Vaginaler Ultraschall und Brustultraschall",
            ],
            why: "Wir nehmen uns Zeit, beraten transparent und treffen medizinische Entscheidungen gemeinsam mit Ihnen – diskret und auf Augenhöhe.",
          },
          {
            label: "Verhütung oder Kinderwunsch",
            causes: [
              "Beratung zu Verhütungsmethoden",
              "Kinderwunschberatung",
              "Hormonelle Abklärung",
            ],
            why: "Die passende Verhütung und die Begleitung beim Kinderwunsch hängen von Lebensphase, Gesundheit und Wünschen ab – wir beraten individuell.",
          },
          {
            label: "Impfungen und allgemeine Gesundheitsberatung",
            causes: [
              "HPV-Impfung",
              "Impfberatung speziell für Frauen",
              "Allgemeine Gesundheitsvorsorge und Laborwerte",
            ],
            why: "Impfungen wie die HPV-Impfung sind Teil der gynäkologischen Vorsorge – wir prüfen Ihren Impfstatus und beraten Sie.",
          },
        ],
      },
      diag: "Gynäkologische Untersuchung, vaginaler Ultraschall auf Expertenniveau, Brustultraschall und Laborwerte aus dem Haus.",
      therapy: [
        "Individuelle Beratung und Vorsorgeplanung",
        "Empfängnisverhütung und Kinderwunschberatung",
        "Impfberatung und -durchführung speziell für Frauen",
      ],
    },

    // TODO(client): medical review
    intimlaser: {
      short: "Intimgesundheit",
      chipLabel: "Vaginale Lasertherapie",
      title: "Intimgesundheit & Lasertherapie",
      causesLabel: "Häufige Anlässe",
      intro:
        "Die Lasertherapie mit dem Juliet®-Laser ist eine schonende, nicht-operative und nicht-hormonelle Möglichkeit zur Verbesserung vieler Beschwerden im Intimbereich.",
      question: {
        text: "Welche Beschwerden stehen im Vordergrund?",
        options: [
          {
            label: "Trockenheit oder Beschwerden in den Wechseljahren",
            causes: [
              "Vaginale Trockenheit",
              "Brennen, Juckreiz oder Schmerzen beim Geschlechtsverkehr",
              "Hormonell bedingte Gewebeveränderungen",
            ],
            why: "Hormonelle Veränderungen verändern das Gewebe im Intimbereich – regenerative Verfahren können Befeuchtung und Elastizität verbessern.",
          },
          {
            label: "Urinverlust bei Belastung oder Harndrang",
            causes: [
              "Stress- oder Dranginkontinenz",
              "Beckenbodenschwäche",
              "Kombination mit Senkungsbeschwerden",
            ],
            why: "Die vaginale Lasertherapie kann das Gewebe im Bereich der Harnröhre straffen – eine schonende, nicht-hormonelle Option bei Stress- und Dranginkontinenz.",
          },
          {
            label: "Elastizitätsverlust oder wiederkehrende Infektionen",
            causes: [
              "Elastizitätsverlust nach Entbindungen",
              "Wiederkehrende Scheideninfektionen",
              "Narben nach Geburtsverletzungen",
            ],
            why: "Der Juliet®-Laser regt die Schleimhaut zur Regeneration an – das Gewebe wird besser durchblutet und widerstandsfähiger.",
          },
        ],
      },
      diag: "Vertrauensvolles Beratungsgespräch und gynäkologische Untersuchung – diskret und ohne Zeitdruck.",
      therapy: [
        "Vaginale Lasertherapie (Er:YAG, Juliet®-Laser)",
        "Regenerative Intimtherapie, z. B. mit Hyaluronsäure oder PRP",
        "Beratung zu funktioneller und ästhetischer Intimchirurgie",
      ],
    },

    // TODO(client): medical review
    hautkrebs: {
      short: "Hautkrebsvorsorge",
      chipLabel: "Hautkrebsscreening",
      title: "Hautkrebsscreening",
      causesLabel: "Typische Anlässe",
      whyLabel: "Gut zu wissen",
      intro:
        "Hautkrebs ist heilbar, wenn er früh genug erkannt wird. Wir untersuchen Ihre Haut dermatoskopisch und dokumentieren Muttermale digital.",
      question: {
        text: "Was ist der Anlass?",
        options: [
          {
            label: "Regelmäßige Vorsorge",
            causes: [
              "Hautkrebsscreening ohne akuten Anlass",
              "Viele Muttermale oder heller Hauttyp",
              "Hohe UV-Belastung in Beruf oder Freizeit",
            ],
            why: "Hautkrebs ist heilbar, wenn er früh genug erkannt wird – regelmäßige Vorsorge findet Veränderungen, bevor sie Beschwerden machen.",
          },
          {
            label: "Ein Muttermal hat sich verändert",
            urgent: true,
            causes: [
              "Neue, wachsende oder veränderte Muttermale",
              "Juckende, blutende oder nässende Hautstellen",
              "Asymmetrische oder mehrfarbige Male",
            ],
            why: "Veränderungen in Größe, Form oder Farbe sind die wichtigsten Warnzeichen – eine dermatoskopische Untersuchung klärt sie zeitnah.",
          },
          {
            label: "Kontrolle nach einer früheren Hautveränderung",
            causes: [
              "Nachsorge nach entferntem Hautkrebs",
              "Verlaufskontrolle auffälliger Muttermale",
              "Dokumentation mit FotoFinder-Technologie",
            ],
            why: "Nach einer früheren Hautveränderung ist das Risiko für weitere erhöht – strukturierte Kontrollen mit Fotodokumentation machen Veränderungen sichtbar.",
          },
        ],
      },
      diag: "Ganzkörperuntersuchung mit FotoFinder-Technologie, Auflichtmikroskopie und bei Bedarf elektrischer Impedanzspektroskopie (NeviSense).",
      therapy: [
        "Verlaufskontrolle auffälliger Muttermale",
        "Schonende Entfernung gut- und bösartiger Hautveränderungen im praxiseigenen OP",
        "Histologische Abklärung",
      ],
      flag: "Ein Muttermal wächst, blutet oder verändert Farbe oder Form? Bitte zeitnah dermatologisch abklären lassen.",
    },

    // TODO(client): medical review
    dermalaser: {
      short: "Laserbehandlung",
      chipLabel: "Laserbehandlungen",
      title: "Medizinische & ästhetische Laserbehandlungen",
      causesLabel: "Häufige Anliegen",
      whyLabel: "Gut zu wissen",
      intro:
        "Wir bieten medizinische und ästhetische Laserbehandlungen – zum Beispiel zur Entfernung von Keratosen, Narben, Tattoos, Pigmentflecken, Falten, Couperose oder Feuermalen.",
      question: {
        text: "Was möchten Sie behandeln lassen?",
        options: [
          {
            label: "Pigmentflecken, Rötungen oder Äderchen",
            causes: [
              "Pigment- und Altersflecken",
              "Couperose und erweiterte Äderchen",
              "Feuermale",
            ],
            why: "Lasersysteme mit unterschiedlichen Wellenlängen zielen gezielt auf Pigment oder Gefäße – das umliegende Gewebe wird geschont.",
          },
          {
            label: "Narben, Dehnungsstreifen oder Falten",
            causes: [
              "Narben nach Verletzungen oder Akne",
              "Dehnungsstreifen",
              "Feine Falten und unebene Hautstruktur",
            ],
            why: "Laserbehandlungen zur Hautabtragung und zum Skin Resurfacing regen die Haut zur Erneuerung an – die Oberfläche wird gleichmäßiger.",
          },
          {
            label: "Keratosen, Xanthelasmen oder Tattoos",
            causes: [
              "Aktinische oder seborrhoische Keratosen",
              "Xanthelasmen (Fetteinlagerungen am Augenlid)",
              "Tattoos",
            ],
            why: "Zum Einstieg bieten wir einen kombinierten Ersttermin aus ärztlicher Beratung und Probelaserung an – so wissen Sie vorab, wie viele Behandlungen voraussichtlich nötig sind.",
          },
        ],
      },
      diag: "Ärztliche Beratung mit Probelaserung; die Behandlung erfolgt ambulant in der Praxis.",
      therapy: [
        "Präzise Hautabtragung und Skin Resurfacing mit dem Dermablate®-Laser",
        "Gefäßbehandlungen mit dem QuadroStarPRO®-Laser",
        "Pigment- und Tattooentfernung mit dem NanoStar® R-Laser",
      ],
    },

    // TODO(client): medical review
    hautbild: {
      short: "Hautbild",
      chipLabel: "Frisches Hautbild",
      title: "Hautqualität & frisches Hautbild",
      causesLabel: "Häufige Anliegen",
      whyLabel: "Gut zu wissen",
      intro:
        "Hydrafacial®-Behandlungen, Microneedling und medizinische Peelings sorgen für ein frisches, reines Hautbild mit ebenmäßigem Teint.",
      question: {
        text: "Was beschäftigt Sie an Ihrer Haut?",
        options: [
          {
            label: "Unreinheiten oder Pigmentflecken",
            causes: [
              "Unreinheiten und vergrößerte Poren",
              "Pigmentflecken und ungleichmäßiger Teint",
              "Aknenarben",
            ],
            why: "Medizinische Peelings und Hydrafacial®-Behandlungen reinigen die Haut tiefenwirksam und gleichen den Teint aus.",
          },
          {
            label: "Feine Linien und müde wirkende Haut",
            causes: ["Feine Linien", "Fahle, müde wirkende Haut", "Verlust an Ausstrahlung"],
            why: "Skinbooster versorgen die Haut intensiv mit Feuchtigkeit und unterstützen die Kollagenbildung – für ein frisches, natürliches Erscheinungsbild.",
          },
          {
            label: "Trockene Haut mit wenig Spannkraft",
            causes: [
              "Trockene Haut",
              "Nachlassende Spannkraft und Elastizität",
              "Dünner werdende Haut",
            ],
            why: "Microneedling und PRP regen die Haut zur eigenen Regeneration an – Spannkraft und Dichte können sich verbessern.",
          },
        ],
      },
      diag: "Ausführliche ästhetische Beratung und Hautanalyse durch die Fachärztin.",
      therapy: [
        "Hydrafacial®, Microneedling und medizinische Peelings",
        "Hyaluronsäure-Skinbooster und Biostimulation",
        "PRP-Therapie zur Hautregeneration",
      ],
    },

    // TODO(client): medical review
    chirurgie: {
      short: "Plastische Chirurgie",
      chipLabel: "Plastische Chirurgie",
      title: "Plastisch-chirurgische Eingriffe",
      causesLabel: "Häufige Anliegen",
      whyLabel: "Gut zu wissen",
      intro:
        "Operative Verfahren der Plastischen und Ästhetischen Chirurgie – geplant im persönlichen Gespräch, mit dem Ziel eines natürlichen Ergebnisses.",
      question: {
        text: "Welcher Bereich interessiert Sie?",
        options: [
          {
            label: "Augenlider und Gesicht",
            causes: [
              "Schlupflider und erschlaffte Haut am Oberlid",
              "Tränensäcke",
              "Erschlaffte Gesichtskonturen",
            ],
            why: "Eine Oberlidstraffung (Blepharoplastik) entfernt überschüssige Haut am Oberlid – der Blick wirkt wacher und offener.",
          },
          {
            label: "Körperkonturen und Fettpolster",
            causes: [
              "Hartnäckige Fettpolster",
              "Volumenauffrischung mit Eigenfett",
              "Erschlaffte Haut nach Gewichtsverlust",
            ],
            why: "Bei der Liposuktion wird Fett gezielt abgesaugt – aufbereitet kann es als Eigenfett an anderer Stelle Volumen auffrischen.",
          },
          {
            label: "Narben und Hautveränderungen",
            causes: [
              "Störende oder auffällige Narben",
              "Haut- und Weichteilveränderungen",
              "Entfernung von Hautveränderungen",
            ],
            why: "Eine ausführliche, ehrliche und individuelle Beratung bildet die Grundlage jedes Eingriffs – wir nehmen uns Zeit für Ihre Wünsche und Erwartungen.",
          },
        ],
      },
      diag: "Persönliche Beratung und Untersuchung durch die Fachärztin für Plastische und Ästhetische Chirurgie.",
      therapy: [
        "Oberlidstraffung (Blepharoplastik)",
        "Liposuktion und Eigenfettbehandlung",
        "Narbenkorrektur und Entfernung von Hautveränderungen – in Zusammenarbeit mit Isarblick Derma",
      ],
    },

    // TODO(client): medical review
    schnelltest: {
      short: "Schnelltests",
      chipLabel: "Schnelltests vor Ort",
      title: "Schnelle Labordiagnostik vor Ort",
      causesLabel: "Typische Anlässe",
      whyLabel: "Gut zu wissen",
      intro:
        "Ein modernes Point-of-Care-System ermöglicht die schnelle und präzise Analyse verschiedener Parameter direkt vor Ort – Ergebnisse in 3 bis 15 Minuten.",
      question: {
        text: "Welcher Wert ist gefragt?",
        options: [
          {
            label: "Entzündungswert vor einer Behandlung",
            causes: [
              "CRP (Entzündungsstatus)",
              "Prüfung der Behandlungsbereitschaft vor regenerativen Therapien",
              "Kontrolle bei Verdacht auf einen Infekt",
            ],
            why: "Vor regenerativen Therapien sollte keine akute Entzündung vorliegen – der CRP-Schnelltest klärt das innerhalb weniger Minuten.",
          },
          {
            label: "Vitamin D",
            causes: [
              "Vitamin-D-Bestimmung",
              "Kontrolle unter Supplementierung",
              "Abklärung bei Müdigkeit oder Knochenbeschwerden",
            ],
            why: "Vitamin D ist wichtig für Knochen, Muskeln und Immunsystem – der Wert liegt in kurzer Zeit vor, und die Dosierung kann direkt besprochen werden.",
          },
          {
            label: "Weitere Parameter, z. B. Schwangerschaftstest",
            causes: [
              "β-hCG (Schwangerschaftshormon)",
              "Weitere Parameter aus Vollblut, Serum oder Plasma",
              "Verlaufskontrollen",
            ],
            why: "Durch die schnelle Verfügbarkeit der Ergebnisse können Diagnostik und Therapie oft im selben Termin erfolgen.",
          },
        ],
      },
      diag: "Analyse aus Vollblut, Serum oder Plasma direkt in der Praxis.",
      therapy: [
        "Rasche und sichere Therapieentscheidungen",
        "Prüfung der Behandlungsbereitschaft vor regenerativen Therapien",
        "Verlaufskontrolle",
      ],
    },
  },
};
