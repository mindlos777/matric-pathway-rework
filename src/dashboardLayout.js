import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopRightActions } from "./components/TopRightActions";

export const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setCollapsed(true);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "My Profile", path: "/profile", icon: "👤" },
    { name: "Discover Courses", path: "/courses", icon: "🎓" },
    { name: "Bursaries", path: "/bursaries", icon: "💰" },
    { name: "Applications", path: "/applications", icon: "📝" },
  ];

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          width: collapsed ? "70px" : "240px",
        }}
      >
        {/* LOGO + TOGGLE */}
        <div style={styles.logoRow}>
          {!collapsed && <h2 style={styles.logo}>EduMatch</h2>}

          <button
            style={styles.toggleBtn}
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        {/* NAV LINKS */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navItem,
              justifyContent: collapsed ? "center" : "flex-start",
              background:
                location.pathname === item.path ? "#1e3a8a" : "transparent",
              color: location.pathname === item.path ? "white" : "#334155",
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>

            {!collapsed && <span style={{ marginLeft: 12 }}>{item.name}</span>}
          </Link>
        ))}
      </div>

      {/* MAIN AREA */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>{/*title*/}</h2>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
  },

  sidebar: {
    background: "white",
    padding: "20px",
    borderRight: "1px solid #e2e8f0",
    transition: "width 0.3s ease",
    height: "100vh",
    position: "sticky",
    top: 0,
    overflowY: "hidden",
    overflowX: "hidden",
    flexShrink: 0,
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },

  logo: {
    color: "#1e3a8a",
    margin: 0,
  },

  toggleBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "8px",
    textDecoration: "none",
    marginBottom: "10px",
    fontWeight: "500",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  header: {
    background: "white",
    padding: "20px",
    borderBottom: "1px solid #e2e8f0",
  },

  content: {
    padding: "30px",
  },
};
