import React, { createContext, useContext, useState, useEffect } from "react";
import { universities } from "../data/Universities";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apsScore, setApsScore] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [qualifiedUniversities, setQualifiedUniversities] = useState([]);

  const login = (email, password) => {
    if (email && password) {
      const newUser = { email };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setApsScore(null);
    setSubjects([]);
    setQualifiedUniversities([]);
  };

  // 🔥 AUTO RECALCULATE ELIGIBILITY WHEN APS CHANGES
  useEffect(() => {
    if (apsScore !== null) {
      const eligible = universities.filter((uni) => apsScore >= uni.minAPS);
      setQualifiedUniversities(eligible);
    } else {
      setQualifiedUniversities([]);
    }
  }, [apsScore]); // runs whenever APS updates

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        apsScore,
        setApsScore,
        subjects,
        setSubjects,
        qualifiedUniversities,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
