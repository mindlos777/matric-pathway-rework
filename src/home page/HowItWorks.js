import React from "react";

export function HowItWorks() {
  const styles = {
    section: {
      padding: "clamp(60px, 8vw, 100px) 16px",
      background: "#f8fafc",
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
      maxWidth: "720px",
      margin: "0 auto 48px",
      lineHeight: "1.6",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "28px",
      maxWidth: "1100px",
      margin: "0 auto",
    },

    card: {
      background: "white",
      borderRadius: "18px",
      padding: "32px 26px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },

    icon: {
      fontSize: "40px",
      marginBottom: "16px",
    },

    stepNumber: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#2563eb",
      marginBottom: "8px",
      letterSpacing: "0.5px",
    },

    cardTitle: {
      fontSize: "clamp(18px, 4vw, 20px)",
      color: "#1e3a8a",
      marginBottom: "10px",
    },

    cardText: {
      fontSize: "clamp(14px, 4vw, 16px)",
      color: "#475569",
      lineHeight: "1.6",
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
        "See universities and courses you qualify for, ranked by job market demand.",
      icon: "🎓",
    },
    {
      number: "3",
      title: "Apply & Get Funded",
      description:
        "Apply to universities and bursaries like NSFAS with smart, pre-filled applications.",
      icon: "🚀",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>How It Works</h2>

      <p style={styles.subheading}>
        From matric results to university applications — in just three simple
        steps.
      </p>

      <div style={styles.grid}>
        {steps.map((step) => (
          <div
            key={step.number}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 16px 35px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >
            <div style={styles.icon}>{step.icon}</div>
            <div style={styles.stepNumber}>STEP {step.number}</div>
            <h3 style={styles.cardTitle}>{step.title}</h3>
            <p style={styles.cardText}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
