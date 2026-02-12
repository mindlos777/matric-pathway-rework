import React, { useState } from "react";
import { universities } from "./data/Universities";
import { useAuth } from "./auth/auth";

export const Applications = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [qualifiedOnly, setQualifiedOnly] = useState(false);
  const { apsScore, subjects } = useAuth();
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setShowFilters(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ------------------ GET INSTITUTION DATA ------------------
  const institutions = universities;

  const normalize = (str) => str.toLowerCase().replace(/\s/g, "");

  const doesStudentMeetInstitutionRequirements = (institution) => {
    if (!apsScore) return false;
    if (apsScore < institution.minAPS) return false;

    // If institution has no subject requirements at institution level
    if (!institution.institutionRequirements) return true;

    return true; // Most institutions evaluate subjects at course level
  };

  // ------------------ FILTER LOGIC ------------------
  const filteredInstitutions = universities.filter((uni) => {
    // Search
    if (search && !uni.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Institution type
    if (typeFilter !== "All" && uni.type !== typeFilter) {
      return false;
    }

    // Application status
    if (statusFilter !== "All" && uni.status !== statusFilter) {
      return false;
    }

    // Qualification filter
    if (qualifiedOnly && !doesStudentMeetInstitutionRequirements(uni)) {
      return false;
    }

    return true;
  });

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* FILTER SIDEBAR */}
        {(!isMobile || showFilters) && (
          <div
            style={{
              ...styles.filterPanel,
              ...(isMobile ? styles.mobileFilterPanel : {}),
            }}
          >
            {isMobile && (
              <button
                onClick={() => setShowFilters(false)}
                style={styles.closeFilterBtn}
              >
                &lt;
              </button>
            )}
            <h2 style={styles.filterTitle}>Filters</h2>

            <div style={styles.filterCard}>
              <p style={styles.filterLabel}>Institution Type</p>
              <select
                style={styles.select}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="University">University</option>
                <option value="TVET">TVET College</option>
                <option value="Private">Private College</option>
              </select>
            </div>

            <div style={styles.filterCard}>
              <p style={styles.filterLabel}>Application Status</p>
              <select
                style={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Closing Soon">Closing Soon</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div style={styles.filterCard}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={qualifiedOnly}
                  onChange={(e) => setQualifiedOnly(e.target.checked)}
                />
                Show Only Institutions I Qualify For
              </label>
            </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div style={styles.contentArea}>
          <div style={styles.headerRow}>
            <h2 style={styles.heading}>Applications</h2>

            {isMobile && (
              <button
                style={styles.openFilterBtn}
                onClick={() => setShowFilters(true)}
              >
                ☰ Filters
              </button>
            )}

            <input
              type="text"
              placeholder="Search institutions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <br />

          {(() => {
            // Remove duplicate institutions using their id
            const uniqueInstitutions = Array.from(
              new Map(
                filteredInstitutions.map((inst) => [inst.id, inst])
              ).values()
            );

            // Render
            return uniqueInstitutions.length === 0 ? (
              <p>No institutions match your filters.</p>
            ) : (
              uniqueInstitutions.map((inst) => (
                <div
                  key={inst.id}
                  style={{
                    ...styles.card,
                    ...(isMobile ? styles.mobileCard : {}),
                    opacity: inst.status === "Closed" ? 0.5 : 1,
                  }}
                >
                  <img
                    src={inst.logo}
                    alt={inst.name}
                    style={{
                      ...styles.logo,
                      ...(isMobile ? styles.mobileLogo : {}),
                    }}
                  />

                  <div>
                    <h3 style={{ margin: 0 }}>{inst.name}</h3>

                    <p style={styles.meta}>
                      <strong>Type:</strong> {inst.type}
                    </p>

                    <p style={styles.meta}>
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          color: inst.status === "Open" ? "#16a34a" : "#dc2626",
                          fontWeight: "bold",
                        }}
                      >
                        {inst.status}
                      </span>
                    </p>

                    <p style={styles.meta}>
                      <strong>Closing Date:</strong> {inst.closingDate}
                    </p>

                    <p style={styles.meta}>
                      <strong>Minimum Requirements:</strong> {inst.requirements}
                    </p>
                  </div>

                  <button
                    style={{
                      ...styles.button,
                      ...(isMobile ? styles.mobileButton : {}),
                      background:
                        inst.status === "Closed"
                          ? "#94a3b8"
                          : styles.button.background,
                      cursor:
                        inst.status === "Closed" ? "not-allowed" : "pointer",
                    }}
                    disabled={inst.status === "Closed"}
                    onClick={() => window.open(inst.link, "_blank")}
                  >
                    Go to Site
                  </button>
                </div>
              ))
            );
          })()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  /* FLEX LAYOUT PREVENTS OVERLAP */
  layout: {
    display: "flex",
  },

  /* SIDEBAR */
  filterPanel: {
    width: "280px",
    minHeight: "100vh",
    background: "#ffffff",
    padding: "30px 20px",
    borderRight: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
  },

  filterTitle: {
    color: "#1e3a8a",
    marginBottom: "25px",
    fontSize: "20px",
  },

  filterCard: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.04)",
  },

  filterLabel: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#475569",
    marginBottom: "8px",
  },

  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },

  /* CONTENT */
  contentArea: {
    flex: 1,
    padding: "40px",
  },

  heading: {
    color: "#1e3a8a",
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  meta: {
    margin: "4px 0",
    color: "#475569",
    fontSize: "14px",
  },

  button: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    height: "fit-content",
  },

  logo: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    marginRight: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  //search bar
  searchBarWrapper: {
    marginBottom: "25px",
    maxWidth: "400px",
  },

  searchInput: {
    width: "95%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  mobileLogo: {
    marginRight: 0,
    width: "90px",
    height: "90px",
  },
  mobileButton: {
    width: "100%",
    marginTop: "10px",
  },

  //MOBILE VIEW
  mobileFilterPanel: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "280px",
    height: "100vh",
    zIndex: 1000,
    overflowY: "auto",
    boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
  },

  openFilterBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "15px",
    cursor: "pointer",
    fontSize: "14px",
  },

  closeFilterBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    marginBottom: "20px",
    color: "#1e3a8a",
  },
  mobileCard: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "15px",
  },
};
