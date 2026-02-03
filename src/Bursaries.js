import React, { useState } from "react";

export const Bursaries = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const bursaries = [
    {
      name: "NSFAS",
      logo: "https://www.siu.org.za/wp-content/uploads/2024/06/nsfas-logo1.png",
      status: "Open",
      closingDate: "2026-01-31",
      requirements: "South African citizen, SASSA/low income household",
      funds: ["Public", "TVET"],
      link: "https://www.nsfas.org.za",
    },
    {
      name: "Funza Lushaka Bursary",
      logo: "https://www.siyavula.com/static_cache/13938976762742548205/themes/emas/img/future/flb-logo.png",
      status: "Closed",
      closingDate: "2025-10-15",
      requirements: "Teaching degree students with strong academic record",
      funds: ["Public"],
      link: "https://www.funzalushaka.doe.gov.za",
    },
    {
      name: "Sasol Bursary",
      logo: "https://ceowatermandate.org/wp-content/uploads/2017/11/Sasol-Logo-One-Color1-1-e1509748703991.png",
      status: "Open",
      closingDate: "2026-02-28",
      requirements: "Strong maths & science results",
      funds: ["Public", "Private"],
      link: "https://www.sasolbursaries.com",
    },
  ];

  const isClosingSoon = (dateStr) => {
    const today = new Date();
    const closing = new Date(dateStr);
    const diffDays = (closing - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 14 && diffDays >= 0;
  };

  const filteredBursaries = bursaries.filter((b) => {
    const matchesType = typeFilter === "All" || b.funds.includes(typeFilter);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* FILTER SIDEBAR */}
        <div style={styles.filterPanel}>
          <h3 style={styles.filterTitle}>Filter Bursaries</h3>

          <input
            type="text"
            placeholder="Search bursaries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />

          <div style={styles.filterGroup}>
            <strong>Institution Type</strong>
            {["All", "Public", "Private", "TVET"].map((type) => (
              <label key={type} style={styles.label}>
                <input
                  type="checkbox"
                  checked={typeFilter === type}
                  onChange={() => setTypeFilter(type)}
                />{" "}
                {type}
              </label>
            ))}
          </div>

          <div style={styles.filterGroup}>
            <strong>Status</strong>
            {["All", "Open", "Closed"].map((status) => (
              <label key={status} style={styles.label}>
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === status}
                  onChange={() => setStatusFilter(status)}
                />{" "}
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.contentArea}>
          <h1 style={styles.heading}>Available Bursaries</h1>

          <div style={styles.grid}>
            {filteredBursaries.map((b) => (
              <div
                key={b.name}
                style={styles.card}
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

  layout: {
    display: "flex",
  },

  filterPanel: {
    width: "300px",
    background: "white",
    padding: "30px 20px",
    borderRight: "1px solid #e2e8f0",
    position: "fixed",
    top: "70px",
    left: 0,
    height: "calc(100vh - 70px)",
    overflow: "hidden",
    boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
  },

  contentArea: {
    marginLeft: "320px",
    padding: "40px",
    width: "calc(100% - 320px)",
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

  searchInput: {
    width: "90%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },

  filterTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#1e3a8a",
  },

  filterGroup: {
    marginBottom: "25px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#334155",
    cursor: "pointer",
  },
};
