export function matchCourses({
  courses = [],
  userAPS,
  userSubjects = [],
  search = "",
  filters = {},
}) {
  if (!Array.isArray(courses)) return [];

  let results = [...courses];

  // ---------------- SAFE APS FILTER ----------------
  // Only filter if APS is actually valid
  if (typeof userAPS === "number" && userAPS > 0) {
    results = results.filter(
      (course) => userAPS >= (course.minAPS || 0)
    );
  }

  // ---------------- SEARCH ----------------
  if (search?.trim()) {
    const q = search.toLowerCase();
    results = results.filter((course) =>
      course.name.toLowerCase().includes(q)
    );
  }

  // ---------------- FIELD FILTER ----------------
  if (filters?.field) {
    results = results.filter(
      (course) => course.field === filters.field
    );
  }

  // ---------------- DEMAND FILTER ----------------
  if (filters?.demand) {
    results = results.filter(
      (course) => course.demand === filters.demand
    );
  }

  // ---------------- DURATION FILTER ----------------
  if (filters?.duration) {
    results = results.filter(
      (course) =>
        String(course.duration) === String(filters.duration)
    );
  }

  return results;
}