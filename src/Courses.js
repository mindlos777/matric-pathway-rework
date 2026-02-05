import React, { useState } from "react";
import { useAuth } from "./auth/auth";
import { universities } from "./data/Universities";
import { courses } from "./data/Courses_data";

export const CoursesPage = () => {
  const { apsScore, profileSubjects } = useAuth(); // subjects we will store later
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [filters, setFilters] = useState({
    field: "all",
    duration: "all",
    demand: "all",
    apsMatch: false,
  });

  const [selectedUniversity, setSelectedUniversity] = useState("all");

  const allCourses = courses
    .filter((course) =>
      selectedUniversity === "all"
        ? true
        : course.offeredAt.some((u) => u.universityId === selectedUniversity)
    )
    .map((course) => {
      const uniMatch = universities.find((u) =>
        course.offeredAt.some((off) => off.universityId === u.id)
      );

      return {
        ...course,
        university: uniMatch?.name || "Multiple Institutions",
        universityLink: uniMatch?.applyLink || "#",
      };
    });

  const matchesAPSAndSubjects = (course) => {
    if (!apsScore) return false;
    if (apsScore < course.minAPS) return false;

    if (!profileSubjects || profileSubjects.length === 0) return true;

    return course.subjects.every((req) => {
      const studentSubj = profileSubjects.find(
        (s) => s.name.toLowerCase() === req.name.toLowerCase()
      );
      return studentSubj && Number(studentSubj.mark) >= req.min;
    });
  };

  const filteredCourses = allCourses.filter((course) => {
    // INSTITUTION FILTER
    if (
      selectedUniversity !== "all" &&
      !course.offeredAt.some((u) => u.universityId === selectedUniversity)
    )
      return false;

    if (filters.field !== "all" && course.field !== filters.field) return false;

    if (
      filters.duration !== "all" &&
      course.duration !== Number(filters.duration)
    )
      return false;

    // JOB DEMAND FILTER
    if (filters.demand !== "all" && course.demand !== filters.demand)
      return false;

    if (filters.apsMatch && !matchesAPSAndSubjects(course)) return false;

    return true;
  });
  const demandRank = { High: 1, Medium: 2, Low: 3 };
  filteredCourses.sort((a, b) => {
    if (demandRank[a.demand] !== demandRank[b.demand]) {
      return demandRank[a.demand] - demandRank[b.demand];
    }

    return a.minAPS - b.minAPS;
  });

  const getUniversitiesForCourse = (course) => {
    return course.offeredAt
      .map((o) => universities.find((u) => u.id === o.universityId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div style={styles.page}>
      {/* FILTER SIDEBAR */}
      <div style={styles.sidebar}>
        <h3 style={styles.filterTitle}>Filter Courses</h3>

        <label style={styles.label}>Institution</label>
        <select
          style={styles.select}
          onChange={(e) => setSelectedUniversity(e.target.value)}
        >
          <option value="all">All Institutions</option>
          {universities.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          ))}
        </select>

        <label style={styles.label}>Field</label>
        <select
          style={styles.select}
          onChange={(e) => setFilters({ ...filters, field: e.target.value })}
        >
          <option value="all">All</option>
          <option>Technology</option>
          <option>Health</option>
          <option>Business</option>
          <option>Humanities</option>
          <option>Engineering</option>
          <option>Law</option>
          <option>Creative Arts</option>
        </select>

        <label style={styles.label}>Duration</label>
        <select
          style={styles.select}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
        >
          <option value="all">All</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
        </select>

        <label style={styles.label}>Job Market Demand</label>
        <select
          style={styles.select}
          onChange={(e) => setFilters({ ...filters, demand: e.target.value })}
        >
          <option value="all">All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div style={styles.checkboxRow}>
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({ ...filters, apsMatch: e.target.checked })
            }
          />
          <span style={{ marginLeft: 8 }}>Based on My APS</span>
        </div>
      </div>

      {/* COURSES AREA */}
      <div style={styles.content}>
        <h2 style={styles.heading}>Explore Courses</h2>

        <div style={styles.grid}>
          {filteredCourses.map((course, index) => (
            <div key={index} style={styles.card}>
              <img src={course.image} alt={course.name} style={styles.image} />

              <div style={styles.cardBody}>
                <h3>{course.name}</h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginBottom: 6,
                  }}
                >
                  {getUniversitiesForCourse(course)}
                </p>

                <p>
                  <strong>Demand:</strong>{" "}
                  <span style={styles.demand[course.demand]}>
                    {course.demand} Demand
                  </span>
                </p>

                <p>
                  <strong>Field:</strong> {course.field}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duration} years
                </p>
                <p>
                  <strong>Minimum APS:</strong> {course.minAPS}
                </p>
              </div>

              <button
                style={styles.readMoreBtn}
                onClick={() => setSelectedCourse(course)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedCourse && (
        <div style={styles.modalOverlay}>
          <div style={styles.courseModal}>
            <img
              src={selectedCourse.image}
              alt={selectedCourse.name}
              style={styles.modalImage}
            />

            <h2 style={{ marginTop: 15 }}>{selectedCourse.name}</h2>
            <p style={{ color: "#64748b" }}>{selectedCourse.university}</p>

            <div style={styles.modalBadge[selectedCourse.demand]}>
              {selectedCourse.demand} Job Market Demand
            </div>

            <p>
              <strong>Field:</strong> {selectedCourse.field}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCourse.duration} years
            </p>
            <p>
              <strong>Minimum APS:</strong> {selectedCourse.minAPS}
            </p>

            <p style={{ marginTop: 10 }}>
              <strong>Required Subjects:</strong>
              <br />
              {selectedCourse.subjects?.map((s, i) => (
                <span key={i}>
                  {s.name} ({s.min}%)
                  <br />
                </span>
              ))}
            </p>

            <button
              style={styles.closeBtn}
              onClick={() => setSelectedCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { display: "flex", background: "#f4f6f9" },

  sidebar: {
    width: "260px",
    minHeight: "100vh",
    position: "fixed",
    padding: "25px",
    background: "white",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
  },

  content: {
    marginLeft: "280px",
    padding: "40px",
    width: "100%",
  },

  heading: { marginBottom: "20px", color: "#1e3a8a" },

  filterTitle: { marginBottom: "15px", color: "#1e3a8a" },
  label: { fontWeight: "bold", marginTop: "15px", display: "block" },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },

  checkboxRow: { marginTop: "20px", display: "flex", alignItems: "center" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  image: { width: "100%", height: "160px", objectFit: "cover" },

  cardBody: { padding: "15px", flexGrow: 1 },

  readMoreBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  demand: {
    High: { color: "green", fontWeight: "bold" },
    Medium: { color: "orange", fontWeight: "bold" },
    Low: { color: "red", fontWeight: "bold" },
  },

  demandBadge: {
    High: {
      background: "#16a34a",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    Medium: {
      background: "#f59e0b",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    Low: {
      background: "#dc2626",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
  },

  //modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },

  courseModal: {
    background: "white",
    width: "90%",
    maxWidth: "500px",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.2s ease-in-out",
  },

  modalImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  modalBadge: {
    High: {
      background: "#16a34a",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    Medium: {
      background: "#f59e0b",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    Low: {
      background: "#dc2626",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      margin: "10px 0",
    },
  },

  closeBtn: {
    marginTop: "15px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  //job demand color styles
  demand: {
    High: { color: "green", fontWeight: "bold" },
    Medium: { color: "orange", fontWeight: "bold" },
    Low: { color: "red", fontWeight: "bold" },
  },
};
