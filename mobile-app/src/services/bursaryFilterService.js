export function filterBursaries({
  bursaries,
  search,
  filters,
}) {
  if (!Array.isArray(bursaries)) return [];

  let result = [...bursaries];

  // ---------------- SEARCH ----------------
  if (search) {
    result = result.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // ---------------- FILTERS ----------------
  Object.keys(filters || {}).forEach((key) => {
    const value = filters[key];
    if (!value) return;

    result = result.filter((b) => {
      // special case: array field (funds)
      if (key === "funds") {
        return b.funds?.includes(value);
      }

      return b[key] === value;
    });
  });

  return result;
}

// ---------------- RANKING (SAFE) ----------------
export function rankBursaries(bursaries = []) {
  if (!Array.isArray(bursaries)) return [];

  return [...bursaries].sort((a, b) => {
    // OPEN bursaries first
    const scoreA = a.status === "Open" ? 1 : 0;
    const scoreB = b.status === "Open" ? 1 : 0;

    return scoreB - scoreA;
  });
}