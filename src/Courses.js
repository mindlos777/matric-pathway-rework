<<<<<<< HEAD
import React, { useState } from "react";
import { useAuth } from "./auth/auth";
import { universities } from "./data/Universities";
import { courses } from "./data/Courses_data";
import { FilterPanel } from "./components/FilterPanel";

export const CoursesPage = () => {
  const { apsScore, profileSubjects } = useAuth(); // subjects we will store later
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    institution: "all",
    field: "all",
    duration: 6, // default max for range slider
    demand: "all",
    apsMatch: false,
  });

  // Count how many institutions offer each course
  const courseInstitutionCount = {};

  universities.forEach((uni) => {
    uni.courses.forEach((courseId) => {
      courseInstitutionCount[courseId] =
        (courseInstitutionCount[courseId] || 0) + 1;
    });
  });

  //Mapping through courses and making sure no course duplicates when searching/filtering
  const allCourses = courses.map((course) => ({
    ...course,
    institutionsCount: courseInstitutionCount[course.id] || 0,
  }));

  //Based on aps Logic: finding what courses one qualifies for with aps & subjects they possess
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

  //Course filtering system
  const filteredCourses = allCourses.filter((course) => {
    // Institution
    if (filters.institution !== "all") {
      const uni = universities.find((u) => u.name === filters.institution);
      if (!uni?.courses.includes(course.id)) return false;
    }

    // Field
    if (filters.field !== "all" && course.field !== filters.field) {
      return false;
    }

    // Duration (range max)
    if (course.duration > filters.duration) {
      return false;
    }

    // Demand
    if (filters.demand !== "all" && course.demand !== filters.demand) {
      return false;
    }

    // Search
    if (
      filters.search &&
      !course.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // APS match
    if (filters.apsMatch && !matchesAPSAndSubjects(course)) {
      return false;
    }

    return true;
  });

  //DESKTOP VIEW
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showFilters, setShowFilters] = useState(false);

  //demand ranking & sorting best(high) to worst(low)
  const demandRank = { High: 1, Medium: 2, Low: 3 };
  filteredCourses.sort((a, b) => {
    if (demandRank[a.demand] !== demandRank[b.demand]) {
      return demandRank[a.demand] - demandRank[b.demand];
    }

    return a.minAPS - b.minAPS;
  });

  //getting courses offered by certain university/institute
  const getUniversitiesForCourse = (course) => {
    return course.offeredAt
      .map((o) => universities.find((u) => u.id === o.universityId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div style={styles.page}>
      {isMobile && showFilters && (
        <div
          style={styles.mobileOverlay}
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* COURSES AREA */}
      <div
        style={{
          ...styles.content,
        }}
      >
        <h2 style={styles.heading}>Explore Courses</h2>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          config={{
            search: { placeholder: "Search courses..." },

            fields: [
              {
                key: "institution",
                label: "Institution",
                type: "select",
                options: [
                  { label: "All Institutions", value: "all" },
                  ...universities.map((u) => ({
                    label: u.name,
                    value: u.name,
                  })),
                ],
              },

              {
                key: "field",
                label: "Field",
                type: "select",
                options: [
                  "all",
                  "Technology",
                  "Health",
                  "Business",
                  "Engineering",
                  "Law",
                ],
              },

              {
                key: "duration",
                label: "Duration",
                type: "range",
                min: 3,
                max: 6,
                unit: "years",
              },

              {
                key: "demand",
                label: "Demand",
                type: "select",
                options: ["all", "High", "Medium", "Low"],
              },

              {
                key: "apsMatch",
                label: "Match My APS",
                type: "checkbox",
              },
            ],
          }}
        />

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
                <p style={{ fontSize: "13px", color: "#475569" }}>
                  Offered by <strong>{course.institutionsCount}</strong>{" "}
                  institution
                  {course.institutionsCount !== 1 ? "s" : ""}
                </p>

                <p>
                  <strong>Demand:</strong>{" "}
                  <span style={styles.demand[course.demand]}>
                    {course.demand} Demand
                  </span>
                </p>
                <p>
                  <strong>NQF Level:</strong> {course.nqfLevel}
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
              <strong>NQF Level:</strong> {selectedCourse.nqfLevel}
            </p>
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

  content: {
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

  //search bar
  searchBarWrapper: {
    marginBottom: "25px",
    maxWidth: "400px",
  },

  searchInput: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },

  //RESPONSIVE styles
  mobileSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "85%",
    maxWidth: "320px",
    height: "100vh",
    overflowY: "auto",
    background: "white",
    zIndex: 3000,
    boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
    animation: "slideIn 0.25s ease-out",
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    zIndex: 2500,
  },
  searchBarWrapper: {
    marginBottom: "25px",
    maxWidth: "400px",
    marginLeft: "0",
  },
  //FILTER OPEN & CLOSE CSS

  searchRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  filterToggleBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  filterPanel: {
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  closeFilterBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#1e3a8a",
    fontWeight: "bold",
  },
=======
import React, { useState } from "react";
import { useAuth } from "./auth/auth";
import { universities } from "./data/Universities";
import { courses } from "./data/Courses_data";
import { FilterPanel } from "./components/FilterPanel";

export const CoursesPage = () => {
  const { apsScore, profileSubjects } = useAuth(); // subjects we will store later
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    institution: "all",
    field: "all",
    duration: 6, // default max for range slider
    demand: "all",
    apsMatch: false,
  });

  // Count how many institutions offer each course
  const courseInstitutionCount = {};

  universities.forEach((uni) => {
    uni.courses.forEach((courseId) => {
      courseInstitutionCount[courseId] =
        (courseInstitutionCount[courseId] || 0) + 1;
    });
  });

  //Mapping through courses and making sure no course duplicates when searching/filtering
  const allCourses = courses.map((course) => ({
    ...course,
    institutionsCount: courseInstitutionCount[course.id] || 0,
  }));

  //Based on aps Logic: finding what courses one qualifies for with aps & subjects they possess
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

  //Course filtering system
  const filteredCourses = allCourses.filter((course) => {
    // Institution
    if (filters.institution !== "all") {
      const uni = universities.find((u) => u.name === filters.institution);
      if (!uni?.courses.includes(course.id)) return false;
    }

    // Field
    if (filters.field !== "all" && course.field !== filters.field) {
      return false;
    }

    // Duration (range max)
    if (course.duration > filters.duration) {
      return false;
    }

    // Demand
    if (filters.demand !== "all" && course.demand !== filters.demand) {
      return false;
    }

    // Search
    if (
      filters.search &&
      !course.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // APS match
    if (filters.apsMatch && !matchesAPSAndSubjects(course)) {
      return false;
    }

    return true;
  });

  //DESKTOP VIEW
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showFilters, setShowFilters] = useState(false);

  //demand ranking & sorting best(high) to worst(low)
  const demandRank = { High: 1, Medium: 2, Low: 3 };
  filteredCourses.sort((a, b) => {
    if (demandRank[a.demand] !== demandRank[b.demand]) {
      return demandRank[a.demand] - demandRank[b.demand];
    }

    return a.minAPS - b.minAPS;
  });

  //getting courses offered by certain university/institute
  const getUniversitiesForCourse = (course) => {
    return course.offeredAt
      .map((o) => universities.find((u) => u.id === o.universityId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div style={styles.page}>
      {isMobile && showFilters && (
        <div
          style={styles.mobileOverlay}
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* COURSES AREA */}
      <div
        style={{
          ...styles.content,
        }}
      >
        <h2 style={styles.heading}>Explore Courses</h2>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          config={{
            search: { placeholder: "Search courses..." },

            fields: [
              {
                key: "institution",
                label: "Institution",
                type: "select",
                options: [
                  { label: "All Institutions", value: "all" },
                  ...universities.map((u) => ({
                    label: u.name,
                    value: u.name,
                  })),
                ],
              },

              {
                key: "field",
                label: "Field",
                type: "select",
                options: [
                  "all",
                  "Technology",
                  "Health",
                  "Business",
                  "Engineering",
                  "Law",
                ],
              },

              {
                key: "duration",
                label: "Duration",
                type: "range",
                min: 3,
                max: 6,
                unit: "years",
              },

              {
                key: "demand",
                label: "Demand",
                type: "select",
                options: ["all", "High", "Medium", "Low"],
              },

              {
                key: "apsMatch",
                label: "Match My APS",
                type: "checkbox",
              },
            ],
          }}
        />

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
                <p style={{ fontSize: "13px", color: "#475569" }}>
                  Offered by <strong>{course.institutionsCount}</strong>{" "}
                  institution
                  {course.institutionsCount !== 1 ? "s" : ""}
                </p>

                <p>
                  <strong>Demand:</strong>{" "}
                  <span style={styles.demand[course.demand]}>
                    {course.demand} Demand
                  </span>
                </p>
                <p>
                  <strong>NQF Level:</strong> {course.nqfLevel}
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
              <strong>NQF Level:</strong> {selectedCourse.nqfLevel}
            </p>
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

  content: {
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

  //search bar
  searchBarWrapper: {
    marginBottom: "25px",
    maxWidth: "400px",
  },

  searchInput: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },

  //RESPONSIVE styles
  mobileSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "85%",
    maxWidth: "320px",
    height: "100vh",
    overflowY: "auto",
    background: "white",
    zIndex: 3000,
    boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
    animation: "slideIn 0.25s ease-out",
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    zIndex: 2500,
  },
  searchBarWrapper: {
    marginBottom: "25px",
    maxWidth: "400px",
    marginLeft: "0",
  },
  //FILTER OPEN & CLOSE CSS

  searchRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  filterToggleBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  filterPanel: {
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  closeFilterBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#1e3a8a",
    fontWeight: "bold",
  },
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
};