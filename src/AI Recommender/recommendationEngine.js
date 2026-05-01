// Simple AI Recommendation Engine
export const getCourseRecommendations = (courses, apsScore, subjects) => {
  if (!apsScore) return [];

  return courses
    .map((course) => {
      let score = 0;

      // APS Matching
      if (apsScore >= course.minAPS) {
        score += 50;
      } else {
        score += Math.max(0, 50 - (course.minAPS - apsScore) * 5);
      }

      // Subject Matching
      if (course.requiredSubjects) {
        course.requiredSubjects.forEach((req) => {
          const studentSubject = subjects?.find((s) => s.name === req.name);

          if (studentSubject && studentSubject.level >= req.level) {
            score += 25;
          }
        });
      }

      return {
        ...course,
        aiScore: score,
        matchLevel:
          score > 70 ? "High Match" : score > 40 ? "Medium Match" : "Low Match",
      };
    })
    .sort((a, b) => b.aiScore - a.aiScore);
};