import { NavLink } from "react-router-dom";
import { useAuth } from "./auth/auth";
import { useState, useEffect } from "react";

export function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = isLoggedIn
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Courses", path: "/courses" },
        { name: "Applications", path: "/applications" },
        { name: "Bursaries", path: "/bursaries" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "APS Calculator", path: "/aps" },
        { name: "About", path: "/about" },
        { name: "Account", path: "/account" },
      ];

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 999,
      background: "#1e3a8a",
      padding: "10px 0",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    container: {
      maxWidth: "900px",
      width: "100%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "10px 16px",
    },
    logo: {
      height: "35px",
      cursor: "default",
    },
    linksContainer: {
      display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "20px",
      width: isMobile ? "100%" : "auto",
      marginTop: isMobile ? "10px" : "0",
      padding: "0px 20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      fontSize: "15px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    active: {
      background: "#2749b5",
    },
    hamburger: {
      display: isMobile ? "flex" : "none",
      flexDirection: "column",
      cursor: "pointer",
      gap: "4px",
      padding: "0px 20px",
    },
    bar: {
      width: "25px",
      height: "3px",
      backgroundColor: "white",
      borderRadius: "2px",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <img
          src="/nodebox/src/images/FullLogo_Transparent_NoBuffer.png"
          alt="Matric Pathway logo"
          style={styles.logo}
        />

        {/* Hamburger Menu */}
        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span style={styles.bar}></span>
          <span style={styles.bar}></span>
          <span style={styles.bar}></span>
        </div>

        {/* Nav Links */}
        <div style={styles.linksContainer}>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.active : {}),
              })}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
