export const universities = [
  {
    name: "University of Pretoria",
    minAPS: 35,
    applyLink: "https://www.up.ac.za/online-application",
    courses: [
      {
        name: "BSc Computer Science",
        minAPS: 36,
        demand: "High",
        duration: 3,
        field: "Technology",
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 65 },
          { name: "English", min: 50 },
        ],
      },
      {
        name: "BCom Accounting",
        minAPS: 34,
        demand: "Medium",
        duration: 3,
        field: "Business",
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 60 },
          { name: "English", min: 50 },
        ],
      },
      {
        name: "MBChB Medicine",
        minAPS: 42,
        demand: "High",
        duration: 6,
        field: "Health",
        applyLink: "https://www.up.ac.za/online-application",
        subjects: [
          { name: "Mathematics", min: 70 },
          { name: "Physical Science", min: 70 },
          { name: "Life Sciences", min: 70 },
        ],
      },
    ],
  },
];
