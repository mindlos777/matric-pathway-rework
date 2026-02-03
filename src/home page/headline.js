import React from "react";

export function Headline() {
  const styles = {
    hero: {
      background: "linear-gradient(135deg, #1e3a8a, #2749b5)",
      color: "white",
      padding: "80px 20px",
      display: "flex",
      justifyContent: "center",
    },
    content: {
      maxWidth: "900px",
      textAlign: "center",
    },
    badge: {
      display: "inline-block",
      background: "rgba(255,255,255,0.15)",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "14px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "42px",
      fontWeight: "bold",
      lineHeight: "1.2",
      marginBottom: "20px",
    },
    highlight: {
      color: "#facc15",
    },
    subtitle: {
      fontSize: "18px",
      opacity: 0.95,
      maxWidth: "700px",
      margin: "0 auto 30px",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "40px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      background: "#facc15",
      color: "#1e3a8a",
      border: "none",
      padding: "14px 22px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    secondaryBtn: {
      background: "transparent",
      color: "white",
      border: "2px solid white",
      padding: "12px 20px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      marginTop: "20px",
      fontSize: "14px",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.content}>
        <span style={styles.badge}>
          For Matriculants • SA Universities • NSFAS
        </span>

        <h1 style={styles.title}>
          Your Matric Results.
          <br />
          <span style={styles.highlight}>Your University Path.</span>
        </h1>

        <p style={styles.subtitle}>
          Discover universities and courses you qualify for, see which careers
          are in demand, and apply for bursaries like NSFAS — all in one place.
        </p>

        <div style={styles.actions}>
          <button style={styles.primaryBtn}>Complete Your Profile</button>
          <button style={styles.secondaryBtn}>Explore Universities</button>
        </div>

        <div style={styles.stats}>
          <div>
            <strong>26+</strong>
            <span>Universities</span>
          </div>
          <div>
            <strong>300+</strong>
            <span>Courses</span>
          </div>
          <div>
            <strong>10+</strong>
            <span>Bursaries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
