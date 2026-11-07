import type { BodyMapText } from "./bodyMap";

// TODO(client): review EN medical wording
// English body-map copy. Translated for international patients; proper names
// (Isarblick Ortho, EMSELLA®, Juliet®, Dermablate® …) are kept as they are. Every zone and
// topic asks exactly one question with three answers (see bodyMap.de.ts).

export const bodyMapEn: BodyMapText = {
  genericFlag:
    "Sudden, very severe pain, fever, numbness or signs of paralysis? Please seek medical attention immediately – in an emergency call 112.",
  causesLabel: "Common causes",
  whyLabel: "Why it hurts",
  disclaimer: "This information does not replace a medical examination.",
  zones: {
    knie: {
      short: "Knee",
      title: "Knee pain",
      intro:
        "With every step the knee carries several times your body weight – so complaints are common, from sports injuries to wear and tear.",
      question: {
        text: "When does the pain mainly occur?",
        options: [
          {
            label: "After sport or a twisting injury",
            causes: [
              "Meniscus irritation or tear",
              "Ligament injury, e.g. cruciate or medial collateral ligament",
              "Bruise or bone marrow oedema",
            ],
            why: "Twisting under load puts particular strain on the meniscus and ligaments – even a small misstep can injure them.",
          },
          {
            label: "Stiff in the morning, pain when starting to move",
            causes: [
              "Osteoarthritis (cartilage wear)",
              "Irritation of the joint lining (synovitis)",
              "Early degenerative changes of the meniscus",
            ],
            why: "Worn cartilage cushions less well. After periods of rest, the joint needs time to get going again.",
          },
          {
            label: "At the front of the knee, when climbing stairs",
            causes: [
              "Irritation behind the kneecap (patellofemoral pain syndrome)",
              "Patellar tendinopathy (“jumper’s knee”)",
              "Cartilage damage behind the kneecap",
            ],
            why: "Pressure behind the kneecap is highest when climbing stairs and squatting.",
          },
        ],
      },
      diag: "Clinical examination, ultrasound and X-ray directly on site – supplemented by blood values from our in-house lab if needed.",
      therapy: [
        "Regenerative injections (e.g. PRP – platelet-rich plasma, hydrogel)",
        "Stem-cell-based procedures",
        "Physiotherapy and targeted muscle strengthening",
        "Minimally invasive procedures such as denervation",
      ],
      flag: "Is the knee very swollen, hot, red or no longer able to bear weight? Please have it examined promptly – immediately if you have a fever.",
    },

    ruecken: {
      short: "Lower back",
      title: "Back pain",
      intro:
        "Back pain is one of the most common complaints of all. It is usually very treatable – the key is knowing the cause.",
      question: {
        text: "How would you describe the pain?",
        options: [
          {
            label: "Dull, after sitting for a long time",
            causes: [
              "Muscle tension and poor posture",
              "Irritation of the small vertebral (facet) joints",
              "Weakness of the stabilising core muscles",
            ],
            why: "Prolonged sitting loads the lumbar spine one-sidedly – muscles tire, tighten and pull on their attachments.",
          },
          {
            label: "Radiating into the leg",
            causes: [
              "Disc bulge or herniated disc",
              "Irritation of a nerve root (sciatica)",
              "Narrowing of the spinal canal",
            ],
            why: "When disc tissue presses on a nerve root, the pain radiates along the nerve down into the leg.",
          },
          {
            label: "Stiff in the morning, better with movement",
            causes: [
              "Wear of the small vertebral joints",
              "Muscular stiffness",
              "Rarely: inflammatory spinal conditions",
            ],
            why: "Vertebral joints are sensitive after rest; movement distributes the joint fluid. Persistent morning stiffness should be investigated.",
          },
        ],
      },
      diag: "Radiation-free spine measurement, X-ray and clinical examination – lab tests if an inflammatory cause is suspected.",
      therapy: [
        "Physiotherapy and posture training",
        "Targeted injections at vertebral joints or nerve roots",
        "Regenerative and minimally invasive procedures",
      ],
      flag: "Numbness in the genital or buttock area, problems urinating or paralysis in the leg? This is an emergency – please call 112 immediately.",
    },

    schulter: {
      short: "Shoulder",
      title: "Shoulder pain",
      intro:
        "The shoulder is the most mobile joint in the body – and is stabilised mainly by tendons and muscles. That makes it vulnerable.",
      question: {
        text: "Which applies most?",
        options: [
          {
            label: "Pain when lifting the arm overhead",
            causes: [
              "Impingement (narrowing beneath the acromion)",
              "Irritation of the rotator cuff",
              "Bursitis",
            ],
            why: "When you raise your arm, tendons glide through a narrow space beneath the acromion – any swelling quickly makes it tight.",
          },
          {
            label: "After a fall or sudden jolt",
            causes: ["Rotator cuff tear", "Labral injury, instability", "Bruise or bony injury"],
            why: "A sudden pull can injure tendons and the labrum – early assessment widens the treatment options.",
          },
          {
            label: "Increasingly stiff, also at night",
            causes: [
              "Frozen shoulder",
              "Calcific tendinitis",
              "Osteoarthritis of the shoulder joint",
            ],
            why: "When the joint capsule becomes inflamed it thickens and shrinks – mobility decreases step by step, and it often hurts more at night.",
          },
        ],
      },
      diag: "Ultrasound and X-ray on site as well as clinical function tests of the shoulder muscles.",
      therapy: [
        "Regenerative injections (e.g. PRP – platelet-rich plasma)",
        "Physiotherapy and targeted strengthening",
        "Minimally invasive procedures",
      ],
      flag: "Left shoulder pain with chest pressure, shortness of breath or nausea? This may involve the heart – please call 112 immediately.",
    },

    // TODO(client): medical review
    nacken: {
      short: "Neck",
      title: "Neck pain",
      intro:
        "Many neck complaints are caused by posture and tension – sometimes the cervical spine itself is behind it.",
      question: {
        text: "When do the complaints mainly occur?",
        options: [
          {
            label: "After long periods of sitting or screen work",
            causes: [
              "Muscle tension",
              "Poor posture with the head held forward",
              "Irritation of the small vertebral joints",
            ],
            why: "When the head is held forward for long periods, the neck muscles work against several times its weight – they tire and tense up.",
          },
          {
            label: "Radiating into the arm or hand, with tingling",
            causes: [
              "Disc bulge or herniated disc in the cervical spine",
              "Irritation of a nerve root",
              "Narrowing of the nerve exits due to wear",
            ],
            why: "When disc or bone tissue presses on a nerve root, the pain radiates along the nerve into the arm and hand – often accompanied by tingling.",
          },
          {
            label: "Suddenly restricted, a “stiff neck”",
            causes: [
              "Acute blockage of the small vertebral joints",
              "Protective muscle spasm",
              "Rarely: injury after an accident or fall",
            ],
            why: "A quick movement or an awkward sleeping position can irritate a vertebral joint – the muscles tense reflexively and lock the movement.",
          },
        ],
      },
      diag: "Clinical examination, radiation-free spine measurement and X-ray if needed.",
      therapy: [
        "Physiotherapy and posture training",
        "Targeted injections",
        "Regenerative procedures",
      ],
    },

    // TODO(client): medical review
    oben: {
      short: "Upper back",
      title: "Upper back pain",
      intro:
        "Posture, breathing and arm movement all meet between the shoulder blades – overload shows up here early.",
      question: {
        text: "Which applies most?",
        options: [
          {
            label: "Between the shoulder blades, after sitting for a long time",
            causes: [
              "Muscular imbalances and poor posture",
              "Overload from one-sided activities",
              "Tension of the shoulder blade muscles",
            ],
            why: "A forward-rounded posture keeps the muscles between the shoulder blades permanently stretched – they work constantly and start to hurt.",
          },
          {
            label: "Stabbing when breathing in deeply or turning",
            causes: [
              "Blockage of the thoracic spine",
              "Irritation of the rib-vertebral joints",
              "Muscular hardening",
            ],
            why: "When you breathe, the ribs move at their joints with the spine – if one is blocked, every deep breath hurts.",
          },
          {
            label: "Constant, also at rest or at night",
            causes: [
              "Degenerative changes of the thoracic spine",
              "Rarely: vertebral changes, e.g. with osteoporosis",
              "Complaints originating from internal organs",
            ],
            why: "Persistent pain that is not influenced by movement or posture should be investigated in a structured way – beyond the spine as well.",
          },
        ],
      },
      diag: "Posture and movement analysis, radiation-free spine measurement.",
      therapy: [
        "Physiotherapy and mobilisation",
        "Targeted strength training, also in group classes",
        "Orthopedic assessment for persistent complaints",
      ],
      flag: "Sudden chest pain, shortness of breath or pain radiating into the arm or jaw? This may involve the heart – please call 112 immediately.",
    },

    // TODO(client): medical review
    ellenbogen: {
      short: "Elbow",
      title: "Elbow pain",
      intro:
        "Elbow pain usually arises at the tendon attachments – not only from tennis, but also from mouse work and manual trades.",
      question: {
        text: "Where does it mainly hurt?",
        options: [
          {
            label: "On the outside, when gripping or lifting",
            causes: [
              "Tennis elbow (irritation of the outer tendon attachments)",
              "Overload of the forearm extensors",
              "Irritation of the joint capsule",
            ],
            why: "Repeated gripping and twisting movements load the tendon attachments at the bone – small overloads add up.",
          },
          {
            label: "On the inside, when bending or carrying",
            causes: [
              "Golfer’s elbow (irritation of the inner tendon attachments)",
              "Overload of the forearm flexors",
              "Irritation of the ulnar nerve (tingling in the little finger)",
            ],
            why: "The forearm flexors attach on the inside of the elbow – carrying and forceful bending irritate this attachment.",
          },
          {
            label: "At the back, swollen or after leaning on it",
            causes: [
              "Bursitis at the tip of the elbow",
              "Irritation of the triceps attachment",
              "Bruise after a fall or knock",
            ],
            why: "The bursa at the tip of the elbow cushions the skin over the bone – pressure or a knock irritates it, and it fills with fluid.",
          },
        ],
      },
      diag: "Clinical examination and ultrasound of the tendon attachments on site.",
      therapy: [
        "Regenerative injections (e.g. PRP – platelet-rich plasma)",
        "Physiotherapy and eccentric training",
        "Rest and supports",
      ],
      flag: "Is the elbow very swollen, hot and red, or do you have a fever? Please have it examined promptly.",
    },

    // TODO(client): medical review
    hand: {
      short: "Hand",
      title: "Hand & wrist",
      intro:
        "Tendons and nerves run through the hand and wrist in a very confined space – even small swellings make themselves felt.",
      question: {
        text: "Which complaint is most prominent?",
        options: [
          {
            label: "Tingling or numb fingers, especially at night",
            causes: [
              "Carpal tunnel syndrome",
              "Irritation of the ulnar nerve",
              "Swelling of the tendon sheaths pressing on the nerve",
            ],
            why: "When tissue in the narrow carpal tunnel swells, it presses on the median nerve – night-time tingling and numbness are typical.",
          },
          {
            label: "Pain when gripping, stiff thumb or fingers",
            causes: [
              "Osteoarthritis of the finger joints or thumb base",
              "Tendon sheath inflammation (tenosynovitis)",
              "Trigger finger (narrowing of the tendon pulley)",
            ],
            why: "The thumb and finger joints are loaded with every grip – worn cartilage and irritated tendons make themselves felt early.",
          },
          {
            label: "After a fall or overuse, swollen wrist",
            causes: [
              "Sprain or ligament injury of the wrist",
              "Bruise or bony injury",
              "Overuse irritation of the wrist tendons",
            ],
            why: "In a fall onto the hand, the wrist absorbs all the force – the ligaments and the small carpal bones are particularly at risk.",
          },
        ],
      },
      diag: "Clinical examination, ultrasound and X-ray on site.",
      therapy: [
        "Targeted injections",
        "Splints and physiotherapy",
        "Regenerative procedures for osteoarthritis",
      ],
      flag: "Very swollen, deformed or unable to bear weight after a fall? Please have it examined promptly.",
    },

    // TODO(client): medical review
    huefte: {
      short: "Hip",
      title: "Hip pain",
      intro:
        "Hip pain often shows up in the groin or on the outer side – and is sometimes mistaken for back pain.",
      question: {
        text: "Where do you mainly feel the pain?",
        options: [
          {
            label: "In the groin, when starting to move or climbing stairs",
            causes: [
              "Hip osteoarthritis (cartilage wear)",
              "Narrowing in the hip joint (impingement)",
              "Irritation of the joint lip (labrum)",
            ],
            why: "When walking, the hip carries several times your body weight. Groin pain when starting to move is often an early sign of osteoarthritis.",
          },
          {
            label: "On the outside of the hip, when lying on your side",
            causes: [
              "Bursitis on the outside of the hip",
              "Tendon irritation of the gluteal muscles",
              "Irritation of the lateral tendon band (iliotibial tract)",
            ],
            why: "Tendons and bursae run over the greater trochanter in a confined space – pressure when lying down and one-sided loading irritate them.",
          },
          {
            label: "Deep in the buttock, radiating into the leg",
            causes: [
              "Irritation of the sacroiliac joint",
              "Complaints originating from the lumbar spine",
              "Tension of the deep gluteal muscles",
            ],
            why: "The hip, the sacroiliac joint and the lumbar spine lie close together – their complaints resemble each other and are easily confused.",
          },
        ],
      },
      diag: "Clinical examination, X-ray and ultrasound on site.",
      therapy: [
        "Regenerative injections",
        "Physiotherapy and muscle strengthening",
        "Minimally invasive procedures",
      ],
    },

    // TODO(client): medical review
    fuss: {
      short: "Foot",
      title: "Ankle & foot",
      intro:
        "Our feet and ankles carry us thousands of steps every day – injuries and overload are correspondingly common.",
      question: {
        text: "When do the complaints occur?",
        options: [
          {
            label: "After twisting the ankle",
            causes: [
              "Ligament injury of the ankle",
              "Bruise or bony injury",
              "Irritation of the joint capsule",
            ],
            why: "After a sprain, ligaments often do not heal completely – the joint remains unstable and gives way more easily again.",
          },
          {
            label: "When rolling the foot or underneath the foot",
            causes: [
              "Plantar fasciitis (heel spur)",
              "Overload of the arch due to misalignment, e.g. flat foot",
              "Overload of the metatarsal bones",
            ],
            why: "When the foot rolls, the tendon plate underneath tightens like a bowstring – with misalignment or overload its attachment becomes irritated.",
          },
          {
            label: "Stiff in the morning, ankle pain under load",
            causes: [
              "Osteoarthritis of the ankle",
              "Consequences of earlier injuries",
              "Irritation of the joint lining",
            ],
            why: "Worn cartilage cushions less well – after periods of rest, the joint needs time to get going again.",
          },
        ],
      },
      diag: "Clinical examination, ultrasound and X-ray on site.",
      therapy: [
        "Regenerative injections",
        "Physiotherapy and stability training",
        "Advice on insoles and loading",
      ],
      flag: "Unable to bear weight after an injury, clearly deformed or numb? Please have it examined promptly.",
    },

    // TODO(client): medical review
    ferse: {
      short: "Heel",
      title: "Heel & Achilles tendon",
      intro:
        "Pain in the heel and Achilles tendon is common in runners – but also after a change of shoes or weight gain.",
      question: {
        text: "Where exactly does it hurt?",
        options: [
          {
            label: "Under the heel, especially with the first steps",
            causes: [
              "Heel spur (plantar fasciitis)",
              "Irritation of the heel fat pad",
              "Overload from a change of shoes or weight gain",
            ],
            why: "The tendon plate under the foot shortens overnight – the first steps in the morning pull on its irritated attachment.",
          },
          {
            label: "At the back on the Achilles tendon, when running",
            causes: [
              "Achilles tendon irritation",
              "Overload from increasing training too quickly",
              "Shortened calf muscles",
            ],
            why: "When running, the Achilles tendon transmits forces of several times your body weight – if the load increases too quickly, it becomes irritated.",
          },
          {
            label: "At the tendon attachment, swollen and tender",
            causes: [
              "Bursa irritation at the tendon attachment",
              "Bony prominence on the heel bone (Haglund’s deformity)",
              "Irritation from the pressure of the shoe heel",
            ],
            why: "A bursa lies between the Achilles tendon and the heel bone – if a hard shoe edge or a bony prominence rubs against it, it becomes inflamed.",
          },
        ],
      },
      diag: "Ultrasound of the tendon and clinical examination on site.",
      therapy: [
        "Regenerative injections (e.g. PRP – platelet-rich plasma)",
        "Eccentric training in physiotherapy",
        "Load management and insoles",
      ],
      flag: "Sudden, whip-like pain in the calf or heel and you can no longer stand on your toes? This may be a tendon rupture – please seek medical attention immediately.",
    },

    // TODO(client): medical review
    gesicht: {
      short: "Face",
      title: "Face & skin",
      causesLabel: "Common concerns",
      intro:
        "Whether a medical skin question or an aesthetic wish: we care for face and skin across dermatology and aesthetics.",
      question: {
        text: "What concerns you most?",
        options: [
          {
            label: "A mole or a skin change",
            causes: [
              "New or changing moles",
              "Sun damage to the skin, e.g. actinic keratoses",
              "Benign or malignant skin tumours",
            ],
            why: "The face is the most sun-exposed part of the body – skin changes arise here particularly often and should be assessed by a dermatologist.",
          },
          {
            label: "Acne, redness or pigmentation spots",
            causes: [
              "Acne and blemishes",
              "Rosacea and couperose",
              "Pigmentation spots and an uneven complexion",
            ],
            why: "Sebaceous glands, fine vessels and pigment cells react sensitively to hormones, UV light and irritants – targeted treatments can improve the complexion.",
          },
          {
            label: "Wrinkles, volume loss or tired-looking skin",
            causes: [
              "Skin ageing and wrinkles",
              "Volume loss and sagging contours",
              "Loss of firmness and freshness",
            ],
            why: "Over the years the skin’s collagen and elasticity decline – UV light and environmental factors accelerate this process.",
          },
        ],
      },
      diag: "Dermatological examination including dermoscopy; in-depth aesthetic consultation.",
      therapy: [
        "Medical skin treatments",
        "Aesthetic treatments and surgery",
        "Skin cancer screening",
      ],
      flag: "Is a mole growing, bleeding or changing colour or shape? Please have it checked by a dermatologist promptly.",
    },

    // TODO(client): medical review
    gyne: {
      short: "Lower abdomen",
      chipLabel: "Women’s health",
      title: "Women’s health",
      causesLabel: "Common reasons",
      intro:
        "Lower abdominal complaints, questions about your cycle or check-ups – trusted care in every phase of life.",
      question: {
        text: "What brings you here?",
        options: [
          {
            label: "Pain or discomfort in the lower abdomen",
            causes: ["Cycle-related pain", "Inflammation or infections", "Cysts or fibroids"],
            why: "Lower abdominal complaints have many possible causes – the cycle, hormones and the organs of the pelvis. Examination and ultrasound usually clarify them well.",
          },
          {
            label: "Changes in cycle or bleeding",
            causes: [
              "Hormonal fluctuations",
              "Changes of the uterus or ovaries",
              "Cycle changes in perimenopause",
            ],
            why: "Many complaints follow the hormonal rhythm – which is why it is worth looking at your cycle and phase of life.",
          },
          {
            label: "Check-up, contraception or wish to have children",
            causes: [
              "Check-ups and follow-up examinations",
              "Advice on contraception",
              "Fertility counselling",
            ],
            why: "Trusted care in every phase of life – with time for your questions and medical decisions made together, as equals.",
          },
        ],
      },
      diag: "Gynecological examination, ultrasound and blood values from our in-house lab.",
      therapy: [
        "Individual diagnostics and advice",
        "Hormonal and non-hormonal therapies",
        "Preventive care",
      ],
      flag: "Sudden, severe lower abdominal pain, heavy bleeding or fever? Please seek medical attention immediately – in an emergency call 112.",
    },

    // TODO(client): medical review
    haut: {
      short: "Skin & allergies",
      chipLabel: "Skin diseases & allergies",
      title: "Skin & allergies",
      causesLabel: "Common concerns",
      intro:
        "From chronic skin conditions and allergies to preventive care – examined and treated by dermatologists in-house.",
      question: {
        text: "Which applies most?",
        options: [
          {
            label: "Itchy, dry or reddened skin",
            causes: ["Eczema and atopic dermatitis", "Psoriasis", "Contact allergies"],
            why: "The skin reacts to internal and external influences – allergies or inflammation often show up here first.",
          },
          {
            label: "Allergic reaction or intolerance",
            causes: [
              "Hay fever and pollen allergy",
              "Food or drug intolerances",
              "Hives (urticaria)",
            ],
            why: "In an allergy, the immune system reacts to substances that are harmless in themselves – structured allergy testing helps to find the trigger.",
          },
          {
            label: "Moles or a new skin change",
            causes: [
              "Moles and skin changes",
              "Sun damage to the skin",
              "Benign or malignant skin tumours",
            ],
            why: "New or changing skin lesions should be assessed by a dermatologist – with dermoscopy it is usually quick to clarify what is behind them.",
          },
        ],
      },
      diag: "Dermatological examination, dermoscopy and allergy testing.",
      therapy: ["Guideline-based medical therapy", "Allergy work-up", "Skin cancer screening"],
      flag: "Sudden swelling of the face, lips or tongue, or shortness of breath after contact with something? This is an emergency – please call 112 immediately.",
    },

    // TODO(client): medical review
    aesthetik: {
      short: "Aesthetics",
      chipLabel: "Wrinkles & volume",
      title: "Aesthetics & prevention",
      causesLabel: "Common concerns",
      whyLabel: "Good to know",
      intro:
        "Modern aesthetic medicine for a fresh, natural result – always based on a thorough medical consultation.",
      question: {
        text: "What would you like to improve?",
        options: [
          {
            label: "Wrinkles and volume loss",
            causes: [
              "Expression lines, e.g. forehead, frown lines or crow’s feet",
              "Volume loss in the cheeks or lips",
              "Sagging contours",
            ],
            why: "Minimally invasive treatments can smooth wrinkles and replace volume – the aim is a fresh, natural result.",
          },
          {
            label: "A fresher, more even complexion",
            causes: [
              "Tired-looking or dry skin",
              "Blemishes and pigmentation spots",
              "Fine lines",
            ],
            why: "Regenerative skin treatments support hydration and collagen formation – the complexion looks fresher and more even.",
          },
          {
            label: "An aesthetic surgical procedure",
            causes: ["Drooping eyelids", "Fat deposits and body contours", "Skin and soft-tissue changes"],
            why: "Every treatment begins with a personal conversation and an individual plan – without time pressure.",
          },
        ],
      },
      diag: "In-depth consultation with a specialist in plastic and aesthetic surgery.",
      therapy: [
        "Minimally invasive aesthetic treatments",
        "Regenerative skin treatments",
        "Aesthetic surgery",
      ],
    },

    // TODO(client): medical review
    labor: {
      short: "Check-up",
      chipLabel: "Check-up & lab",
      title: "Check-up & lab",
      causesLabel: "Typical reasons",
      whyLabel: "Good to know",
      intro:
        "Many complaints have a measurable cause. Our in-house lab delivers values that flow directly into your treatment.",
      question: {
        text: "What is the reason for your check-up?",
        options: [
          {
            label: "General health check",
            causes: [
              "Blood count, liver and kidney values",
              "Blood sugar and blood lipids",
              "Vitamin and mineral status",
            ],
            why: "Blood is drawn directly on site – we discuss the results in the context of your complaints.",
          },
          {
            label: "Tiredness, exhaustion or a drop in performance",
            causes: [
              "Vitamin D, B12 or iron deficiency",
              "Thyroid values",
              "Inflammation and metabolic markers",
            ],
            why: "Many complaints have a measurable cause – a deficiency or a thyroid change often shows up first in the blood count.",
          },
          {
            label: "Alongside a treatment at Isarblick",
            causes: [
              "Inflammation status before a regenerative therapy",
              "Hormone levels for gynecological assessment",
              "Follow-up checks during therapy",
            ],
            why: "In-house lab values flow directly into your treatment – no external detours.",
          },
        ],
      },
      diag: "Blood sampling and analysis in the Isarblick Lab.",
      therapy: ["Targeted supplementation", "Coordinated treatment planning", "Follow-up checks"],
    },

    // ---- Revision 2 – content based on roc-gyne.de / roc.de ---------------------

    // TODO(client): medical review
    brust: {
      short: "Breast",
      title: "Breast health & screening",
      causesLabel: "Common reasons",
      intro:
        "The breast is part of gynecological preventive care: a clinical breast exam and breast ultrasound help detect changes early – carefully and clearly explained.",
      question: {
        text: "What brings you here?",
        options: [
          {
            label: "Prevention and check-up",
            causes: [
              "Regular breast cancer screening",
              "Clinical breast exam and breast ultrasound",
              "Advice if there is a family history",
            ],
            why: "Many breast changes are benign. Regular screening detects abnormalities early – and provides reassurance.",
          },
          {
            label: "I have noticed a change",
            urgent: true,
            causes: [
              "Palpable lumps or hardening",
              "Changes in the skin or nipple, discharge",
              "New, one-sided pain",
            ],
            why: "A change you have noticed should be examined promptly – it is usually benign, and early assessment is decisive if treatment does turn out to be necessary.",
          },
          {
            label: "Tightness or pain depending on the cycle",
            causes: [
              "Cycle-related breast tenderness (mastalgia)",
              "Hormonal changes",
              "Benign changes of the glandular tissue",
            ],
            why: "Breast tissue responds to the hormonal rhythm – tenderness before the period is common and usually harmless, but should be assessed.",
          },
        ],
      },
      diag: "Clinical breast exam and breast ultrasound in the practice; structured referral to a certified breast centre if needed.",
      therapy: [
        "Regular cancer screening with breast ultrasound",
        "Assessment and support for abnormal findings",
        "Structured follow-up care for gynecological cancers",
      ],
      flag: "New lump, skin or nipple changes, or discharge? Please have it checked promptly.",
    },

    // TODO(client): medical review
    wechseljahre: {
      short: "Menopause",
      chipLabel: "Menopause & hormones",
      title: "Menopause & hormones",
      causesLabel: "Common reasons",
      intro:
        "Menopause changes hormones, sleep, skin, joints, energy and sexuality. Many women notice the first signs earlier than expected – we support you through perimenopause and postmenopause.",
      question: {
        text: "Which complaints are most prominent?",
        options: [
          {
            label: "Hot flushes, sleep problems, restlessness",
            causes: [
              "Hot flushes and sweating",
              "Sleep disturbances",
              "Mood swings and inner restlessness",
            ],
            why: "Hormonal change lies behind many of these complaints. Once correctly identified, they can often be relieved well.",
          },
          {
            label: "Weight, joints, skin or hair are changing",
            causes: [
              "Weight gain",
              "Joint and muscle complaints",
              "Dry skin and hair loss",
            ],
            why: "Oestrogen acts on metabolism, connective tissue and skin – as levels fall, weight, joints and complexion change.",
          },
          {
            label: "The cycle is changing, first signs",
            causes: [
              "Cycle changes in perimenopause",
              "Irregular or heavier bleeding",
              "First symptoms at a younger age",
            ],
            why: "Many women notice the first signs earlier than expected – hormone levels from our in-house lab help to place the phase.",
          },
        ],
      },
      diag: "In-depth consultation, gynecological examination and hormone levels from our in-house lab.",
      therapy: [
        "Advice on modern options to relieve typical symptoms",
        "Therapy, for example with bioidentical hormones",
        "Long-term preventive care in this phase of life",
      ],
    },

    // TODO(client): medical review
    beckenboden: {
      short: "Pelvic floor",
      chipLabel: "Pelvic floor (EMSELLA®)",
      title: "Pelvic floor & incontinence",
      causesLabel: "Common reasons",
      intro:
        "We take pelvic floor weakness, prolapse symptoms and incontinence seriously – from conservative measures to specialised therapies such as the EMSELLA® chair.",
      question: {
        text: "Which applies most?",
        options: [
          {
            label: "Urine leakage when coughing, laughing or exercising",
            causes: [
              "Stress incontinence",
              "Pelvic floor weakness after pregnancy and childbirth",
              "Hormone-related tissue weakness",
            ],
            why: "Coughing or jumping raises the pressure in the abdomen – if the pelvic floor is weakened, it cannot withstand the pressure.",
          },
          {
            label: "Sudden, strong urge to urinate",
            causes: [
              "Urge incontinence (overactive bladder)",
              "Irritable bladder",
              "Mixed forms of stress and urge incontinence",
            ],
            why: "With an overactive bladder the urge comes on suddenly and strongly – targeted diagnostics distinguish the forms, because they are treated differently.",
          },
          {
            label: "Feeling of pressure or a foreign body, prevention",
            causes: [
              "Prolapse symptoms",
              "Weak pelvic floor without incontinence",
              "Prevention and improvement of pelvic floor strength",
            ],
            why: "The EMSELLA® chair stimulates the pelvic floor muscles with highly focused electromagnetic pulses – fully clothed, with no active exercise.",
          },
        ],
      },
      diag: "Gynecological examination and consultation; diagnostics for pelvic floor weakness, prolapse symptoms or incontinence.",
      therapy: [
        "Pelvic floor training with the original EMSELLA® chair (non-invasive, painless, approx. 30 minutes)",
        "Conservative measures and physiotherapy",
        "Vaginal laser therapy for stress and urge incontinence",
      ],
    },

    // TODO(client): medical review
    vorsorge: {
      short: "Check-ups",
      chipLabel: "Check-ups & ultrasound",
      title: "Gynecological check-ups",
      causesLabel: "Typical reasons",
      whyLabel: "Good to know",
      intro:
        "Comprehensive preventive examinations to maintain your health and detect disease early – thorough, clearly explained and at the current state of medicine.",
      question: {
        text: "What is the reason for your visit?",
        options: [
          {
            label: "Annual cancer screening",
            causes: [
              "Regular cancer screening",
              "Smear test and gynecological examination",
              "Vaginal ultrasound and breast ultrasound",
            ],
            why: "We take time, advise transparently and make medical decisions together with you – discreetly and as equals.",
          },
          {
            label: "Contraception or wish to have children",
            causes: [
              "Advice on contraceptive methods",
              "Fertility counselling",
              "Hormonal assessment",
            ],
            why: "The right contraception and support when trying to conceive depend on your phase of life, health and wishes – we advise individually.",
          },
          {
            label: "Vaccinations and general health advice",
            causes: [
              "HPV vaccination",
              "Vaccination advice specifically for women",
              "General preventive care and lab values",
            ],
            why: "Vaccinations such as the HPV vaccination are part of gynecological preventive care – we check your vaccination status and advise you.",
          },
        ],
      },
      diag: "Gynecological examination, expert-level vaginal ultrasound, breast ultrasound and in-house lab values.",
      therapy: [
        "Individual advice and preventive care planning",
        "Contraception and fertility counselling",
        "Vaccination advice and vaccinations specifically for women",
      ],
    },

    // TODO(client): medical review
    intimlaser: {
      short: "Intimate health",
      chipLabel: "Vaginal laser therapy",
      title: "Intimate health & laser therapy",
      causesLabel: "Common reasons",
      intro:
        "Laser therapy with the Juliet® laser is a gentle, non-surgical and non-hormonal option for improving many intimate-area complaints.",
      question: {
        text: "Which complaints are most prominent?",
        options: [
          {
            label: "Dryness or menopausal complaints",
            causes: [
              "Vaginal dryness",
              "Burning, itching or pain during intercourse",
              "Hormone-related tissue changes",
            ],
            why: "Hormonal changes alter the tissue of the intimate area – regenerative procedures can improve moisture and elasticity.",
          },
          {
            label: "Urine leakage under exertion or urgency",
            causes: [
              "Stress or urge incontinence",
              "Pelvic floor weakness",
              "Combined with prolapse symptoms",
            ],
            why: "Vaginal laser therapy can tighten the tissue around the urethra – a gentle, non-hormonal option for stress and urge incontinence.",
          },
          {
            label: "Loss of elasticity or recurrent infections",
            causes: [
              "Loss of elasticity after childbirth",
              "Recurrent vaginal infections",
              "Scars after birth injuries",
            ],
            why: "The Juliet® laser stimulates the mucosa to regenerate – the tissue becomes better supplied with blood and more resilient.",
          },
        ],
      },
      diag: "A confidential consultation and gynecological examination – discreet and without time pressure.",
      therapy: [
        "Vaginal laser therapy (Er:YAG, Juliet® laser)",
        "Regenerative intimate therapy, e.g. with hyaluronic acid or PRP",
        "Advice on functional and aesthetic intimate surgery",
      ],
    },

    // TODO(client): medical review
    hautkrebs: {
      short: "Skin cancer screening",
      chipLabel: "Skin cancer screening",
      title: "Skin cancer screening",
      causesLabel: "Typical reasons",
      whyLabel: "Good to know",
      intro:
        "Skin cancer is curable when detected early enough. We keep an eye on your skin together with you – using the latest technology and dermoscopic examination.",
      question: {
        text: "What is the reason?",
        options: [
          {
            label: "Regular screening",
            causes: [
              "Skin cancer screening without an acute reason",
              "Many moles or fair skin type",
              "High UV exposure at work or in leisure time",
            ],
            why: "Skin cancer is curable when detected early enough – regular screening finds changes before they cause complaints.",
          },
          {
            label: "A mole has changed",
            urgent: true,
            causes: [
              "New, growing or changing moles",
              "Itching, bleeding or weeping skin lesions",
              "Asymmetric or multicoloured moles",
            ],
            why: "Changes in size, shape or colour are the most important warning signs – a dermoscopic examination clarifies them promptly.",
          },
          {
            label: "Follow-up after a previous skin change",
            causes: [
              "Aftercare following removed skin cancer",
              "Monitoring of suspicious moles",
              "Documentation with FotoFinder technology",
            ],
            why: "After a previous skin change the risk of further ones is increased – structured checks with photo documentation make changes visible.",
          },
        ],
      },
      diag: "Full-body examination with FotoFinder technology, dermoscopy and, if needed, electrical impedance spectroscopy (NeviSense).",
      therapy: [
        "Monitoring of suspicious moles",
        "Gentle removal of benign and malignant skin lesions in our in-house operating room",
        "Histological assessment",
      ],
      flag: "Is a mole growing, bleeding or changing colour or shape? Please have it checked by a dermatologist promptly.",
    },

    // TODO(client): medical review
    dermalaser: {
      short: "Laser treatment",
      chipLabel: "Laser treatments",
      title: "Medical & aesthetic laser treatments",
      causesLabel: "Common concerns",
      whyLabel: "Good to know",
      intro:
        "We offer medical and aesthetic laser treatments – for example to remove keratoses, scars, tattoos, pigmentation spots, wrinkles, couperose or port-wine stains.",
      question: {
        text: "What would you like to have treated?",
        options: [
          {
            label: "Pigmentation spots, redness or dilated capillaries",
            causes: [
              "Pigmentation and age spots",
              "Couperose and dilated capillaries",
              "Port-wine stains",
            ],
            why: "Laser systems with different wavelengths target pigment or vessels specifically – the surrounding tissue is spared.",
          },
          {
            label: "Scars, stretch marks or wrinkles",
            causes: [
              "Scars after injuries or acne",
              "Stretch marks",
              "Fine wrinkles and uneven skin texture",
            ],
            why: "Laser skin ablation and skin resurfacing stimulate the skin to renew itself – the surface becomes more even.",
          },
          {
            label: "Keratoses, xanthelasma or tattoos",
            causes: [
              "Actinic or seborrhoeic keratoses",
              "Xanthelasma (fat deposits on the eyelid)",
              "Tattoos",
            ],
            why: "To start, we offer a combined first appointment with a medical consultation and a test laser treatment – so you know in advance how many sessions are likely to be needed.",
          },
        ],
      },
      diag: "Medical consultation with a test laser treatment; the treatment is performed on an outpatient basis in the practice.",
      therapy: [
        "Precise skin ablation and skin resurfacing with the Dermablate® laser",
        "Vascular treatments with the QuadroStarPRO® laser",
        "Pigment and tattoo removal with the NanoStar® R laser",
      ],
    },

    // TODO(client): medical review
    hautbild: {
      short: "Complexion",
      chipLabel: "Fresh complexion",
      title: "Skin quality & a fresh complexion",
      causesLabel: "Common concerns",
      whyLabel: "Good to know",
      intro:
        "Hydrafacial® treatments, microneedling and medical peels give a fresh, clear complexion with an even skin tone.",
      question: {
        text: "What concerns you about your skin?",
        options: [
          {
            label: "Blemishes or pigmentation spots",
            causes: [
              "Blemishes and enlarged pores",
              "Pigmentation spots and an uneven complexion",
              "Acne scars",
            ],
            why: "Medical peels and Hydrafacial® treatments cleanse the skin deeply and even out the complexion.",
          },
          {
            label: "Fine lines and tired-looking skin",
            causes: ["Fine lines", "Dull, tired-looking skin", "Loss of radiance"],
            why: "Skin boosters deliver intensive hydration and support collagen formation – for a fresh, natural appearance.",
          },
          {
            label: "Dry skin with little firmness",
            causes: ["Dry skin", "Declining firmness and elasticity", "Thinning skin"],
            why: "Microneedling and PRP stimulate the skin’s own regeneration – firmness and density can improve.",
          },
        ],
      },
      diag: "In-depth aesthetic consultation and skin analysis by the specialist.",
      therapy: [
        "Hydrafacial®, microneedling and medical peels",
        "Hyaluronic acid skin boosters and biostimulation",
        "PRP therapy for skin regeneration",
      ],
    },

    // TODO(client): medical review
    chirurgie: {
      short: "Plastic surgery",
      chipLabel: "Plastic surgery",
      title: "Plastic surgery procedures",
      causesLabel: "Common concerns",
      whyLabel: "Good to know",
      intro:
        "Procedures from plastic and aesthetic surgery – planned in a personal consultation, aiming for a natural result.",
      question: {
        text: "Which area are you interested in?",
        options: [
          {
            label: "Eyelids and face",
            causes: [
              "Drooping eyelids and sagging skin of the upper lid",
              "Bags under the eyes",
              "Sagging facial contours",
            ],
            why: "An upper eyelid lift (blepharoplasty) removes excess skin from the upper lid – the eyes look more awake and open.",
          },
          {
            label: "Body contours and fat deposits",
            causes: [
              "Stubborn fat deposits",
              "Volume refreshment with your own fat",
              "Sagging skin after weight loss",
            ],
            why: "In liposuction, fat is removed in a targeted way – processed, it can be used as autologous fat to refresh volume elsewhere.",
          },
          {
            label: "Scars and skin changes",
            causes: [
              "Disturbing or conspicuous scars",
              "Skin and soft-tissue changes",
              "Removal of skin lesions",
            ],
            why: "A thorough, honest and individual consultation is the basis of every procedure – we take time for your wishes and expectations.",
          },
        ],
      },
      diag: "Personal consultation and examination by the specialist in plastic and aesthetic surgery.",
      therapy: [
        "Upper eyelid lift (blepharoplasty)",
        "Liposuction and autologous fat treatment",
        "Scar correction and removal of skin lesions – in cooperation with Isarblick Derma",
      ],
    },

    // TODO(client): medical review
    schnelltest: {
      short: "Rapid tests",
      chipLabel: "Rapid tests on site",
      title: "Rapid lab diagnostics on site",
      causesLabel: "Typical reasons",
      whyLabel: "Good to know",
      intro:
        "A modern point-of-care system allows fast, precise analysis of various parameters directly on site – results in 3 to 15 minutes.",
      question: {
        text: "Which value do you need?",
        options: [
          {
            label: "Inflammation marker before a treatment",
            causes: [
              "CRP (inflammation status)",
              "Checking readiness for treatment before regenerative therapies",
              "Check if an infection is suspected",
            ],
            why: "There should be no acute inflammation before regenerative therapies – the CRP rapid test clarifies this within minutes.",
          },
          {
            label: "Vitamin D",
            causes: [
              "Vitamin D measurement",
              "Monitoring during supplementation",
              "Assessment for tiredness or bone complaints",
            ],
            why: "Vitamin D is important for bones, muscles and the immune system – the value is available in a short time, and the dosage can be discussed directly.",
          },
          {
            label: "Other parameters, e.g. pregnancy test",
            causes: [
              "β-hCG (pregnancy hormone)",
              "Further parameters from whole blood, serum or plasma",
              "Follow-up checks",
            ],
            why: "Because results are available so quickly, diagnostics and treatment can often take place in the same appointment.",
          },
        ],
      },
      diag: "Analysis from whole blood, serum or plasma directly in the practice.",
      therapy: [
        "Fast and safe treatment decisions",
        "Checking readiness for treatment before regenerative therapies",
        "Follow-up monitoring",
      ],
    },
  },
};
