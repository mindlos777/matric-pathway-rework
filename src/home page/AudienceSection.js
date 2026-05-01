<<<<<<< HEAD
import React from "react";

export function AudienceSection() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#f1f5f9",
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
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      background: "white",
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
  };

  const audience = [
    {
      icon: "🎓",
      title: "Matric Students",
      text: "Easily see which universities and courses you qualify for and apply with confidence.",
    },
    {
      icon: "🏫",
      title: "Universities",
      text: "Receive pre-verified applications from eligible students, reducing administrative workload.",
    },
    {
      icon: "💰",
      title: "Funding Bodies",
      text: "Quickly identify students eligible for bursaries like NSFAS and other grants.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Parents & Guardians",
      text: "Track progress, verify eligibility, and support their child’s future.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Who We Serve</h2>
      <p style={styles.subheading}>
        Our platform is designed for everyone involved in the
        matric-to-university journey.
      </p>
      <div style={styles.grid}>
        {audience.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
=======
import React from "react";

export function AudienceSection() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#f1f5f9",
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
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      background: "white",
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
  };

  const audience = [
    {
      icon: "🎓",
      title: "Matric Students",
      text: "Easily see which universities and courses you qualify for and apply with confidence.",
    },
    {
      icon: "🏫",
      title: "Universities",
      text: "Receive pre-verified applications from eligible students, reducing administrative workload.",
    },
    {
      icon: "💰",
      title: "Funding Bodies",
      text: "Quickly identify students eligible for bursaries like NSFAS and other grants.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Parents & Guardians",
      text: "Track progress, verify eligibility, and support their child’s future.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Who We Serve</h2>
      <p style={styles.subheading}>
        Our platform is designed for everyone involved in the
        matric-to-university journey.
      </p>
      <div style={styles.grid}>
        {audience.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
