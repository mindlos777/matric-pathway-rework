import React from "react";

export function FeaturesSection() {
  const styles = {
    section: {
      padding: "clamp(50px, 8vw, 90px) 16px",
      background: "#f8fafc",
      display: "flex",
      justifyContent: "center",
    },

    container: {
      maxWidth: "1100px",
      width: "100%",
      textAlign: "center",
    },

    title: {
      fontSize: "clamp(24px, 5vw, 36px)",
      fontWeight: "bold",
      color: "#1e3a8a",
      marginBottom: "14px",
    },

    subtitle: {
      fontSize: "clamp(15px, 4vw, 18px)",
      color: "#475569",
      maxWidth: "700px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "24px",
    },

    card: {
      background: "white",
      padding: "26px 22px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      textAlign: "left",
      transition: "transform 0.2s ease",
    },

    icon: {
      fontSize: "32px",
      marginBottom: "12px",
    },

    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1e3a8a",
      marginBottom: "8px",
    },

    cardText: {
      fontSize: "14px",
      color: "#475569",
      lineHeight: "1.6",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>How We Help You Succeed</h2>

        <p style={styles.subtitle}>
          We simplify your journey after matric by matching your results to the
          right universities, courses, and funding opportunities.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>📊</div>
            <h3 style={styles.cardTitle}>APS-Based Matching</h3>
            <p style={styles.cardText}>
              Instantly see courses and institutions you qualify for using your
              APS score and subject marks.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🎓</div>
            <h3 style={styles.cardTitle}>Universities & Colleges</h3>
            <p style={styles.cardText}>
              Explore public universities, TVET colleges, and private
              institutions across South Africa.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>💼</div>
            <h3 style={styles.cardTitle}>Career Demand Insights</h3>
            <p style={styles.cardText}>
              Understand which careers are in high demand so you can plan for
              the future, not just admission.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>💰</div>
            <h3 style={styles.cardTitle}>Bursaries & NSFAS</h3>
            <p style={styles.cardText}>
              Find bursaries you qualify for and track applications without
              jumping between multiple websites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
