import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  // ---------------- AUTH ----------------
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfileData(null);
  };

  // ---------------- SAVE PROFILE ----------------
  const saveProfile = async (data) => {
    if (!auth.currentUser) return;

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      data,
      { merge: true }
    );
  };

  // ---------------- REAL-TIME LISTENER ----------------
  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const ref = doc(db, "users", firebaseUser.uid);

        // 🔥 REAL-TIME FIRESTORE SYNC
        unsubscribeProfile = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            setProfileData(snap.data());
          } else {
            // create empty profile
            setDoc(ref, {
              email: firebaseUser.email,
              subjects: [],
              apsScore: 0,
            });
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setProfileData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profileData,
        loading,
        login,
        register,
        logout,
        saveProfile,
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);