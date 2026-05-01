import React from "react";

export function TrustSection() {
  const styles = {
    section: {
      padding: "clamp(60px, 8vw, 100px) 16px",
      background: "#ffffff",
    },

    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    },

    heading: {
      fontSize: "clamp(24px, 5vw, 34px)",
      color: "#1e3a8a",
      marginBottom: "12px",
      fontWeight: "bold",
    },

    subheading: {
      fontSize: "clamp(15px, 4vw, 18px)",
      color: "#475569",
      maxWidth: "820px",
      margin: "0 auto 48px",
      lineHeight: "1.6",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "28px",
      marginBottom: "50px",
    },

    card: {
      background: "#f8fafc",
      padding: "32px",
      borderRadius: "18px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },

    icon: {
      fontSize: "38px",
      marginBottom: "16px",
    },

    cardTitle: {
      fontSize: "clamp(16px, 4vw, 18px)",
      color: "#1e3a8a",
      marginBottom: "8px",
      fontWeight: "600",
    },

    cardText: {
      fontSize: "clamp(14px, 4vw, 15px)",
      color: "#475569",
      lineHeight: "1.6",
    },

    logos: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "16px",
    },

    logo: {
      background: "#e2e8f0",
      padding: "10px 20px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e3a8a",
      letterSpacing: "0.3px",
    },
  };

  const trustPoints = [
    {
      icon: "🏛️",
      title: "Government-Aligned",
      text: "Designed to support South Africa’s digital education and youth employment goals.",
    },
    {
      icon: "🔒",
      title: "POPIA Compliant",
      text: "Your personal data is protected and only shared with your consent.",
    },
    {
      icon: "🎓",
      title: "University-Verified Data",
      text: "Admission requirements and APS calculations follow official university criteria.",
    },
    {
      icon: "💼",
      title: "Labour Market Insights",
      text: "Course recommendations are informed by real job market demand.",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          Trusted by Students. Built for the Future.
        </h2>

        <p style={styles.subheading}>
          A platform designed with education institutions, funding bodies, and
          data protection in mind.
        </p>

        <div style={styles.grid}>
          {trustPoints.map((item, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.06)";
              }}
            >
              <div style={styles.icon}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={styles.logos}>
          <span style={styles.logo}>Department of Higher Education</span>
          <span style={styles.logo}>NSFAS</span>
          <span style={styles.logo}>SA Universities</span>
          <span style={styles.logo}>POPIA</span>
        </div>
      </div>
    </section>
  );
}