import React, { useState } from "react";
import { bursaries_data } from "./data/Bursaries_data";
import { FilterPanel } from "./components/FilterPanel";
import { DashboardLayout } from "./dashboardLayout";

export const Bursaries = () => {
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

  const [filters, setFilters] = useState({
    search: "",
    type: "All",
    status: "All",
  });

  const isClosingSoon = (dateStr) => {
    const today = new Date();
    const closing = new Date(dateStr);
    const diffDays = (closing - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 14 && diffDays >= 0;
  };

  const filteredBursaries = bursaries_data.filter((b) => {
    const matchesType =
      filters.type === "All" || b.funds.includes(filters.type);

    const matchesStatus =
      filters.status === "All" ||
      (filters.status === "Closing Soon" && isClosingSoon(b.closingDate)) ||
      (filters.status === "Open" &&
        b.status === "Open" &&
        !isClosingSoon(b.closingDate)) ||
      (filters.status === "Closed" && b.status === "Closed");

    const matchesSearch = b.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* CONTENT */}
        <div style={styles.contentArea}>
          <h1 style={styles.heading}>Available Bursaries</h1>

          {/* FILTER SIDEBAR */}
          {(!isMobile || showFilters) && (
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              config={{
                search: { placeholder: "Search bursaries..." },

                fields: [
                  {
                    key: "type",
                    label: "Institution Type",
                    type: "select",
                    options: ["All", "Public", "Private", "TVET"],
                  },
                  {
                    key: "status",
                    label: "Application Status",
                    type: "select",
                    options: ["All", "Open", "Closing Soon", "Closed"],
                  },
                ],
              }}
            />
          )}

          <div style={styles.grid}>
            {filteredBursaries.map((b) => (
              <div
                key={b.id}
                style={{
                  ...styles.card,
                  opacity: b.status === "Closed" ? 0.5 : 1,
                  filter: b.status === "Closed" ? "grayscale(40%)" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.08)";
                }}
              >
                <img src={b.logo} alt={b.name} style={styles.logo} />

                <h3>
                  {b.name}
                  {isClosingSoon(b.closingDate) && (
                    <span style={styles.closingSoon}>Closing Soon</span>
                  )}
                </h3>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color: b.status === "Open" ? "green" : "red",
                    }}
                  >
                    {b.status}
                  </span>
                </p>

                <p>
                  <strong>Closing Date:</strong> {b.closingDate}
                </p>

                <p>
                  <strong>Funds:</strong> {b.funds.join(", ")}
                </p>

                <p>
                  <strong>Minimum Requirements:</strong> {b.requirements}
                </p>

                <button
                  style={styles.applyBtn}
                  onClick={() => window.open(b.link, "_blank")}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  contentArea: {
    flex: 1,
    padding: "40px",
  },

  heading: {
    color: "#1e3a8a",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  logo: {
    height: "50px",
    objectFit: "contain",
    marginBottom: "10px",
  },

  applyBtn: {
    marginTop: "15px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },

  closingSoon: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: "10px",
  },

  //filter responsive CSS
  mobileFilterPanel: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "300px",
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
    position: "sticky",
    top: "10px",
    background: "#e2e8f0",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#1e3a8a",
    padding: "6px 12px",
    borderRadius: "8px",
    marginBottom: "20px",
    zIndex: 10,
  },

  contentSearch: {
    width: "100%",
    maxWidth: "420px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    marginBottom: "30px",
  },
  desktopFilterPanel: {
    position: "sticky",
    top: "50px",
    height: "calc(100vh - 80px)",
    overflowY: "auto",
  },

  mobileFilterPanel: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 2000,
    overflowY: "auto",
    boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
  },
};