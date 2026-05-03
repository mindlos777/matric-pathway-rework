import React from "react";

export function CTASection() {
  const styles = {
    section: {
      padding: "clamp(60px, 8vw, 100px) 16px",
      background: "#1e3a8a",
      color: "white",
      textAlign: "center",
    },

    content: {
      maxWidth: "820px",
      margin: "0 auto",
    },

    heading: {
      fontSize: "clamp(24px, 5vw, 34px)",
      fontWeight: "bold",
      marginBottom: "16px",
      lineHeight: "1.3",
    },

    subheading: {
      fontSize: "clamp(15px, 4vw, 18px)",
      opacity: 0.9,
      marginBottom: "42px",
      lineHeight: "1.6",
    },

    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "18px",
      flexWrap: "wrap",
    },

    primaryBtn: {
      background: "#facc15",
      color: "#1e3a8a",
      border: "none",
      padding: "14px 26px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },

    secondaryBtn: {
      background: "transparent",
      color: "white",
      border: "2px solid rgba(255,255,255,0.85)",
      padding: "12px 24px",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.2s ease, transform 0.2s ease",
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
          <button
            style={styles.primaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Complete Your Profile
          </button>

          <button
            style={styles.secondaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Explore Universities
          </button>
        </div>
      </div>
    </section>
  );
}
