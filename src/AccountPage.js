import React, { useState } from "react";
import { useAuth } from "./auth/auth";
import { useNavigate } from "react-router-dom";

export const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // 🔐 LOGIN FLOW → GO TO DASHBOARD
      const success = login(email, password);
      if (success) navigate("/dashboard");
    } else {
      // 📝 SIGN UP FLOW → SWITCH TO LOGIN FORM
      alert("Account created successfully! Please log in.");
      setIsLogin(true);
      setFullName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.primaryBtn}>
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        <p style={styles.toggle}>
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },
  card: {
    background: "white",
    padding: 40,
    width: 350,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  primaryBtn: {
    width: "100%",
    padding: 12,
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginTop: 10,
  },
  toggle: { marginTop: 15 },
  link: { color: "#1e3a8a", cursor: "pointer", fontWeight: "bold" },
};
