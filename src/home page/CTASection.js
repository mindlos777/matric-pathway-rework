import React from "react";

export function CTASection() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#1e3a8a",
      color: "white",
      textAlign: "center",
    },
    content: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    heading: {
      color: "white",
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    subheading: {
      fontSize: "18px",
      opacity: 0.9,
      marginBottom: "40px",
      lineHeight: "1.6",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
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
  };

  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.heading}>
          Ready to Take Control of Your University Journey?
        </h2>
        <p style={styles.subheading}>
          Complete your profile today, discover your best-fit universities, and
          secure funding opportunities with ease.
        </p>
        <div style={styles.actions}>
          <button style={styles.primaryBtn}>Complete Your Profile</button>
          <button style={styles.secondaryBtn}>Explore Universities</button>
        </div>
      </div>
    </section>
  );
}
