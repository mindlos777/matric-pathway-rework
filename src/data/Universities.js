export const universities = [
  {
    id: "up",
    name: "University of Pretoria",
    shortName: "UP",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/75/University_of_Pretoria_logo.svg",
    image:
      "https://www.up.ac.za/media/shared/legacy/sitefiles/file/44/1028/campus1.jpg",

    // 🎓 Institution Minimum Requirements
    minAPS: 35,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English Home Language or First Additional Language required",
      "Specific subject requirements depend on faculty",
    ],

    // 🗓 Applications Info
    applications: {
      status: "Open",
      closingDate: "30 June 2026",
      applyLink: "https://www.up.ac.za/online-application",
    },

    // 🎓 COURSES OFFERED
    courses: [
      {
        id: "up-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Focuses on software development, AI, data science, and advanced computing systems.",

        minAPS: 36,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "up-bcom-accounting",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        description:
          "Prepares students for careers in accounting, auditing, and financial management.",

        minAPS: 34,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "up-medicine",
        name: "MBChB Medicine",
        field: "Health",
        duration: 6,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
        description:
          "Professional medical degree leading to qualification as a medical doctor.",

        minAPS: 42,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 70 },
          { name: "Life Sciences", min: 70 },
        ],
      },

      {
        id: "up-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        description:
          "Design and construction of infrastructure such as roads, bridges, and buildings.",

        minAPS: 38,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "up-ba-law",
        name: "BA Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description:
          "Foundation in legal studies, preparing students for LLB or legal-related careers.",

        minAPS: 33,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "up-bsc-agri",
        name: "BSc Agriculture",
        field: "Agriculture",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        description:
          "Covers crop science, soil science, and sustainable agricultural practices.",

        minAPS: 32,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "Life Sciences", min: 50 },
        ],
      },

      {
        id: "up-bed",
        name: "Bachelor of Education (BEd)",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        description:
          "Trains future teachers for primary and secondary school education.",

        minAPS: 30,
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "English", min: 50 },
          { name: "Mathematics", min: 40 },
        ],
      },
    ],
  },

  {
    id: "wits",
    name: "University of the Witwatersrand",
    shortName: "Wits",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Wits_University_logo.svg",
    image:
      "https://www.wits.ac.za/media/wits-university-style-assets/images/wits-campus.jpg",

    // 🎓 Institution Minimum Requirements
    minAPS: 34,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English Home Language or First Additional Language required",
      "Faculty-specific subject requirements apply",
    ],

    // 🗓 Applications Info
    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.wits.ac.za/applications/",
    },

    courses: [
      {
        id: "wits-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description:
          "Covers software development, AI, data science and advanced computing.",
        minAPS: 36,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "wits-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Focus on networking, systems, cybersecurity and software solutions.",
        minAPS: 34,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "wits-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Design and development of machines, engines, and industrial systems.",
        minAPS: 38,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "wits-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Covers power systems, electronics, telecommunications and automation.",
        minAPS: 38,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "wits-mbchb",
        name: "MBChB Medicine",
        field: "Health",
        duration: 6,
        demand: "High",
        image: "https://images.unsplash.com/photo-1580281658629-0d79e9c93b0d",
        description: "Professional medical degree to qualify as a doctor.",
        minAPS: 43,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 70 },
          { name: "Life Sciences", min: 70 },
        ],
      },

      {
        id: "wits-bpharm",
        name: "Bachelor of Pharmacy",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
        description: "Study of medicines, pharmaceuticals and patient care.",
        minAPS: 38,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "Physical Science", min: 60 },
          { name: "Life Sciences", min: 60 },
        ],
      },

      {
        id: "wits-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Financial markets, investments, and corporate finance.",
        minAPS: 34,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "wits-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589216532372-1c2a367900f2",
        description: "Combination of business and legal studies.",
        minAPS: 33,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 55 },
        ],
      },

      {
        id: "wits-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description:
          "Understanding human behavior, mental processes and wellbeing.",
        minAPS: 30,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "wits-bed",
        name: "Bachelor of Education",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        description: "Training future teachers for schools.",
        minAPS: 30,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "wits-bsc-geo",
        name: "BSc Geology",
        field: "Science",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description:
          "Study of earth materials, mining and environmental geology.",
        minAPS: 32,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "wits-ba-media",
        name: "BA Media Studies",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Film, journalism, digital media and communication.",
        minAPS: 28,
        applyLink: "https://www.wits.ac.za/applications/",
        subjects: [{ name: "English", min: 55 }],
      },
    ],
  },

  {
    id: "uct",
    name: "University of Cape Town",
    shortName: "UCT",
    type: "University",
    province: "Western Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/79/UCT_logo.svg",
    image:
      "https://www.uct.ac.za/sites/default/files/styles/uct_news_full/public/image_tool/images/104/news/2019/main_campus.jpg",

    minAPS: 36,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English Home Language or First Additional Language required",
      "Faculty point score and subject requirements apply",
    ],

    applications: {
      status: "Open",
      closingDate: "31 July 2026",
      applyLink: "https://www.uct.ac.za/apply",
    },

    courses: [
      // 💻 TECHNOLOGY & SCIENCE
      {
        id: "uct-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
        description: "Programming, AI, data science and advanced computing.",
        minAPS: 38,
        applyLink: "https://www.uct.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "English", min: 55 },
        ],
      },
      {
        id: "uct-bsc-datasci",
        name: "BSc Data Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        description: "Statistics, machine learning and big data analytics.",
        minAPS: 40,
        applyLink: "https://www.uct.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 75 },
          { name: "English", min: 55 },
        ],
      },
      {
        id: "uct-bsc-physics",
        name: "BSc Physics",
        field: "Science",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        description: "Study of matter, energy and the laws of the universe.",
        minAPS: 36,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      // ⚙ ENGINEERING
      {
        id: "uct-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581093588401-22f1b9b37a8b",
        description: "Infrastructure, construction and structural design.",
        minAPS: 42,
        subjects: [
          { name: "Mathematics", min: 75 },
          { name: "Physical Science", min: 70 },
        ],
      },
      {
        id: "uct-beng-comp",
        name: "BEng Computer Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Hardware, software and embedded systems.",
        minAPS: 43,
        subjects: [
          { name: "Mathematics", min: 75 },
          { name: "Physical Science", min: 70 },
        ],
      },

      // 🏥 HEALTH SCIENCES
      {
        id: "uct-mbchb",
        name: "MBChB Medicine",
        field: "Health",
        duration: 6,
        demand: "High",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        description: "Medical degree leading to qualification as a doctor.",
        minAPS: 45,
        subjects: [
          { name: "Mathematics", min: 75 },
          { name: "Physical Science", min: 75 },
          { name: "Life Sciences", min: 75 },
        ],
      },
      {
        id: "uct-bsc-nursing",
        name: "BSc Nursing",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
        description: "Professional nursing and patient care training.",
        minAPS: 34,
        subjects: [
          { name: "Life Sciences", min: 55 },
          { name: "English", min: 50 },
        ],
      },
      {
        id: "uct-bpharm",
        name: "Bachelor of Pharmacy",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
        description: "Medicines, pharmaceutical science and healthcare.",
        minAPS: 40,
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "Physical Science", min: 65 },
          { name: "Life Sciences", min: 60 },
        ],
      },

      // 💼 COMMERCE & BUSINESS
      {
        id: "uct-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        description: "Investments, markets and financial management.",
        minAPS: 36,
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 55 },
        ],
      },
      {
        id: "uct-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
        description: "Financial reporting, auditing and taxation.",
        minAPS: 38,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "English", min: 55 },
        ],
      },

      // ⚖ LAW
      {
        id: "uct-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Professional law degree for legal practice.",
        minAPS: 38,
        subjects: [{ name: "English", min: 65 }],
      },

      // 🎨 HUMANITIES & ARTS
      {
        id: "uct-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, mental health and cognition.",
        minAPS: 32,
        subjects: [{ name: "English", min: 60 }],
      },
      {
        id: "uct-ba-media",
        name: "BA Media & Writing",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Journalism, storytelling and digital communication.",
        minAPS: 30,
        subjects: [{ name: "English", min: 60 }],
      },

      // 🌍 ENVIRONMENT & BUILT ENVIRONMENT
      {
        id: "uct-bsc-env",
        name: "BSc Environmental Science",
        field: "Science",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description: "Climate, sustainability and environmental management.",
        minAPS: 34,
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "Geography", min: 55 },
        ],
      },
    ],
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    shortName: "SU",
    type: "University",
    province: "Western Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Stellenbosch_University_logo.svg",
    image:
      "https://www.sun.ac.za/english/SU-International/PublishingImages/Campus%20Aerial.jpg",

    minAPS: 34,
    institutionRequirements: [
      "National Senior Certificate with Bachelor's Degree pass",
      "English or Afrikaans Home/First Additional Language required",
      "Faculty-specific selection criteria may apply",
    ],

    applications: {
      status: "Open",
      closingDate: "31 July 2026",
      applyLink: "https://www.sun.ac.za/english/apply",
    },

    courses: [
      // 💻 TECHNOLOGY & DATA
      {
        id: "su-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
        description: "Software development, algorithms and AI foundations.",
        minAPS: 36,
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },
      {
        id: "su-bsc-datasci",
        name: "BSc Data Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        description: "Big data, statistics and machine learning.",
        minAPS: 38,
        subjects: [{ name: "Mathematics", min: 70 }],
      },

      // ⚙ ENGINEERING
      {
        id: "su-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
        description: "Design and manufacturing of mechanical systems.",
        minAPS: 40,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },
      {
        id: "su-beng-electrical",
        name: "BEng Electrical & Electronic Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581093588401-22f1b9b37a8b",
        description: "Power systems, electronics and telecommunications.",
        minAPS: 41,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },
      {
        id: "su-beng-industrial",
        name: "BEng Industrial Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092919536-7cfd3d90a74b",
        description: "Optimising systems, logistics and operations.",
        minAPS: 39,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 60 },
        ],
      },

      // 🏥 HEALTH
      {
        id: "su-mbchb",
        name: "MBChB Medicine",
        field: "Health",
        duration: 6,
        demand: "High",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        description: "Medical doctor qualification programme.",
        minAPS: 44,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 70 },
          { name: "Life Sciences", min: 70 },
        ],
      },
      {
        id: "su-bsc-sport",
        name: "BSc Sport Science",
        field: "Health",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1558611848-73f7eb4001ab",
        description: "Human performance, fitness and sport coaching.",
        minAPS: 32,
        subjects: [{ name: "Life Sciences", min: 50 }],
      },

      // 💼 BUSINESS & ECONOMICS
      {
        id: "su-bcom-management",
        name: "BCom Management Sciences",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
        description: "Business management, strategy and leadership.",
        minAPS: 34,
        subjects: [{ name: "Mathematics", min: 55 }],
      },
      {
        id: "su-bcom-econ",
        name: "BCom Economics",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
        description: "Economic theory, finance and data analysis.",
        minAPS: 36,
        subjects: [{ name: "Mathematics", min: 65 }],
      },
      {
        id: "su-bacc",
        name: "BAccounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
        description: "Chartered accounting pathway.",
        minAPS: 38,
        subjects: [{ name: "Mathematics", min: 70 }],
      },

      // ⚖ LAW
      {
        id: "su-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Professional legal studies degree.",
        minAPS: 35,
        subjects: [{ name: "English", min: 60 }],
      },

      // 🎨 ARTS & SOCIAL SCIENCES
      {
        id: "su-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Behaviour, cognition and mental processes.",
        minAPS: 30,
        subjects: [{ name: "English", min: 55 }],
      },
      {
        id: "su-ba-intrel",
        name: "BA International Studies",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        description: "Global politics, development and diplomacy.",
        minAPS: 30,
        subjects: [{ name: "English", min: 55 }],
      },

      // 🌱 AGRICULTURE & ENVIRONMENT
      {
        id: "su-bsc-agri",
        name: "BSc Agriculture",
        field: "Agriculture",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
        description: "Crop science, soil science and food production.",
        minAPS: 32,
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "Life Sciences", min: 50 },
        ],
      },
      {
        id: "su-bsc-forestry",
        name: "BSc Forestry",
        field: "Environmental",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description: "Forest management and conservation science.",
        minAPS: 30,
        subjects: [{ name: "Life Sciences", min: 50 }],
      },

      // 🧠 EDUCATION
      {
        id: "su-bed-foundation",
        name: "BEd Foundation Phase Teaching",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        description: "Teaching young learners (Grade R–3).",
        minAPS: 30,
        subjects: [{ name: "English", min: 55 }],
      },
      {
        id: "su-bed-intermediate",
        name: "BEd Intermediate Phase Teaching",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        description: "Teaching Grades 4–7.",
        minAPS: 30,
        subjects: [{ name: "English", min: 55 }],
      },
    ],
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    shortName: "UKZN",
    type: "University",
    province: "KwaZulu-Natal",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f3/UKZN_logo.svg",
    image: "https://www.ukzn.ac.za/wp-content/uploads/2022/02/Main-Campus.jpg",

    // 📊 Institution Minimum Requirements
    minAPS: 32,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor’s Degree pass",
      "English Home/First Additional Language required",
      "Subject prerequisites depend on faculty/program",
    ],

    // 📅 Application Info
    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.ukzn.ac.za/apply",
    },

    // 🎓 Courses Offered
    courses: [
      // 💻 TECHNOLOGY
      {
        id: "ukzn-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "Software development, algorithms, systems and computing.",
        minAPS: 34,
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },
      {
        id: "ukzn-bsc-information-tech",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "IT systems, networking, databases and cybersecurity.",
        minAPS: 32,
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      // ⚙ ENGINEERING
      {
        id: "ukzn-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
        description: "Infrastructure design, construction and planning.",
        minAPS: 38,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },
      {
        id: "ukzn-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description: "Power systems, electronics, telecommunications.",
        minAPS: 39,
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      // 🏥 HEALTH SCIENCES
      {
        id: "ukzn-bpharm",
        name: "Bachelor of Pharmacy",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
        description: "Medicinal science and community healthcare practice.",
        minAPS: 36,
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "Physical Science", min: 60 },
          { name: "Life Sciences", min: 60 },
        ],
      },
      {
        id: "ukzn-nursing",
        name: "BSc Nursing",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
        description: "Professional nurse training and clinical care.",
        minAPS: 32,
        subjects: [
          { name: "Life Sciences", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      // 💼 BUSINESS & MANAGEMENT
      {
        id: "ukzn-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Financial markets, investment and corporate finance.",
        minAPS: 33,
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },
      {
        id: "ukzn-bcom-marketing",
        name: "BCom Marketing Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        description:
          "Branding, digital marketing, strategy and consumer research.",
        minAPS: 32,
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      // ⚖ LAW
      {
        id: "ukzn-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Legal studies and preparation for LLB.",
        minAPS: 35,
        subjects: [{ name: "English", min: 60 }],
      },

      // 🎨 HUMANITIES
      {
        id: "ukzn-ba-psychology",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, well-being and cognition.",
        minAPS: 30,
        subjects: [{ name: "English", min: 55 }],
      },
      {
        id: "ukzn-ba-sociology",
        name: "BA Sociology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Study of society, social change and structures.",
        minAPS: 30,
        subjects: [{ name: "English", min: 50 }],
      },

      // 🧠 EDUCATION
      {
        id: "ukzn-bed-foundation",
        name: "BEd Foundation Phase Teaching",
        field: "Education",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        description: "Teaching of young learners (Grade R–3).",
        minAPS: 30,
        subjects: [{ name: "English", min: 50 }],
      },
      {
        id: "ukzn-bed-intermediate",
        name: "BEd Intermediate Phase Teaching",
        field: "Education",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        description: "Teaching of intermediate learners (Grades 4–7).",
        minAPS: 30,
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "nwu",
    name: "North-West University",
    shortName: "NWU",
    type: "University",
    province: "North West",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/North-West_University_logo.svg",
    image:
      "https://www.nwu.ac.za/sites/www.nwu.ac.za/files/images/campus-potchefstroom.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Specific faculties may require Mathematics or Physical Sciences",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.nwu.ac.za/apply",
    },

    courses: [
      {
        id: "nwu-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, databases, networking and cybersecurity.",
        minAPS: 32,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Algorithms, AI, data science and advanced programming.",
        minAPS: 34,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power systems, electronics, telecommunications and automation.",
        minAPS: 36,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "nwu-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description: "Mechanical systems, manufacturing and industrial design.",
        minAPS: 36,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "nwu-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        description: "Financial accounting, auditing and taxation.",
        minAPS: 32,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Business management combined with legal studies.",
        minAPS: 30,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 55 },
        ],
      },

      {
        id: "nwu-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588776814546-ec7e7b0f4e5f",
        description: "Professional law degree for legal practice.",
        minAPS: 33,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 60 }],
      },

      {
        id: "nwu-bsc-nursing",
        name: "BSc Nursing",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nursing and healthcare training.",
        minAPS: 34,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Life Sciences", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-bed",
        name: "Bachelor of Education",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        description: "Training teachers for primary and secondary schools.",
        minAPS: 28,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "nwu-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
        description: "Human behaviour, counselling foundations and research.",
        minAPS: 28,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "nwu-bsc-agri",
        name: "BSc Agriculture",
        field: "Agriculture",
        duration: 4,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
        description:
          "Crop production, animal science and agricultural management.",
        minAPS: 30,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Life Sciences", min: 50 },
        ],
      },

      {
        id: "nwu-ba-comm",
        name: "BA Communication",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        description:
          "Media, journalism, public relations and digital communication.",
        minAPS: 26,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },
    ],
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    shortName: "UJ",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/24/University_of_Johannesburg_logo.svg",
    image:
      "https://www.uj.ac.za/wp-content/uploads/2021/10/uj-auckland-park-kingsway-campus.jpg",

    minAPS: 26,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English required as Home or First Additional Language",
      "Mathematics required for science, commerce and engineering programmes",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.uj.ac.za/apply/",
    },

    courses: [
      {
        id: "uj-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        description:
          "Programming, AI, data science and advanced computing systems.",
        minAPS: 34,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "uj-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        description:
          "Infrastructure design, construction and environmental engineering.",
        minAPS: 37,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "uj-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "Power engineering, electronics and telecommunications.",
        minAPS: 37,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "uj-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
        description:
          "Financial accounting, auditing and management accounting.",
        minAPS: 32,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "uj-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Investments, financial planning and corporate finance.",
        minAPS: 30,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "uj-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description:
          "Professional law degree for legal practice in South Africa.",
        minAPS: 33,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [{ name: "English", min: 60 }],
      },

      {
        id: "uj-bsc-biomed",
        name: "BSc Biomedical Science",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091012184-5c8c3f1f4c2b",
        description:
          "Human biology, disease processes and medical laboratory science.",
        minAPS: 34,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "Life Sciences", min: 60 },
        ],
      },

      {
        id: "uj-bpharm",
        name: "Bachelor of Pharmacy",
        field: "Health",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
        description:
          "Medicines, clinical pharmacy and pharmaceutical sciences.",
        minAPS: 36,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "Physical Science", min: 60 },
          { name: "Life Sciences", min: 60 },
        ],
      },

      {
        id: "uj-bed",
        name: "Bachelor of Education",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        description:
          "Teacher training for foundation, intermediate and senior phases.",
        minAPS: 26,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "uj-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
        description:
          "Psychological theory, counselling basics and research skills.",
        minAPS: 28,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "uj-ba-film",
        name: "BA Film & Television",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
        description: "Film production, screenwriting and television studies.",
        minAPS: 27,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "uj-bsc-sport",
        name: "BSc Sport & Exercise Science",
        field: "Health",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
        description: "Human movement science, coaching and sport performance.",
        minAPS: 28,
        applyLink: "https://www.uj.ac.za/apply/",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "ru",
    name: "Rhodes University",
    shortName: "RU",
    type: "University",
    province: "Eastern Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/Rhodes_University_logo.svg",
    image: "https://www.ru.ac.za/media/rhodesuniversity/images/campus1.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English required as Home or First Additional Language",
      "Some courses require Mathematics or Physical Sciences",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.ru.ac.za/apply",
    },

    courses: [
      {
        id: "ru-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581090700227-0f6f3d2f49b0",
        description:
          "Programming, AI, data structures, algorithms, and software engineering.",
        minAPS: 33,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ru-bsc-math",
        name: "BSc Mathematics",
        field: "Science",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description:
          "Pure and applied mathematics including statistics and modeling.",
        minAPS: 32,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ru-bsc-physics",
        name: "BSc Physics",
        field: "Science",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        description:
          "Mechanics, quantum physics, electronics and astrophysics.",
        minAPS: 32,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "ru-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description:
          "Financial accounting, auditing and management principles.",
        minAPS: 30,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ru-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Financial markets, corporate finance, and investments.",
        minAPS: 28,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ru-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588776814546-ec7e7b0f4e5f",
        description:
          "Legal theory, constitutional law, and professional legal training.",
        minAPS: 33,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [{ name: "English", min: 60 }],
      },

      {
        id: "ru-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, mental processes and counseling basics.",
        minAPS: 28,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "ru-ba-journalism",
        name: "BA Journalism",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        description:
          "Print, digital and broadcast journalism with reporting skills.",
        minAPS: 27,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "ru-bed",
        name: "Bachelor of Education",
        field: "Education",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        description: "Teacher training for primary and secondary education.",
        minAPS: 28,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "ru-bsc-biology",
        name: "BSc Biological Sciences",
        field: "Science",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description: "Study of plants, animals, and ecosystems.",
        minAPS: 30,
        applyLink: "https://www.ru.ac.za/apply",
        subjects: [
          { name: "Life Sciences", min: 60 },
          { name: "Mathematics", min: 50 },
        ],
      },
    ],
  },
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    shortName: "CPUT",
    type: "University of Technology",
    province: "Western Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/CPUT_Logo.svg",
    image: "https://www.cput.ac.za/sites/default/files/campus_image.jpg",

    minAPS: 25,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Diploma or Bachelor's pass depending on course",
      "English proficiency required",
      "Specific courses may require Mathematics or Physical Sciences",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.cput.ac.za/apply",
    },

    courses: [
      {
        id: "cput-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Networking, programming, cybersecurity, and database management.",
        minAPS: 32,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "cput-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        description:
          "Construction, structural engineering and infrastructure planning.",
        minAPS: 35,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "cput-bsc-electrical",
        name: "BSc Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power generation, electronics, and renewable energy systems.",
        minAPS: 36,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "cput-bcom-accounting",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, taxation and financial management.",
        minAPS: 30,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "cput-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nursing training for clinics and hospitals.",
        minAPS: 28,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Life Sciences", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "cput-dip-hospitality",
        name: "Diploma in Hospitality Management",
        field: "Business & Tourism",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1542327897-8db3f8730b32",
        description:
          "Hotel management, tourism operations and customer service.",
        minAPS: 25,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "cput-dip-cookery",
        name: "Diploma in Culinary Arts",
        field: "Hospitality & Arts",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1516684669134-de6f38f84d31",
        description:
          "Professional cookery, kitchen operations, and food presentation.",
        minAPS: 25,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "cput-dip-mech",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 28,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "cput-dip-graphic",
        name: "Diploma in Graphic Design",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
        description: "Visual design, illustration, and digital media skills.",
        minAPS: 26,
        applyLink: "https://www.cput.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "varsity-college",
    name: "Varsity College",
    shortName: "VC",
    type: "Private University",
    province: "Multiple Campuses (National)",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Varsity_College_Logo.png",
    image: "https://www.varsitycollege.co.za/media/1280x720/VC-campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Diploma or Bachelor's pass",
      "English proficiency required",
      "Course-specific subject requirements may apply",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.varsitycollege.co.za/apply",
    },

    courses: [
      {
        id: "vc-bcom-marketing",
        name: "BCom Marketing",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description:
          "Marketing principles, digital marketing, branding and market research.",
        minAPS: 26,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vc-bcom-hr",
        name: "BCom Human Resource Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "HR strategy, labour law, recruitment and employee management.",
        minAPS: 25,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "vc-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description:
          "Accounting, auditing, taxation, and financial management.",
        minAPS: 28,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vc-bba",
        name: "Bachelor of Business Administration",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "General business management, leadership, and entrepreneurship.",
        minAPS: 25,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "vc-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Law fundamentals with business context.",
        minAPS: 25,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "vc-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Networking, programming, software development, and IT systems.",
        minAPS: 28,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vc-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, algorithms, AI, and software engineering.",
        minAPS: 30,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vc-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description:
          "Psychological theory, human behavior, and counseling basics.",
        minAPS: 26,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "vc-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Financial planning, investments, and corporate finance.",
        minAPS: 26,
        applyLink: "https://www.varsitycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    shortName: "DUT",
    type: "University of Technology",
    province: "KwaZulu-Natal",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/DUT_Logo.png",
    image: "https://www.dut.ac.za/sites/default/files/campus_image.jpg",

    minAPS: 25,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Diploma or Bachelor's pass depending on course",
      "English proficiency required",
      "Some courses require Mathematics or Physical Science",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.dut.ac.za/apply",
    },

    courses: [
      {
        id: "dut-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 32,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "dut-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, AI, algorithms, and software engineering.",
        minAPS: 34,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "dut-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description: "Mechanical systems, design, and industrial engineering.",
        minAPS: 36,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "dut-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        description:
          "Construction, infrastructure design, and environmental engineering.",
        minAPS: 36,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "dut-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Financial accounting, auditing, and business management.",
        minAPS: 30,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "dut-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Investments, financial markets, and corporate finance.",
        minAPS: 28,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "dut-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Training nurses for clinics and hospitals.",
        minAPS: 28,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Life Sciences", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "dut-dip-hospitality",
        name: "Diploma in Hospitality Management",
        field: "Business & Tourism",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1542327897-8db3f8730b32",
        description:
          "Hotel operations, tourism management, and customer service.",
        minAPS: 25,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "dut-dip-mech",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 28,
        applyLink: "https://www.dut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "Physical Science", min: 50 },
        ],
      },
    ],
  },
  {
    id: "monash-sa",
    name: "Monash South Africa",
    shortName: "Monash SA",
    type: "Private University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2e/Monash_University_logo.svg",
    image: "https://www.monash.ac.za/images/campus.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Course-specific subject requirements may apply",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.monash.ac.za/apply",
    },

    courses: [
      {
        id: "monash-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, taxation and financial management.",
        minAPS: 30,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "monash-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Corporate finance, investments and financial analysis.",
        minAPS: 28,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "monash-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "IT systems, networking, software development and cybersecurity.",
        minAPS: 32,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "monash-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, AI, algorithms and software engineering.",
        minAPS: 34,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "monash-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description:
          "Business-oriented law degree with practical legal training.",
        minAPS: 26,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "monash-llb",
        name: "Bachelor of Laws (LLB)",
        field: "Law",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1588776814546-ec7e7b0f4e5f",
        description: "Comprehensive professional law degree.",
        minAPS: 30,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [{ name: "English", min: 60 }],
      },

      {
        id: "monash-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, counselling, and psychological research.",
        minAPS: 28,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "monash-bsc-business-info-sys",
        name: "BSc Business Information Systems",
        field: "Technology & Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581090700227-0f6f3d2f49b0",
        description: "IT systems applied to business processes and analytics.",
        minAPS: 28,
        applyLink: "https://www.monash.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "tshwane-south-tvet",
    name: "Tshwane South TVET College",
    shortName: "Tshwane South",
    type: "TVET College",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Tshwane_South_TVET_Logo.png",
    image: "https://www.tshwanesouthcollege.co.za/campus_image.jpg",

    minAPS: 20,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.tshwanesouthcollege.co.za/apply",
    },

    courses: [
      {
        id: "tshwane-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nurse training for hospitals and clinics.",
        minAPS: 25,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tshwane-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshop skills, and industrial maintenance.",
        minAPS: 22,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "tshwane-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power systems, electronics, and industrial installations.",
        minAPS: 22,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "tshwane-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and systems management.",
        minAPS: 25,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tshwane-dip-hospitality",
        name: "Diploma in Hospitality Management",
        field: "Hospitality & Tourism",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1542327897-8db3f8730b32",
        description:
          "Hotel operations, tourism management, and customer service.",
        minAPS: 20,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "tshwane-dip-catering",
        name: "Diploma in Culinary Arts",
        field: "Hospitality & Arts",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1516684669134-de6f38f84d31",
        description:
          "Professional cookery, kitchen operations, and food presentation.",
        minAPS: 20,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "tshwane-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, business operations, and office management.",
        minAPS: 22,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tshwane-dip-ict-support",
        name: "Diploma in ICT Support",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description: "Hardware, software, networking, and IT support services.",
        minAPS: 22,
        applyLink: "https://www.tshwanesouthcollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "milpark",
    name: "Milpark Education",
    shortName: "Milpark",
    type: "Private College",
    province: "Gauteng (Online & On-Campus)",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Milpark_Education_Logo.png",
    image: "https://www.milpark.ac.za/images/campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Accounting",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.milpark.ac.za/apply",
    },

    courses: [
      {
        id: "milpark-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description:
          "Accounting, auditing, taxation, and financial management.",
        minAPS: 28,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "Corporate finance, investment analysis, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-bba",
        name: "Bachelor of Business Administration",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "General business management, leadership, and entrepreneurship.",
        minAPS: 25,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "milpark-bcom-marketing",
        name: "BCom Marketing",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description:
          "Marketing strategy, digital marketing, branding, and consumer behavior.",
        minAPS: 25,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 28,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, algorithms, AI, and software development.",
        minAPS: 30,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nursing training for hospitals and clinics.",
        minAPS: 25,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "milpark-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and small business operations.",
        minAPS: 22,
        applyLink: "https://www.milpark.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "false-bay-tvet",
    name: "False Bay TVET College",
    shortName: "False Bay",
    type: "TVET College",
    province: "Western Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/97/False_Bay_TVET_Logo.png",
    image: "https://www.falsebaycollege.co.za/campus_image.jpg",

    minAPS: 20,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.falsebaycollege.co.za/apply",
    },

    courses: [
      {
        id: "falsebay-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Training nurses for hospitals and clinics.",
        minAPS: 25,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "falsebay-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Electrical systems, installations, and industrial wiring.",
        minAPS: 22,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "falsebay-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 22,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "falsebay-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems support.",
        minAPS: 25,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "falsebay-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and business operations.",
        minAPS: 22,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "falsebay-dip-hospitality",
        name: "Diploma in Hospitality Management",
        field: "Hospitality & Tourism",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1542327897-8db3f8730b32",
        description:
          "Hotel management, tourism operations, and customer service.",
        minAPS: 20,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "falsebay-dip-ict-support",
        name: "Diploma in ICT Support",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description: "Hardware, software, networking, and IT support services.",
        minAPS: 22,
        applyLink: "https://www.falsebaycollege.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "regenesys",
    name: "Regenesys Business School",
    shortName: "Regenesys",
    type: "Private College",
    province: "Gauteng (Online & On-Campus)",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/50/Regenesys_Logo.png",
    image: "https://www.regenesys.co.za/images/campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Accounting",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.regenesys.co.za/apply",
    },

    courses: [
      {
        id: "regenesys-bba",
        name: "Bachelor of Business Administration",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Business management, entrepreneurship, and leadership development.",
        minAPS: 25,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "regenesys-bcom-hr",
        name: "BCom Human Resource Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "Labour law, recruitment, employee relations, and HR strategy.",
        minAPS: 25,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "regenesys-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Corporate finance, investments, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "regenesys-bcom-marketing",
        name: "BCom Marketing",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description:
          "Marketing strategy, digital marketing, and consumer behavior.",
        minAPS: 25,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "regenesys-dip-project-mgmt",
        name: "Diploma in Project Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description: "Project planning, execution, and risk management.",
        minAPS: 22,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "regenesys-dip-ict",
        name: "Diploma in Information and Communication Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "Networking, software development, and IT support skills.",
        minAPS: 24,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "regenesys-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and business operations.",
        minAPS: 22,
        applyLink: "https://www.regenesys.co.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "nwu",
    name: "North-West University",
    shortName: "NWU",
    type: "University",
    province: "North West",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/North-West_University_Logo.png",
    image:
      "https://www.nwu.ac.za/sites/default/files/styles/campus_image/public/campus.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Faculty-specific subject requirements may apply",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.nwu.ac.za/apply",
    },

    courses: [
      {
        id: "nwu-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, AI, algorithms, and software development.",
        minAPS: 32,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "IT systems, networking, and software development.",
        minAPS: 30,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description: "Mechanical systems, design, and industrial engineering.",
        minAPS: 36,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "nwu-beng-civil",
        name: "BEng Civil Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        description:
          "Construction, infrastructure design, and environmental engineering.",
        minAPS: 36,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "nwu-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Financial accounting, auditing, and business management.",
        minAPS: 30,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Investments, financial planning, and corporate finance.",
        minAPS: 28,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "nwu-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, counseling, and psychological research.",
        minAPS: 28,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "nwu-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Business-focused legal studies.",
        minAPS: 26,
        applyLink: "https://www.nwu.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },
    ],
  },
  {
    id: "richfield",
    name: "Richfield Graduate Institute of Technology",
    shortName: "Richfield",
    type: "Private College",
    province: "Gauteng (Online & On-Campus)",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Richfield_Logo.png",
    image: "https://www.richfield.ac.za/images/campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some courses may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.richfield.ac.za/apply",
    },

    courses: [
      {
        id: "richfield-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 28,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "richfield-bsc-cs",
        name: "BSc Computer Science",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        description: "Programming, AI, algorithms, and software engineering.",
        minAPS: 30,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "richfield-dip-networking",
        name: "Diploma in Networking",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581090700227-0f6f3d2f49b0",
        description:
          "Network setup, administration, and cybersecurity fundamentals.",
        minAPS: 24,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "richfield-dip-web-dev",
        name: "Diploma in Web Development",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description:
          "Frontend, backend, and full-stack web development skills.",
        minAPS: 24,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "richfield-dip-graphic-design",
        name: "Diploma in Graphic Design",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Digital design, branding, and visual communication.",
        minAPS: 22,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "richfield-dip-ict-support",
        name: "Diploma in ICT Support",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "Hardware, software, networking, and IT support services.",
        minAPS: 22,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "richfield-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and small business operations.",
        minAPS: 22,
        applyLink: "https://www.richfield.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "rosebank",
    name: "Rosebank College",
    shortName: "Rosebank",
    type: "Private College",
    province: "Gauteng (Multiple Campuses & Online)",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Rosebank_College_Logo.png",
    image: "https://www.rosebankcollege.ac.za/images/campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics, Accounting, or Science",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.rosebankcollege.ac.za/apply",
    },

    courses: [
      {
        id: "rosebank-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, and financial management skills.",
        minAPS: 28,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "rosebank-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Corporate finance, investments, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "rosebank-bcom-marketing",
        name: "BCom Marketing",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description:
          "Marketing strategy, digital marketing, and consumer behavior.",
        minAPS: 25,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "rosebank-bba",
        name: "Bachelor of Business Administration",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Business management, leadership, and entrepreneurship skills.",
        minAPS: 25,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "rosebank-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems management.",
        minAPS: 25,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "rosebank-dip-web-dev",
        name: "Diploma in Web Development",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description:
          "Frontend, backend, and full-stack web development skills.",
        minAPS: 24,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "rosebank-dip-graphic-design",
        name: "Diploma in Graphic Design",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Digital design, branding, and visual communication.",
        minAPS: 22,
        applyLink: "https://www.rosebankcollege.ac.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "eduvos",
    name: "Eduvos",
    shortName: "Eduvos",
    type: "Private College",
    province: "Gauteng (Multiple Campuses & Online)",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/85/Eduvos_Logo.png",
    image: "https://www.eduvos.com/images/campus.jpg",

    minAPS: 24,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some courses may require Mathematics, Accounting, or Science",
    ],

    applications: {
      status: "Open",
      closingDate: "31 October 2026",
      applyLink: "https://www.eduvos.com/apply",
    },

    courses: [
      {
        id: "eduvos-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, and financial management skills.",
        minAPS: 28,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eduvos-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description: "Corporate finance, investments, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eduvos-bcom-marketing",
        name: "BCom Marketing",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description:
          "Marketing strategy, digital marketing, and consumer behavior.",
        minAPS: 25,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "eduvos-bba",
        name: "Bachelor of Business Administration",
        field: "Business",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Business management, leadership, and entrepreneurship skills.",
        minAPS: 25,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "eduvos-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 28,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eduvos-dip-web-dev",
        name: "Diploma in Web Development",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        description:
          "Frontend, backend, and full-stack web development skills.",
        minAPS: 24,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eduvos-dip-graphic-design",
        name: "Diploma in Graphic Design",
        field: "Arts & Media",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Digital design, branding, and visual communication.",
        minAPS: 22,
        applyLink: "https://www.eduvos.com/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "tut",
    name: "Tshwane University of Technology",
    shortName: "TUT",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Tshwane_University_of_Technology_Logo.png",
    image: "https://www.tut.ac.za/images/campus.jpg",

    minAPS: 30,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Some programs may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.tut.ac.za/apply",
    },

    courses: [
      {
        id: "tut-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 32,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tut-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power systems, electronics, telecommunications, and automation.",
        minAPS: 36,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "tut-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description: "Mechanical systems, design, and industrial engineering.",
        minAPS: 36,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "tut-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Financial accounting, auditing, and business management.",
        minAPS: 30,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tut-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "Corporate finance, investment analysis, and financial planning.",
        minAPS: 28,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "tut-ba-psych",
        name: "BA Psychology",
        field: "Humanities",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "Human behavior, counseling, and mental health studies.",
        minAPS: 28,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },

      {
        id: "tut-bcom-law",
        name: "BCom Law",
        field: "Law",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
        description: "Combination of business and legal studies.",
        minAPS: 30,
        applyLink: "https://www.tut.ac.za/apply",
        subjects: [{ name: "English", min: 55 }],
      },
    ],
  },
  {
    id: "boland-tvet",
    name: "Boland College",
    shortName: "Boland",
    type: "TVET College",
    province: "Western Cape",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/Boland_College_Logo.png",
    image: "https://www.bolandcollege.edu.za/images/campus.jpg",

    minAPS: 20,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Science",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.bolandcollege.edu.za/apply",
    },

    courses: [
      {
        id: "boland-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Training nurses for hospitals and clinics.",
        minAPS: 25,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "boland-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Electrical systems, installations, and industrial wiring.",
        minAPS: 22,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "boland-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 22,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "boland-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems support.",
        minAPS: 25,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "boland-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and business operations.",
        minAPS: 22,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },

      {
        id: "boland-dip-hospitality",
        name: "Diploma in Hospitality Management",
        field: "Hospitality & Tourism",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1542327897-8db3f8730b32",
        description:
          "Hotel management, tourism operations, and customer service.",
        minAPS: 20,
        applyLink: "https://www.bolandcollege.edu.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "swgc-tvet",
    name: "South West Gauteng TVET College",
    shortName: "SWGC",
    type: "TVET College",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/14/SWGC_Logo.png",
    image: "https://www.swgc.edu.za/images/campus.jpg",

    minAPS: 18,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Science",
    ],

    applications: {
      status: "Open",
      closingDate: "30 September 2026",
      applyLink: "https://www.swgc.edu.za/apply",
    },

    courses: [
      {
        id: "swgc-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Training nurses for hospitals and clinics.",
        minAPS: 22,
        applyLink: "https://www.swgc.edu.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "swgc-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Electrical systems, installations, and industrial wiring.",
        minAPS: 20,
        applyLink: "https://www.swgc.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "swgc-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 20,
        applyLink: "https://www.swgc.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "swgc-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems support.",
        minAPS: 22,
        applyLink: "https://www.swgc.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "swgc-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Entrepreneurship, office management, and business operations.",
        minAPS: 20,
        applyLink: "https://www.swgc.edu.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    shortName: "VUT",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/95/VUT_Logo.png",
    image: "https://www.vut.ac.za/images/campus.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Some programs may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Closed",
      closingDate: "30 September 2025",
      applyLink: "https://www.vut.ac.za/apply",
    },

    courses: [
      {
        id: "vut-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 30,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vut-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power systems, electronics, telecommunications, and automation.",
        minAPS: 36,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "vut-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description: "Mechanical systems, design, and industrial maintenance.",
        minAPS: 36,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "vut-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, and financial management.",
        minAPS: 28,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vut-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "Corporate finance, investment analysis, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    shortName: "VUT",
    type: "University",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/95/VUT_Logo.png",
    image: "https://www.vut.ac.za/images/campus.jpg",

    minAPS: 28,
    institutionRequirements: [
      "National Senior Certificate (NSC) with Bachelor's Degree pass",
      "English proficiency required",
      "Some programs may require Mathematics or Physical Science",
    ],

    applications: {
      status: "Closed",
      closingDate: "30 September 2025",
      applyLink: "https://www.vut.ac.za/apply",
    },

    courses: [
      {
        id: "vut-bsc-it",
        name: "BSc Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description:
          "Software development, networking, and IT systems management.",
        minAPS: 30,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vut-beng-electrical",
        name: "BEng Electrical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Power systems, electronics, telecommunications, and automation.",
        minAPS: 36,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "vut-beng-mech",
        name: "BEng Mechanical Engineering",
        field: "Engineering",
        duration: 4,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description: "Mechanical systems, design, and industrial maintenance.",
        minAPS: 36,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 65 },
        ],
      },

      {
        id: "vut-bcom-acc",
        name: "BCom Accounting",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
        description: "Accounting, auditing, and financial management.",
        minAPS: 28,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "vut-bcom-finance",
        name: "BCom Finance",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1565372910946-5b1fdd6d8e14",
        description:
          "Corporate finance, investment analysis, and financial planning.",
        minAPS: 26,
        applyLink: "https://www.vut.ac.za/apply",
        subjects: [
          { name: "Mathematics", min: 55 },
          { name: "English", min: 50 },
        ],
      },
    ],
  },
  {
    id: "eest-tvet",
    name: "Ekurhuleni East TVET College",
    shortName: "Ekurhuleni East",
    type: "TVET College",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Ekurhuleni_East_TVET_Logo.png",
    image: "https://www.eekg.edu.za/images/campus.jpg",

    minAPS: 18,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Science",
    ],

    applications: {
      status: "Closed",
      closingDate: "30 September 2025",
      applyLink: "https://www.eekg.edu.za/apply",
    },

    courses: [
      {
        id: "eest-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nurse training for hospitals and clinics.",
        minAPS: 22,
        applyLink: "https://www.eekg.edu.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eest-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Electrical systems, wiring, and industrial installations.",
        minAPS: 20,
        applyLink: "https://www.eekg.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "eest-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 20,
        applyLink: "https://www.eekg.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "eest-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems support.",
        minAPS: 22,
        applyLink: "https://www.eekg.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "eest-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Business operations, office management, and entrepreneurship.",
        minAPS: 20,
        applyLink: "https://www.eekg.edu.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
  {
    id: "ewt-tvet",
    name: "Ekurhuleni West TVET College",
    shortName: "Ekurhuleni West",
    type: "TVET College",
    province: "Gauteng",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Ekurhuleni_West_TVET_Logo.png",
    image: "https://www.ewt.edu.za/images/campus.jpg",

    minAPS: 18,
    institutionRequirements: [
      "National Senior Certificate (NSC) or equivalent",
      "English proficiency required",
      "Some programs may require Mathematics or Science",
    ],

    applications: {
      status: "Closed",
      closingDate: "30 September 2025",
      applyLink: "https://www.ewt.edu.za/apply",
    },

    courses: [
      {
        id: "ewt-dip-nursing",
        name: "Diploma in Nursing",
        field: "Health",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
        description: "Professional nurse training for hospitals and clinics.",
        minAPS: 22,
        applyLink: "https://www.ewt.edu.za/apply",
        subjects: [
          { name: "Life Sciences", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ewt-dip-electrical",
        name: "Diploma in Electrical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        description:
          "Electrical systems, installations, and industrial wiring.",
        minAPS: 20,
        applyLink: "https://www.ewt.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "ewt-dip-mechanical",
        name: "Diploma in Mechanical Engineering",
        field: "Engineering",
        duration: 3,
        demand: "Medium",
        image: "https://images.unsplash.com/photo-1581091870622-1e7b6c2c3e9a",
        description:
          "Mechanical systems, workshops, and industrial maintenance.",
        minAPS: 20,
        applyLink: "https://www.ewt.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "Physical Science", min: 50 },
        ],
      },

      {
        id: "ewt-dip-it",
        name: "Diploma in Information Technology",
        field: "Technology",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description:
          "Networking, software development, and IT systems support.",
        minAPS: 22,
        applyLink: "https://www.ewt.edu.za/apply",
        subjects: [
          { name: "Mathematics", min: 50 },
          { name: "English", min: 50 },
        ],
      },

      {
        id: "ewt-dip-business-mgmt",
        name: "Diploma in Business Management",
        field: "Business",
        duration: 3,
        demand: "High",
        image: "https://images.unsplash.com/photo-1581092160607-ee22731b54b3",
        description:
          "Business operations, office management, and entrepreneurship.",
        minAPS: 20,
        applyLink: "https://www.ewt.edu.za/apply",
        subjects: [{ name: "English", min: 50 }],
      },
    ],
  },
];
