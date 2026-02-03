import React, { useState } from "react";

export const Applications = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // ------------------ INSTITUTION DATA ------------------
  const institutions = [
    {
      name: "University of Cape Town",
      type: "University",
      status: "Open",
      closingDate: "30 September 2026",
      requirements: "APS 28+, Bachelor pass, Maths 60%+",
      link: "https://applyonline.uct.ac.za",
    },
    {
      name: "University of Johannesburg",
      type: "University",
      status: "Open",
      closingDate: "31 October 2026",
      requirements: "APS 22+, Diploma/Bachelor pass",
      link: "https://www.uj.ac.za/apply",
    },
    {
      name: "Tshwane South TVET College",
      type: "TVET",
      status: "Open",
      closingDate: "Ongoing (Rolling Applications)",
      requirements: "Grade 12 pass",
      link: "https://www.tsc.edu.za",
    },
    {
      name: "False Bay TVET College",
      type: "TVET",
      status: "Closed",
      closingDate: "Closed – Reopens Jan 2027",
      requirements: "Grade 12 or equivalent",
      link: "https://www.falsebaycollege.co.za",
    },
    {
      name: "Varsity College",
      type: "Private",
      status: "Open",
      closingDate: "15 November 2026",
      requirements: "NSC pass, programme-specific requirements",
      link: "https://www.varsitycollege.co.za",
    },
    {
      name: "Boston City Campus",
      type: "Private",
      status: "Closed",
      closingDate: "Closed – Next intake March 2027",
      requirements: "NSC pass",
      link: "https://www.boston.co.za",
    },
  ];

  // ------------------ FILTER LOGIC ------------------
  const filteredInstitutions = institutions.filter((inst) => {
    return (
      (typeFilter === "All" || inst.type === typeFilter) &&
      (statusFilter === "All" || inst.status === statusFilter)
    );
  });

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* FILTER SIDEBAR */}
        <div style={styles.filterPanel}>
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
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div style={styles.contentArea}>
          <h1 style={styles.heading}>Applications</h1>

          {filteredInstitutions.length === 0 ? (
            <p>No institutions match your filters.</p>
          ) : (
            filteredInstitutions.map((inst, index) => (
              <div key={index} style={styles.card}>
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
                  style={styles.button}
                  onClick={() => window.open(inst.link, "_blank")}
                >
                  Go to Site
                </button>
              </div>
            ))
          )}
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
};
