import { universityData } from "../data/universityData";

export function matchCourses({ apsScore, subjects }) {
  if (!apsScore) return [];

  const userSubjects = subjects.map((s) => s.name);

  let results = [];

  universityData.forEach((uni) => {
    uni.courses.forEach((course) => {
      const hasRequiredSubjects = course.requiredSubjects.every((subj) =>
        userSubjects.includes(subj)
      );

      const meetsAPS = apsScore >= course.minAPS;

      if (meetsAPS && hasRequiredSubjects) {
        results.push({
          university: uni.name,
          province: uni.province,
          course: course.name,
          description: course.description,
          matchScore: calculateMatchScore(apsScore, course.minAPS, userSubjects, course.requiredSubjects),
        });
      }
    });
  });

  // Sort best matches first
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

function calculateMatchScore(aps, minAPS, userSubjects, requiredSubjects) {
  let score = 0;

  // APS strength
  score += (aps - minAPS) * 2;

  // Subject match bonus
  const subjectMatches = requiredSubjects.filter((s) =>
    userSubjects.includes(s)
  ).length;

  score += subjectMatches * 5;

  return score;
}