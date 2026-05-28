export const courseData = [
  // ================= TECHNOLOGY =================
  {
    id: "bsc-computer-science",
    name: "BSc Computer Science",
    field: "Technology",
    duration: 3,
    nqfLevel: 7,
    demand: "High",
    minAPS: 32,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",

    subjects: [
      { name: "Mathematics", min: 70 },
      { name: "Physical Science", min: 60 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "uct" },
      { universityId: "stellenbosch" },
      { universityId: "up" },
    ],
  },

  {
    id: "beng-software-engineering",
    name: "BEng Software Engineering",
    field: "Technology",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 38,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",

    subjects: [
      { name: "Mathematics", min: 75 },
      { name: "Physical Science", min: 65 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "stellenbosch" },
    ],
  },

  {
    id: "diploma-it",
    name: "Diploma in Information Technology",
    field: "Technology",
    duration: 3,
    nqfLevel: 6,
    demand: "High",
    minAPS: 28,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

    subjects: [
      { name: "Mathematics", min: 50 },
      { name: "English", min: 50 },
    ],

    offeredAt: [
      { universityId: "tut" },
      { universityId: "cput" },
      { universityId: "dut" },
    ],
  },

  // ================= BUSINESS =================
  {
    id: "bcom-accounting",
    name: "BCom Accounting",
    field: "Business",
    duration: 3,
    nqfLevel: 7,
    demand: "High",
    minAPS: 34,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",

    subjects: [
      { name: "Mathematics", min: 60 },
      { name: "English", min: 55 },
    ],

    offeredAt: [
      { universityId: "uct" },
      { universityId: "wits" },
      { universityId: "uj" },
      { universityId: "up" },
    ],
  },

  {
    id: "bcom-business-management",
    name: "BCom Business Management",
    field: "Business",
    duration: 3,
    nqfLevel: 7,
    demand: "Medium",
    minAPS: 30,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",

    subjects: [
      { name: "Mathematics", min: 50 },
      { name: "English", min: 50 },
    ],

    offeredAt: [
      { universityId: "uj" },
      { universityId: "unisa" },
    ],
  },

  // ================= HEALTH =================
  {
    id: "bsc-nursing",
    name: "BSc Nursing",
    field: "Health",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 30,
    image: "https://images.unsplash.com/photo-1580281657521-6c7c0c5a0c2c",

    subjects: [
      { name: "Life Sciences", min: 60 },
      { name: "English", min: 50 },
    ],

    offeredAt: [
      { universityId: "uct" },
      { universityId: "wits" },
      { universityId: "ukzn" },
    ],
  },
  {
    id: "bsc-physiotherapy",
    name: "BSc Physiotherapy",
    field: "Health",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 36,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",

    subjects: [
      { name: "Life Sciences", min: 65 },
      { name: "Physical Science", min: 60 },
      { name: "English", min: 55 },
    ],

    offeredAt: [
      { universityId: "uct" },
      { universityId: "wits" },
      { universityId: "ukzn" },
    ],
  },

  {
    id: "bsc-radiography",
    name: "BSc Radiography",
    field: "Health",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 32,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",

    subjects: [
      { name: "Life Sciences", min: 60 },
      { name: "Physical Science", min: 55 },
      { name: "English", min: 50 },
    ],

    offeredAt: [
      { universityId: "uj" },
      { universityId: "dut" },
      { universityId: "cput" },
    ],
  },

  {
    id: "bpharm-pharmacy",
    name: "Bachelor of Pharmacy",
    field: "Health",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 38,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",

    subjects: [
      { name: "Mathematics", min: 70 },
      { name: "Physical Science", min: 65 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "ukzn" },
      { universityId: "northwest" },
    ],
  },

  {
    id: "bsc-biokinetics",
    name: "BSc Biokinetics",
    field: "Health",
    duration: 4,
    nqfLevel: 8,
    demand: "Medium",
    minAPS: 30,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",

    subjects: [
      { name: "Life Sciences", min: 55 },
      { name: "English", min: 50 },
    ],

    offeredAt: [
      { universityId: "up" },
      { universityId: "uj" },
      { universityId: "ufs" },
    ],
  },


  // ================= LAW =================
  {
    id: "llb-law",
    name: "LLB Law",
    field: "Law",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 35,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",

    subjects: [
      { name: "English", min: 65 },
    ],

    offeredAt: [
      { universityId: "uct" },
      { universityId: "wits" },
      { universityId: "stellenbosch" },
    ],
  },

  // ================= EDUCATION =================
  {
    id: "bed-foundation-phase",
    name: "Bachelor of Education in Foundation Phase Teaching",
    field: "Education",
    duration: 4,
    nqfLevel: 7,
    demand: "High",
    minAPS: 28,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",

    subjects: [
      { name: "English", min: 55 },
      { name: "Mathematics", min: 40 },
    ],

    offeredAt: [
      { universityId: "uj" },
      { universityId: "up" },
      { universityId: "unisa" },
    ],
  },

  {
    id: "bed-intermediate-phase",
    name: "Bachelor of Education in Intermediate Phase Teaching",
    field: "Education",
    duration: 4,
    nqfLevel: 7,
    demand: "High",
    minAPS: 30,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",

    subjects: [
      { name: "English", min: 55 },
      { name: "Mathematics", min: 45 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "uj" },
      { universityId: "up" },
    ],
  },

  {
    id: "bed-senior-phase",
    name: "Bachelor of Education in Senior Phase and FET Teaching",
    field: "Education",
    duration: 4,
    nqfLevel: 7,
    demand: "High",
    minAPS: 32,
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0",

    subjects: [
      { name: "English", min: 60 },
      { name: "Mathematics", min: 50 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "stellenbosch" },
      { universityId: "up" },
    ],
  },

  // ================= ENGINEERING =================
  {
    id: "beng-civil-engineering",
    name: "BEng Civil Engineering",
    field: "Engineering",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 38,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",

    subjects: [
      { name: "Mathematics", min: 75 },
      { name: "Physical Science", min: 70 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "up" },
      { universityId: "stellenbosch" },
    ],
  },

  {
    id: "beng-electrical-engineering",
    name: "BEng Electrical Engineering",
    field: "Engineering",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 39,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",

    subjects: [
      { name: "Mathematics", min: 75 },
      { name: "Physical Science", min: 70 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "wits" },
      { universityId: "uct" },
      { universityId: "up" },
    ],
  },

  {
    id: "beng-mechanical-engineering",
    name: "BEng Mechanical Engineering",
    field: "Engineering",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 38,
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",

    subjects: [
      { name: "Mathematics", min: 75 },
      { name: "Physical Science", min: 70 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "stellenbosch" },
      { universityId: "up" },
      { universityId: "wits" },
    ],
  },

  {
    id: "beng-chemical-engineering",
    name: "BEng Chemical Engineering",
    field: "Engineering",
    duration: 4,
    nqfLevel: 8,
    demand: "High",
    minAPS: 40,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",

    subjects: [
      { name: "Mathematics", min: 80 },
      { name: "Physical Science", min: 75 },
      { name: "English", min: 60 },
    ],

    offeredAt: [
      { universityId: "uct" },
      { universityId: "wits" },
      { universityId: "stellenbosch" },
    ],
  },
];