import React, { useState } from "react";
import { universities } from "./data/Universities";
import { useAuth } from "./auth/auth";
import { FilterPanel } from "./components/FilterPanel";

export const Applications = () => {
  const { apsScore, subjects } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "All",
    status: "All",
    qualifiedOnly: false,
  });

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
    if (
      filters.search &&
      !uni.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Type
    if (filters.type !== "All" && uni.type !== filters.type) {
      return false;
    }

    // Status
    if (filters.status !== "All" && uni.status !== filters.status) {
      return false;
    }

    // Qualified only
    if (filters.qualifiedOnly && !doesStudentMeetInstitutionRequirements(uni)) {
      return false;
    }

    return true;
  });

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* CONTENT AREA */}
        <div style={styles.contentArea}>
          <div style={styles.headerRow}>
            <h2 style={styles.heading}>Applications</h2>

            {/* FILTER SIDEBAR */}
            {(!isMobile || showFilters) && (
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                config={{
                  search: { placeholder: "Search institutions..." },

                  fields: [
                    {
                      key: "type",
                      label: "Institution Type",
                      type: "select",
                      options: ["All", "University", "TVET", "Private"],
                    },
                    {
                      key: "status",
                      label: "Application Status",
                      type: "select",
                      options: ["All", "Open", "Closing Soon", "Closed"],
                    },
                    {
                      key: "qualifiedOnly",
                      label: "Show Only Institutions I Qualify For",
                      type: "checkbox",
                    },
                  ],
                }}
              />
            )}
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
