import React, { useState } from "react";
import { useAuth } from "./auth/auth";
import { useNavigate } from "react-router-dom";

export const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (isLogin) {
        // LOGIN
        await login(email, password);
        navigate("/dashboard");
      } else {
        // SIGNUP
        await signup(email, password, fullName);

        alert("Account created successfully. You are now logged in.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(getFirebaseMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await login("guest@test.com", "123456");
      navigate("/dashboard");
    } catch {
      setError("Guest account not found. Create one in Firebase first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p style={styles.subtitle}>
          {isLogin
            ? "Login to continue your journey"
            : "Start planning your future today"}
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
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

          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        <button
          style={styles.secondaryBtn}
          onClick={handleGuestLogin}
          disabled={loading}
        >
          Continue as Guest
        </button>

        <p style={styles.toggle}>
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            style={styles.link}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

/* FIREBASE ERROR HANDLER */
function getFirebaseMessage(code) {
  switch (code) {
    case "auth/user-not-found":
      return "No account found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Invalid email address.";
    default:
      return "Something went wrong. Try again.";
  }
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #f8fafc 100%)",
    padding: 20,
  },

  card: {
    background: "white",
    width: "100%",
    maxWidth: 420,
    padding: 35,
    borderRadius: 18,
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: 28,
    color: "#1e3a8a",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 25,
    marginTop: 8,
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #dbeafe",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 15,
  },

  secondaryBtn: {
    width: "100%",
    padding: 13,
    background: "#f1f5f9",
    color: "#1e3a8a",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 12,
    fontSize: 15,
  },

  toggle: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#475569",
  },

  link: {
    color: "#1e3a8a",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 14,
    textAlign: "center",
  },
};
