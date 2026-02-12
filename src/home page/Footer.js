import React from "react";

export function Footer() {
  const styles = {
    footer: {
      background: "#0f172a",
      color: "#cbd5f5",
      padding: "60px 20px 30px",
      fontSize: "14px",
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "40px",
      marginBottom: "40px",
    },

    brand: {
      maxWidth: "320px",
    },

    brandTitle: {
      color: "#facc15",
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "12px",
    },

    brandText: {
      lineHeight: "1.6",
      color: "#cbd5f5",
    },

    heading: {
      color: "white",
      fontSize: "16px",
      marginBottom: "14px",
      fontWeight: "bold",
    },

    link: {
      display: "block",
      color: "#cbd5f5",
      textDecoration: "none",
      marginBottom: "10px",
      cursor: "pointer",
    },

    trust: {
      background: "#020617",
      padding: "14px 18px",
      borderRadius: "10px",
      marginTop: "12px",
      fontSize: "13px",
      color: "#e2e8f0",
    },

    bottom: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: "20px",
      textAlign: "center",
      fontSize: "13px",
      color: "#94a3b8",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top Grid */}
        <div style={styles.grid}>
          {/* Brand */}
          <div style={styles.brand}>
            <div style={styles.brandTitle}>UniPath SA</div>
            <p style={styles.brandText}>
              Helping South African matriculants discover universities, courses,
              and funding opportunities they qualify for — all in one trusted
              platform.
            </p>

            <div style={styles.trust}>
              POPIA compliant • Government-aligned • Student-first
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={styles.heading}>Platform</h4>
            <span style={styles.link}>How It Works</span>
            <span style={styles.link}>Explore Universities</span>
            <span style={styles.link}>Courses & Careers</span>
            <span style={styles.link}>Bursaries & NSFAS</span>
          </div>

          {/* Support */}
          <div>
            <h4 style={styles.heading}>Support</h4>
            <span style={styles.link}>Help Centre</span>
            <span style={styles.link}>Contact Us</span>
            <span style={styles.link}>Privacy Policy</span>
            <span style={styles.link}>Terms & Conditions</span>
          </div>

          {/* Trust */}
          <div>
            <h4 style={styles.heading}>Trusted By</h4>
            <span style={styles.link}>Department of Higher Education</span>
            <span style={styles.link}>NSFAS</span>
            <span style={styles.link}>South African Universities</span>
            <span style={styles.link}>POPIA</span>
          </div>
        </div>

        {/* Bottom */}
        <div style={styles.bottom}>
          © {new Date().getFullYear()} UniPath SA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
