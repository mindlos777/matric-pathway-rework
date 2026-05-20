export const matchCourses = ({
  courses = [],
  userAPS = 0,
  userSubjects = [],
  search = "",
  filters = {},
}) => {
  const safeAPS = Number(userAPS || 0);

  const normalizedSubjects = userSubjects.map((s) => ({
    name: s.name?.toLowerCase(),
    mark: Number(s.mark || 0),
  }));

  let results = [...courses];

  // ================= SEARCH =================
  if (search.trim()) {
    results = results.filter((course) =>
      course.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // ================= FIELD FILTER =================
  if (filters.field) {
    results = results.filter(
      (course) => course.field === filters.field
    );
  }

  // ================= DEMAND FILTER =================
  if (filters.demand) {
    results = results.filter(
      (course) => course.demand === filters.demand
    );
  }

  // ================= DURATION FILTER =================
  if (filters.duration) {
    results = results.filter(
      (course) =>
        String(course.duration) ===
        String(filters.duration)
    );
  }

  // ================= APS FILTER =================
  if (filters.apsMode) {
    results = results.filter(
      (course) =>
        safeAPS >= Number(course.minAPS || 0)
    );
  }

  // ================= SMART SCORING =================
  results = results.map((course) => {
    let score = 0;

    // APS SCORE
    if (safeAPS >= course.minAPS) {
      score += 50;
    }

    // SUBJECT MATCHING
    let matchedSubjects = 0;

    (course.subjects || []).forEach((required) => {
      const found = normalizedSubjects.find(
        (s) =>
          s.name === required.name.toLowerCase()
      );

      if (found) {
        // passed required mark
        if (found.mark >= required.min) {
          score += 20;
          matchedSubjects += 1;
        }

        // bonus for high marks
        if (found.mark >= 80) {
          score += 10;
        } else if (found.mark >= 70) {
          score += 5;
        }
      }
    });

    // demand bonus
    if (course.demand === "High") {
      score += 5;
    }

    // compatibility %
    const compatibility =
      course.subjects?.length > 0
        ? Math.round(
            (matchedSubjects /
              course.subjects.length) *
              100
          )
        : 0;

    return {
      ...course,
      matchScore: score,
      compatibility,
    };
  });

  // ================= SORT BEST MATCH FIRST =================
  results.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return results;
};