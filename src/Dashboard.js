import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth";
import { getCourseRecommendations } from "./AI Recommender/recommendationEngine";
import { courses } from "./data/Courses_data";
import { generateAIInsights } from "./AI Recommender/aiInsights";
//before that let us start building the mobile app(navbar at the bottom and also the marks section in profile page i must also be able to take an image on my matric results and it automatically detects the subjects and their respective marks), and also the AI Course Insights must recommend based on student performance(marks, subjects) remember these. Now let us start with the start page(with login and sign up)
export const Dashboard = () => {
  const { logout, apsScore, qualifiedUniversities, subjects } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // just clears user
    navigate("/account"); // redirect after logout
  };

  const aiCourses = getCourseRecommendations(courses, apsScore, subjects).slice(
    0,
    5
  );
  const aiInsights = generateAIInsights(subjects, apsScore);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Welcome back 👋</h1>

          <p style={styles.subtitle}>
            Your academic journey, simplified and guided.
          </p>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatCard
          title="APS Score"
          value={apsScore !== null ? apsScore : "Not calculated"}
        />

        <StatCard
          title="Qualified Universities"
          value={qualifiedUniversities.length}
        />
      </div>
      {/* Qualified Universities */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Universities You Qualify For</h2>

        {apsScore === null ? (
          <p style={styles.emptyText}>
            Calculate your APS to see eligible universities.
          </p>
        ) : qualifiedUniversities.length === 0 ? (
          <p style={styles.emptyText}>
            Your APS does not currently meet the minimum for our listed
            universities.
          </p>
        ) : (
          <div style={styles.uniGrid}>
            {qualifiedUniversities.map((uni, index) => (
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
        )}
      </div>

      {/* Quick Actions */}
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
            description="Find funding options you are eligible for."
            button="View Bursaries"
            onClick={() => navigate("/bursaries")}
          />

          <ActionCard
            title="AI Education Assistant"
            description="Chat with AI to get course recommendations and career advice."
            button="Open AI Chat"
            onClick={() => navigate("/ai")}
          />
        </div>
      </div>

      {/* AI COURSE INSIGHTS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🤖 AI Course Insights</h2>

        {!aiInsights ? (
          <p style={styles.emptyText}>
            Add your subjects to unlock AI insights.
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
                {aiInsights.courses.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Small Components ---------- */

const StatCard = ({ title, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statTitle}>{title}</div>
  </div>
);

const ActionCard = ({ title, description, button, onClick }) => (
  <div style={styles.actionCard}>
    <h3>{title}</h3>
    <p style={{ color: "#475569", marginBottom: 20 }}>{description}</p>
    <button style={styles.primaryBtn} onClick={onClick}>
      {button}
    </button>
  </div>
);

/* ---------- Styles ---------- */

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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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

  progressCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  progressList: {
    listStyle: "none",
    padding: 0,
    color: "#475569",
    lineHeight: "2",
  },

  emptyText: {
    color: "#64748b",
    marginTop: "10px",
  },

  uniGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "15px",
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

  aiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  aiCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  aiBadge: {
    marginTop: "10px",
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "8px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontWeight: "bold",
    fontSize: "12px",
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