export const generateAIInsights = (subjects, apsScore) => {
  if (!subjects || subjects.length === 0) {
    return null;
  }

  const subjectNames = subjects.map((s) => s.name);

  /* ---------- COURSE MATCHING ---------- */

  let courseSuggestions = [];

  if (subjectNames.includes("Mathematics")) {
    courseSuggestions.push(
      "Engineering",
      "Computer Science",
      "Data Science",
      "Actuarial Science"
    );
  }

  if (subjectNames.includes("Life Sciences")) {
    courseSuggestions.push("Medicine", "Nursing", "Biotechnology", "Pharmacy");
  }

  if (subjectNames.includes("Accounting")) {
    courseSuggestions.push(
      "Accounting",
      "Finance",
      "Economics",
      "Business Management"
    );
  }

  /* ---------- APS ANALYSIS ---------- */

  let apsInsight = "";

  if (apsScore >= 38) {
    apsInsight = "Excellent APS — you qualify for top universities.";
  } else if (apsScore >= 30) {
    apsInsight = "Good APS — strong chances at many universities.";
  } else if (apsScore >= 20) {
    apsInsight = "Average APS — consider improving key subjects.";
  } else {
    apsInsight = "Low APS — focus on upgrading results.";
  }

  /* ---------- CAREER INSIGHT ---------- */

  let careerInsight = "";

  if (subjectNames.includes("Mathematics")) {
    careerInsight =
      "You show strong analytical ability — ideal for problem-solving careers like engineering, data science, and finance.";
  } else if (subjectNames.includes("Life Sciences")) {
    careerInsight =
      "You have a scientific mindset — healthcare and research careers may suit you.";
  } else {
    careerInsight =
      "Your subject mix suggests versatile career opportunities in business, humanities, and social sciences.";
  }

  return {
    courses: [...new Set(courseSuggestions)],
    apsInsight,
    careerInsight,
  };
};
