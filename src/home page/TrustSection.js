import React from "react";

export function TrustSection() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#ffffff",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    },
    heading: {
      fontSize: "32px",
      color: "#1e3a8a",
      marginBottom: "10px",
    },
    subheading: {
      fontSize: "18px",
      color: "#475569",
      maxWidth: "800px",
      margin: "0 auto 50px",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "30px",
      marginBottom: "50px",
    },
    card: {
      background: "#f8fafc",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    },
    icon: {
      fontSize: "36px",
      marginBottom: "15px",
    },
    cardTitle: {
      fontSize: "18px",
      color: "#1e3a8a",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "15px",
      color: "#475569",
      lineHeight: "1.5",
    },
    logos: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
    },
    logo: {
      background: "#e2e8f0",
      padding: "10px 18px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#1e3a8a",
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
      text: "Course recommendations are informed by current job market demand.",
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
            <div key={index} style={styles.card}>
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
