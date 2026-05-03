import React, { createContext, useContext, useState, useEffect } from "react";

import { auth, db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ---------------- PROFILE DATA ----------------
  const [apsScore, setApsScoreState] = useState(null);

  // IMPORTANT: standardized format
  const [subjects, setSubjectsState] = useState([]);

  const [field, setField] = useState(null); // future: user career interest

  const [loading, setLoading] = useState(true);

  // ---------------- REGISTER ----------------
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setApsScoreState(null);
    setSubjectsState([]);
    setField(null);
  };

  // ---------------- SAVE APS ----------------
  const setApsScore = async (score) => {
    setApsScoreState(score);

    if (auth.currentUser) {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { apsScore: score },
        { merge: true }
      );
    }
  };

  // ---------------- SAVE SUBJECTS ----------------
  const setSubjects = async (newSubjects) => {
    setSubjectsState(newSubjects);

    if (auth.currentUser) {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { subjects: newSubjects },
        { merge: true }
      );
    }
  };

  // ---------------- SAVE FIELD ----------------
  const setUserField = async (newField) => {
    setField(newField);

    if (auth.currentUser) {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { field: newField },
        { merge: true }
      );
    }
  };

  // ---------------- AUTH LISTENER ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          const ref = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();

            setApsScoreState(data.apsScore || null);

            // SAFE DEFAULTS (IMPORTANT FIX)
            setSubjectsState(data.subjects || []);

            setField(data.field || null);
          } else {
            // create empty profile if none exists
            await setDoc(ref, {
              apsScore: null,
              subjects: [],
              field: null,
            });
          }
        } else {
          setUser(null);
          setApsScoreState(null);
          setSubjectsState([]);
          setField(null);
        }
      } catch (error) {
        console.log("Auth error:", error.message);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // auth
        user,
        loading,
        login,
        register,
        logout,

        // profile
        apsScore,
        setApsScore,

        subjects,
        setSubjects,

        field,
        setUserField,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);