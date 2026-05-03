export function filterUniversities({
  universities,
  search,
  filters,
  userAPS,
}) {
  if (!Array.isArray(universities)) return [];

  let result = [...universities];

  // ---------------- SEARCH ----------------
  if (search) {
    result = result.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // ---------------- TYPE / STATUS FILTERS ----------------
  Object.keys(filters || {}).forEach((key) => {
    const value = filters[key];

    if (!value) return;

    result = result.filter((u) => u[key] === value);
  });

  // ---------------- APS FILTER ----------------
  if (userAPS) {
    result = result.filter((u) => !u.minAPS || u.minAPS <= userAPS);
  }

  return result;
}

// ---------------- SAFE RANKING (FIX FOR YOUR ERROR) ----------------
export function rankUniversities(unis = [], aps = 0) {
  if (!Array.isArray(unis)) return [];

  return [...unis].sort((a, b) => {
    const scoreA = (aps || 0) - (a.minAPS || 0);
    const scoreB = (aps || 0) - (b.minAPS || 0);

    return scoreB - scoreA;
  });
}