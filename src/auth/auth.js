import React, { createContext, useContext, useEffect, useState } from "react";
import { universities } from "../data/Universities";

import { auth, db } from "../auth/firebase";

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
  const [apsScore, setApsScore] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [qualifiedUniversities, setQualifiedUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  /* LOGIN */
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  /* SIGNUP */
  const signup = async (email, password, fullName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      fullName,
      email,
      createdAt: new Date(),
    });
  };

  /* LOGOUT */
  const logout = async () => {
    await signOut(auth);
    setApsScore(null);
    setSubjects([]);
    setQualifiedUniversities([]);
  };

  /* WATCH LOGIN STATE */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const snap = await getDoc(doc(db, "users", currentUser.uid));

        if (snap.exists()) {
          const data = snap.data();

          setApsScore(data.apsScore || null);
          setSubjects(data.subjects || []);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  /* APS Qualification Auto Update */
  useEffect(() => {
    if (apsScore !== null) {
      const eligible = universities.filter((uni) => apsScore >= uni.minAPS);

      setQualifiedUniversities(eligible);
    } else {
      setQualifiedUniversities([]);
    }
  }, [apsScore]);

  /* SAVE APS TO FIREBASE */
  const saveAPS = async (score, subs) => {
    if (!user) return;

    setApsScore(score);
    setSubjects(subs);

    await setDoc(
      doc(db, "users", user.uid),
      {
        apsScore: score,
        subjects: subs,
      },
      { merge: true }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        apsScore,
        setApsScore: saveAPS,
        subjects,
        setSubjects,
        qualifiedUniversities,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
