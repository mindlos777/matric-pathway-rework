import React from "react";

export function HowItWorks() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#f8fafc",
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
      marginBottom: "50px",
      maxWidth: "700px",
      margin: "0 auto 50px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "30px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      background: "white",
      borderRadius: "16px",
      padding: "30px 25px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      transition: "transform 0.2s",
    },
    icon: {
      fontSize: "40px",
      marginBottom: "15px",
    },
    stepNumber: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#2563eb",
      marginBottom: "10px",
    },
    cardTitle: {
      fontSize: "20px",
      color: "#1e3a8a",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "16px",
      color: "#475569",
      lineHeight: "1.5",
    },
  };

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description:
        "Enter your matric subjects and marks once. We automatically calculate your APS score.",
      icon: "📝",
    },
    {
      number: "2",
      title: "Get Matched",
      description:
        "See universities and courses you qualify for, ranked by demand in the job market.",
      icon: "🎓",
    },
    {
      number: "3",
      title: "Apply & Get Funded",
      description:
        "Apply to universities and bursaries like NSFAS with pre-filled applications.",
      icon: "🚀",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>How It Works</h2>
      <p style={styles.subheading}>
        From matric results to university applications — in just three steps.
      </p>

      <div style={styles.grid}>
        {steps.map((step) => (
          <div key={step.number} style={styles.card}>
            <div style={styles.icon}>{step.icon}</div>
            <div style={styles.stepNumber}>Step {step.number}</div>
            <h3 style={styles.cardTitle}>{step.title}</h3>
            <p style={styles.cardText}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
