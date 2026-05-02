import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth";
import { getCourseRecommendations } from "./AI Recommender/recommendationEngine";
import { courses } from "./data/Courses_data";
import { generateAIInsights } from "./AI Recommender/aiInsights";

export const Dashboard = () => {
  const {
    logout,
    apsScore,
    qualifiedUniversities,
    subjects,
    profileData,
  } = useAuth();

  const navigate = useNavigate();

  const [showAllUniversities, setShowAllUniversities] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/account");
  };

  const firstName =
    profileData?.firstName ||
    profileData?.fullName?.split(" ")[0] ||
    "Student";

  const aiCourses = getCourseRecommendations(
    courses,
    apsScore,
    subjects
  ).slice(0, 5);

  const aiInsights = generateAIInsights(subjects, apsScore);

  const visibleUniversities = showAllUniversities
    ? qualifiedUniversities
    : qualifiedUniversities.slice(0, 4);

  
    const profileFields = [
      profileData?.firstName,
      profileData?.lastName,
      profileData?.email,
      profileData?.phone,
      profileData?.dob,
      profileData?.gender,
      profileData?.idNumber,
      profileData?.city,
      profileData?.province,
      profileData?.schoolName,
      profileData?.matricYear,
    ];

    const completedFields = profileFields.filter(
      (item) => item && String(item).trim() !== ""
    ).length;

    const completion = Math.round(
      (completedFields / profileFields.length) * 100
    );

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Welcome back, {firstName} 👋</h1>

          <p style={styles.subtitle}>
            Your academic journey, simplified and guided.
          </p>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <StatCard
          title="APS Score"
          value={apsScore !== null ? apsScore : "Not calculated"}
        />

        <StatCard
          title="Qualified Universities"
          value={qualifiedUniversities.length}
        />

        <StatCard
          title="Subjects Added"
          value={subjects?.length || 0}
        />
      </div>

      {/* PROFILE STATUS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Profile Overview</h2>

        <div style={styles.profileCard}>
          <div style={styles.progressBarWrap}>
            <div
              style={{
                ...styles.progressBar,
                width: `${completion}%`,
              }}
            />
          </div>

          <p style={styles.profileText}>
            Your profile is <strong>{completion}% complete</strong>
          </p>

          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/profile")}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* QUALIFIED UNIVERSITIES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Universities You Qualify For</h2>

        {apsScore === null ? (
          <p style={styles.emptyText}>
            Complete and save your profile to calculate APS.
          </p>
        ) : qualifiedUniversities.length === 0 ? (
          <p style={styles.emptyText}>
            Your APS does not currently meet listed university minimums.
          </p>
        ) : (
          <>
            <div style={styles.uniGrid}>
              {visibleUniversities.map((uni, index) => (
                <div key={index} style={styles.uniCard}>
                  <h3 style={{ marginBottom: 8 }}>{uni.name}</h3>

                  <p style={{ color: "#64748b", marginBottom: 12 }}>
                    Minimum APS Required: <strong>{uni.minAPS}</strong>
                  </p>

                  <button
                    style={styles.applyBtn}
                    onClick={() => window.open(uni.applyLink, "_blank")}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {qualifiedUniversities.length > 4 && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <button
                  style={styles.seeMoreBtn}
                  onClick={() =>
                    setShowAllUniversities(!showAllUniversities)
                  }
                >
                  {showAllUniversities
                    ? "Show Less"
                    : `See More (${qualifiedUniversities.length - 4})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>

        <div style={styles.actionGrid}>
          <ActionCard
            title="University Applications"
            description="View and apply to universities you qualify for."
            button="View Applications"
            onClick={() => navigate("/applications")}
          />

          <ActionCard
            title="Bursaries & Funding"
            description="Find funding options you may qualify for."
            button="View Bursaries"
            onClick={() => navigate("/bursaries")}
          />

          <ActionCard
            title="AI Education Assistant"
            description="Get recommendations and career guidance."
            button="Open AI Chat"
            onClick={() => navigate("/ai")}
          />
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🤖 AI Course Insights</h2>

        {!aiInsights ? (
          <p style={styles.emptyText}>
            Add subjects and marks in your profile to unlock insights.
          </p>
        ) : (
          <div style={styles.aiCard}>
            <p style={styles.aiText}>
              <strong>APS Analysis:</strong> {aiInsights.apsInsight}
            </p>

            <p style={styles.aiText}>
              <strong>Career Guidance:</strong> {aiInsights.careerInsight}
            </p>

            <div>
              <strong>Recommended Courses:</strong>

              <ul style={styles.aiList}>
                {aiCourses.map((course, index) => (
                  <li key={index}>{course.name || course}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* COMPONENTS */

const StatCard = ({ title, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statTitle}>{title}</div>
  </div>
);

const ActionCard = ({ title, description, button, onClick }) => (
  <div style={styles.actionCard}>
    <h3>{title}</h3>

    <p style={{ color: "#475569", marginBottom: 20 }}>
      {description}
    </p>

    <button style={styles.primaryBtn} onClick={onClick}>
      {button}
    </button>
  </div>
);

/* STYLES */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "15px",
  },

  title: {
    fontSize: "32px",
    color: "#1e3a8a",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#475569",
  },

  logoutBtn: {
    background: "transparent",
    border: "2px solid #1e3a8a",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#1e3a8a",
    fontWeight: "bold",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  statTitle: {
    marginTop: "8px",
    color: "#64748b",
  },

  section: {
    marginBottom: "40px",
  },

  sectionTitle: {
    fontSize: "22px",
    color: "#1e3a8a",
    marginBottom: "20px",
  },

  profileCard: {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
},

  progressBarWrap: {
    width: "100%",
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "15px",
  },

  progressBar: {
    height: "100%",
    background: "#16a34a",
    borderRadius: "999px",
    transition: "0.4s ease",
  },

  profileText: {
    color: "#475569",
    marginBottom: "15px",
  },

  emptyText: {
    color: "#64748b",
  },

  uniGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  uniCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  applyBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  seeMoreBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  actionCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  primaryBtn: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  aiCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  aiText: {
    marginBottom: "15px",
    color: "#334155",
  },

  aiList: {
    marginTop: "10px",
    paddingLeft: "20px",
    color: "#475569",
  },
};