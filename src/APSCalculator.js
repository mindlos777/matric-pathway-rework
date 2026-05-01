<<<<<<< HEAD
import React, { useState } from "react";

export const APSCalculator = () => {
  const [marks, setMarks] = useState({
    mathematics: "",
    english: "",
    physics: "",
    lifeOrientation: "",
    additional: "",
  });
  const [additionalSubjects, setAdditionalSubjects] = useState([]);
  const addSubjectField = () => {
    setAdditionalSubjects([...additionalSubjects, { label: "", mark: "" }]);
  };
  const handleAdditionalChange = (index, field, value) => {
    const updated = [...additionalSubjects];
    updated[index][field] = value;
    setAdditionalSubjects(updated);
  };

  const [apsScore, setApsScore] = useState(null);
  const [qualifiedUnis, setQualifiedUnis] = useState([]);
  const [showCourses, setShowCourses] = useState(false);

  const universities = [
    {
      name: "University of Pretoria",
      minAPS: 26,
      url: "https://www.up.ac.za/apply",
    },
    {
      name: "University of Johannesburg",
      minAPS: 22,
      url: "https://www.uj.ac.za/apply",
    },
    {
      name: "University of Cape Town",
      minAPS: 28,
      url: "https://www.uct.ac.za/apply",
    },
    {
      name: "Stellenbosch University",
      minAPS: 27,
      url: "https://www.sun.ac.za/english/apply",
    },
    {
      name: "Wits University",
      minAPS: 25,
      url: "https://www.wits.ac.za/apply",
    },
    {
      name: "University of KwaZulu-Natal",
      minAPS: 22,
      url: "https://www.ukzn.ac.za/apply",
    },
  ];

  const courses = [
    { name: "BSc Computer Science", demand: "High", years: 3, minAPS: 26 },
    {
      name: "BEng Electrical Engineering",
      demand: "High",
      years: 4,
      minAPS: 27,
    },
    {
      name: "BSc Information Technology",
      demand: "Medium",
      years: 3,
      minAPS: 22,
    },
    { name: "BSc Mathematics", demand: "Medium", years: 3, minAPS: 24 },
    { name: "BSc Data Science", demand: "High", years: 3, minAPS: 26 },
    { name: "BSc Physics", demand: "Low", years: 3, minAPS: 23 },
    { name: "BSc Statistics", demand: "Medium", years: 3, minAPS: 24 },
    { name: "BSc AI", demand: "High", years: 3, minAPS: 26 },
    { name: "BSc Information Systems", demand: "Medium", years: 3, minAPS: 22 },
  ];

  const getAPSPoints = (mark) => {
    const m = Number(mark);
    if (m >= 80) return 7;
    if (m >= 70) return 6;
    if (m >= 60) return 5;
    if (m >= 50) return 4;
    return 0;
  };

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const calculateAPS = () => {
    let total =
      getAPSPoints(marks.mathematics) +
      getAPSPoints(marks.english) +
      getAPSPoints(marks.physics) +
      getAPSPoints(marks.lifeOrientation);

    // Include all additional subjects
    additionalSubjects.forEach((subj) => {
      total += getAPSPoints(subj.mark);
    });

    setApsScore(total);

    const qualified = universities.filter((uni) => total >= uni.minAPS);
    setQualifiedUnis(qualified);
    setShowCourses(false); // reset courses display
  };

  const applyToUniversity = (uniName) => {
    const uni = universities.find((u) => u.name === uniName);
    if (!uni || !uni.url) {
      alert("Application link not available.");
      return;
    }
    window.open(uni.url, "_blank"); // opens the official application page in a new tab
  };

  const seeQualifiedCourses = () => {
    setShowCourses(true);
  };

  const resetForm = () => {
    setMarks({
      mathematics: "",
      english: "",
      physics: "",
      lifeOrientation: "",
    });
    setApsScore(null);
    setQualifiedUnis([]);
    setShowCourses(false);
    setAdditionalSubjects([]);
  };

  const getCourseColor = (demand) => {
    if (demand === "High") return "#16a34a";
    if (demand === "Medium") return "#ca8a04";
    return "#dc2626";
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* APS Calculator Form */}
        <div style={styles.card}>
          <h2 style={styles.heading}>APS Calculator</h2>
          <p style={styles.subtitle}>
            Enter your matric marks to calculate your APS.
          </p>

          <label style={styles.label}>Mathematics (%)</label>
          <input
            style={styles.input}
            type="number"
            name="mathematics"
            value={marks.mathematics}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>English (%)</label>
          <input
            style={styles.input}
            type="number"
            name="english"
            value={marks.english}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>Physical Sciences (%)</label>
          <input
            style={styles.input}
            type="number"
            name="physics"
            value={marks.physics}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>Life Orientation (%)</label>
          <input
            style={styles.input}
            type="number"
            name="lifeOrientation"
            value={marks.lifeOrientation}
            onChange={handleChange}
            placeholder="0-100"
          />

          <div style={{ marginTop: 20 }}>
            <label style={styles.label}>Additional Subjects</label>
            {additionalSubjects.map((subj, index) => (
              <div
                key={index}
                style={{ display: "flex", marginBottom: "8px", gap: "8px" }}
              >
                <input
                  style={{ ...styles.input, flex: 2 }}
                  type="text"
                  placeholder="Subject Name"
                  value={subj.label}
                  onChange={(e) =>
                    handleAdditionalChange(index, "label", e.target.value)
                  }
                />
                <input
                  style={{ ...styles.input, flex: 1 }}
                  type="number"
                  placeholder="% Mark"
                  value={subj.mark}
                  onChange={(e) =>
                    handleAdditionalChange(index, "mark", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              style={{ ...styles.primaryBtn, marginTop: "10px" }}
              onClick={addSubjectField}
            >
              + Add Subject
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <button style={styles.primaryBtn} onClick={calculateAPS}>
              Calculate APS
            </button>
            <button style={styles.secondaryBtn} onClick={resetForm}>
              Reset
            </button>
          </div>

          {/* Qualified Universities */}
          {apsScore !== null && (
            <div style={styles.resultCard}>
              <h3>Your APS Score: {apsScore}</h3>
              <p>Universities you qualify for:</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {qualifiedUnis.length > 0 ? (
                  qualifiedUnis.map((uni) => (
                    <li
                      key={uni.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {uni.name}
                      <button
                        style={styles.applyBtn}
                        onClick={() => applyToUniversity(uni.name)}
                      >
                        Apply
                      </button>
                    </li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>

              {/* Show Qualified Courses */}
              <button
                style={{ ...styles.primaryBtn, marginTop: 15 }}
                onClick={seeQualifiedCourses}
              >
                See Qualified Courses
              </button>

              {showCourses && (
                <div style={{ marginTop: 20 }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {courses
                      .filter((course) => apsScore >= course.minAPS)
                      .map((course) => (
                        <li
                          key={course.name}
                          style={{
                            padding: "12px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            background: "#f1f5f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {/* Course Name */}
                          <div style={{ flex: 2 }}>
                            <strong>{course.name}</strong>
                          </div>

                          {/* Demand */}
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                              Demand
                            </div>
                            <div
                              style={{
                                color: getCourseColor(course.demand),
                                fontWeight: "bold",
                                marginTop: "4px",
                              }}
                            >
                              {course.demand}
                            </div>
                          </div>

                          {/* Duration */}
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                              Duration
                            </div>
                            <div style={{ marginTop: "4px" }}>
                              {course.years} yrs
                            </div>
                          </div>

                          {/* Read More */}
                          <div style={{ flex: 1, textAlign: "right" }}>
                            <button
                              style={styles.readMoreBtn}
                              onClick={() =>
                                alert(`More info about ${course.name}`)
                              }
                            >
                              Read More
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "95%",
    maxWidth: "800px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  heading: { color: "#1e3a8a", fontSize: "28px", marginBottom: "10px" },
  subtitle: { color: "#475569", marginBottom: "20px" },
  label: { fontWeight: "bold", marginTop: "10px", display: "block" },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  primaryBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: 10,
  },
  secondaryBtn: {
    background: "transparent",
    color: "#1e3a8a",
    border: "2px solid #1e3a8a",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resultCard: {
    marginTop: "25px",
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  applyBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  readMoreBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
=======
import React, { useState } from "react";

export const APSCalculator = () => {
  const [marks, setMarks] = useState({
    mathematics: "",
    english: "",
    physics: "",
    lifeOrientation: "",
    additional: "",
  });
  const [additionalSubjects, setAdditionalSubjects] = useState([]);
  const addSubjectField = () => {
    setAdditionalSubjects([...additionalSubjects, { label: "", mark: "" }]);
  };
  const handleAdditionalChange = (index, field, value) => {
    const updated = [...additionalSubjects];
    updated[index][field] = value;
    setAdditionalSubjects(updated);
  };

  const [apsScore, setApsScore] = useState(null);
  const [qualifiedUnis, setQualifiedUnis] = useState([]);
  const [showCourses, setShowCourses] = useState(false);

  const universities = [
    {
      name: "University of Pretoria",
      minAPS: 26,
      url: "https://www.up.ac.za/apply",
    },
    {
      name: "University of Johannesburg",
      minAPS: 22,
      url: "https://www.uj.ac.za/apply",
    },
    {
      name: "University of Cape Town",
      minAPS: 28,
      url: "https://www.uct.ac.za/apply",
    },
    {
      name: "Stellenbosch University",
      minAPS: 27,
      url: "https://www.sun.ac.za/english/apply",
    },
    {
      name: "Wits University",
      minAPS: 25,
      url: "https://www.wits.ac.za/apply",
    },
    {
      name: "University of KwaZulu-Natal",
      minAPS: 22,
      url: "https://www.ukzn.ac.za/apply",
    },
  ];

  const courses = [
    { name: "BSc Computer Science", demand: "High", years: 3, minAPS: 26 },
    {
      name: "BEng Electrical Engineering",
      demand: "High",
      years: 4,
      minAPS: 27,
    },
    {
      name: "BSc Information Technology",
      demand: "Medium",
      years: 3,
      minAPS: 22,
    },
    { name: "BSc Mathematics", demand: "Medium", years: 3, minAPS: 24 },
    { name: "BSc Data Science", demand: "High", years: 3, minAPS: 26 },
    { name: "BSc Physics", demand: "Low", years: 3, minAPS: 23 },
    { name: "BSc Statistics", demand: "Medium", years: 3, minAPS: 24 },
    { name: "BSc AI", demand: "High", years: 3, minAPS: 26 },
    { name: "BSc Information Systems", demand: "Medium", years: 3, minAPS: 22 },
  ];

  const getAPSPoints = (mark) => {
    const m = Number(mark);
    if (m >= 80) return 7;
    if (m >= 70) return 6;
    if (m >= 60) return 5;
    if (m >= 50) return 4;
    return 0;
  };

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const calculateAPS = () => {
    let total =
      getAPSPoints(marks.mathematics) +
      getAPSPoints(marks.english) +
      getAPSPoints(marks.physics) +
      getAPSPoints(marks.lifeOrientation);

    // Include all additional subjects
    additionalSubjects.forEach((subj) => {
      total += getAPSPoints(subj.mark);
    });

    setApsScore(total);

    const qualified = universities.filter((uni) => total >= uni.minAPS);
    setQualifiedUnis(qualified);
    setShowCourses(false); // reset courses display
  };

  const applyToUniversity = (uniName) => {
    const uni = universities.find((u) => u.name === uniName);
    if (!uni || !uni.url) {
      alert("Application link not available.");
      return;
    }
    window.open(uni.url, "_blank"); // opens the official application page in a new tab
  };

  const seeQualifiedCourses = () => {
    setShowCourses(true);
  };

  const resetForm = () => {
    setMarks({
      mathematics: "",
      english: "",
      physics: "",
      lifeOrientation: "",
    });
    setApsScore(null);
    setQualifiedUnis([]);
    setShowCourses(false);
    setAdditionalSubjects([]);
  };

  const getCourseColor = (demand) => {
    if (demand === "High") return "#16a34a";
    if (demand === "Medium") return "#ca8a04";
    return "#dc2626";
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* APS Calculator Form */}
        <div style={styles.card}>
          <h2 style={styles.heading}>APS Calculator</h2>
          <p style={styles.subtitle}>
            Enter your matric marks to calculate your APS.
          </p>

          <label style={styles.label}>Mathematics (%)</label>
          <input
            style={styles.input}
            type="number"
            name="mathematics"
            value={marks.mathematics}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>English (%)</label>
          <input
            style={styles.input}
            type="number"
            name="english"
            value={marks.english}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>Physical Sciences (%)</label>
          <input
            style={styles.input}
            type="number"
            name="physics"
            value={marks.physics}
            onChange={handleChange}
            placeholder="0-100"
          />

          <label style={styles.label}>Life Orientation (%)</label>
          <input
            style={styles.input}
            type="number"
            name="lifeOrientation"
            value={marks.lifeOrientation}
            onChange={handleChange}
            placeholder="0-100"
          />

          <div style={{ marginTop: 20 }}>
            <label style={styles.label}>Additional Subjects</label>
            {additionalSubjects.map((subj, index) => (
              <div
                key={index}
                style={{ display: "flex", marginBottom: "8px", gap: "8px" }}
              >
                <input
                  style={{ ...styles.input, flex: 2 }}
                  type="text"
                  placeholder="Subject Name"
                  value={subj.label}
                  onChange={(e) =>
                    handleAdditionalChange(index, "label", e.target.value)
                  }
                />
                <input
                  style={{ ...styles.input, flex: 1 }}
                  type="number"
                  placeholder="% Mark"
                  value={subj.mark}
                  onChange={(e) =>
                    handleAdditionalChange(index, "mark", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              style={{ ...styles.primaryBtn, marginTop: "10px" }}
              onClick={addSubjectField}
            >
              + Add Subject
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <button style={styles.primaryBtn} onClick={calculateAPS}>
              Calculate APS
            </button>
            <button style={styles.secondaryBtn} onClick={resetForm}>
              Reset
            </button>
          </div>

          {/* Qualified Universities */}
          {apsScore !== null && (
            <div style={styles.resultCard}>
              <h3>Your APS Score: {apsScore}</h3>
              <p>Universities you qualify for:</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {qualifiedUnis.length > 0 ? (
                  qualifiedUnis.map((uni) => (
                    <li
                      key={uni.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {uni.name}
                      <button
                        style={styles.applyBtn}
                        onClick={() => applyToUniversity(uni.name)}
                      >
                        Apply
                      </button>
                    </li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>

              {/* Show Qualified Courses */}
              <button
                style={{ ...styles.primaryBtn, marginTop: 15 }}
                onClick={seeQualifiedCourses}
              >
                See Qualified Courses
              </button>

              {showCourses && (
                <div style={{ marginTop: 20 }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {courses
                      .filter((course) => apsScore >= course.minAPS)
                      .map((course) => (
                        <li
                          key={course.name}
                          style={{
                            padding: "12px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            background: "#f1f5f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {/* Course Name */}
                          <div style={{ flex: 2 }}>
                            <strong>{course.name}</strong>
                          </div>

                          {/* Demand */}
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                              Demand
                            </div>
                            <div
                              style={{
                                color: getCourseColor(course.demand),
                                fontWeight: "bold",
                                marginTop: "4px",
                              }}
                            >
                              {course.demand}
                            </div>
                          </div>

                          {/* Duration */}
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                              Duration
                            </div>
                            <div style={{ marginTop: "4px" }}>
                              {course.years} yrs
                            </div>
                          </div>

                          {/* Read More */}
                          <div style={{ flex: 1, textAlign: "right" }}>
                            <button
                              style={styles.readMoreBtn}
                              onClick={() =>
                                alert(`More info about ${course.name}`)
                              }
                            >
                              Read More
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "95%",
    maxWidth: "800px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  heading: { color: "#1e3a8a", fontSize: "28px", marginBottom: "10px" },
  subtitle: { color: "#475569", marginBottom: "20px" },
  label: { fontWeight: "bold", marginTop: "10px", display: "block" },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  primaryBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: 10,
  },
  secondaryBtn: {
    background: "transparent",
    color: "#1e3a8a",
    border: "2px solid #1e3a8a",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resultCard: {
    marginTop: "25px",
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  applyBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  readMoreBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
