<<<<<<< HEAD
import React from "react";

export function Headline() {
  const styles = {
    hero: {
      background: "linear-gradient(135deg, #1e3a8a, #2749b5)",
      color: "white",
      padding: "clamp(50px, 8vw, 90px) 16px",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      maxWidth: "900px",
      width: "100%",
      margin: "0",
      textAlign: "center",
    },
    badge: {
      display: "inline-block",
      background: "rgba(255,255,255,0.15)",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "clamp(12px, 3vw, 14px)",
      marginBottom: "18px",
    },
    title: {
      fontSize: "clamp(28px, 6vw, 42px)",
      fontWeight: "bold",
      lineHeight: "1.15",
      marginBottom: "18px",
    },
    highlight: {
      color: "#facc15",
    },
    subtitle: {
      fontSize: "clamp(15px, 4vw, 18px)",
      opacity: 0.95,
      maxWidth: "700px",
      margin: "0 auto 28px",
      lineHeight: "1.6",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "14px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      background: "#facc15",
      color: "#1e3a8a",
      border: "none",
      padding: "14px 22px",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
      minWidth: "220px",
    },
    secondaryBtn: {
      background: "transparent",
      color: "white",
      border: "2px solid white",
      padding: "14px 22px",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      minWidth: "220px",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(20px, 6vw, 40px)",
      marginTop: "10px",
      fontSize: "14px",
      flexWrap: "wrap",
    },
    statItem: {
      minWidth: "90px",
    },
    statNumber: {
      fontSize: "clamp(18px, 4vw, 22px)",
      fontWeight: "bold",
      display: "block",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.container}>
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
          <div style={styles.statItem}>
            <span style={styles.statNumber}>26+</span>
            <span>Universities</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>300+</span>
            <span>Courses</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>10+</span>
            <span>Bursaries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
=======
import React from "react";

export function Headline() {
  const styles = {
    hero: {
      background: "linear-gradient(135deg, #1e3a8a, #2749b5)",
      color: "white",
      padding: "clamp(50px, 8vw, 90px) 16px",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      maxWidth: "900px",
      width: "100%",
      margin: "0",
      textAlign: "center",
    },
    badge: {
      display: "inline-block",
      background: "rgba(255,255,255,0.15)",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "clamp(12px, 3vw, 14px)",
      marginBottom: "18px",
    },
    title: {
      fontSize: "clamp(28px, 6vw, 42px)",
      fontWeight: "bold",
      lineHeight: "1.15",
      marginBottom: "18px",
    },
    highlight: {
      color: "#facc15",
    },
    subtitle: {
      fontSize: "clamp(15px, 4vw, 18px)",
      opacity: 0.95,
      maxWidth: "700px",
      margin: "0 auto 28px",
      lineHeight: "1.6",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "14px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      background: "#facc15",
      color: "#1e3a8a",
      border: "none",
      padding: "14px 22px",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
      minWidth: "220px",
    },
    secondaryBtn: {
      background: "transparent",
      color: "white",
      border: "2px solid white",
      padding: "14px 22px",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      minWidth: "220px",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(20px, 6vw, 40px)",
      marginTop: "10px",
      fontSize: "14px",
      flexWrap: "wrap",
    },
    statItem: {
      minWidth: "90px",
    },
    statNumber: {
      fontSize: "clamp(18px, 4vw, 22px)",
      fontWeight: "bold",
      display: "block",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.container}>
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
          <div style={styles.statItem}>
            <span style={styles.statNumber}>26+</span>
            <span>Universities</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>300+</span>
            <span>Courses</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>10+</span>
            <span>Bursaries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
