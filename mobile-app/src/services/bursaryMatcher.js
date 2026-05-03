export function matchBursaries({
  bursaries,
  search,
  filters,
  userSubjects,
  userField,
}) {
  return bursaries.filter((b) => {
    // ---------------- SEARCH ----------------
    const matchSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase());

    // ---------------- STATUS ----------------
    const matchStatus =
      !filters.status || b.status === filters.status;

    // ---------------- FUND TYPE ----------------
    const matchFunds =
      !filters.funds ||
      b.funds.includes(filters.funds);

    // ---------------- REQUIREMENT MATCH ----------------
    const requirementMatch = matchRequirements(
      b.requirements,
      userSubjects,
      userField
    );

    return (
      matchSearch &&
      matchStatus &&
      matchFunds &&
      requirementMatch
    );
  });
}