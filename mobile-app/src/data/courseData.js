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
];