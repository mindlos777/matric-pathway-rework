import { NavLink } from "react-router-dom";
import { useAuth } from "./auth/auth";

export function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 999,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#1e3a8a",
      padding: "10px 20px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      height: "calc(100vh - 90vh)",
    },
    logo: {
      height: "35px",
      cursor: "default", // non-clickable
    },
    linksContainer: {
      display: "flex",
      gap: "15px",
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
  };

  // Dynamic nav items
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

  return (
    <nav style={styles.nav}>
      {/* Logo on the left */}
      <img
        src="/nodebox/src/images/FullLogo_Transparent_NoBuffer.png"
        alt="Matric Pathway logo"
        style={styles.logo}
      />

      {/* Nav items on the right */}
      <div style={styles.linksContainer}>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
