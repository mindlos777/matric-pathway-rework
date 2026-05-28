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

  // ================= REFRESH =================
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // ================= SAFE VALUES =================
  const apsScore = Number(profileData?.apsScore || 0);

  const subjects = Array.isArray(profileData?.subjects)
    ? profileData.subjects
    : [];

  // ================= REGISTER =================
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  };

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setProfileData(null);
  };

  // ================= SAVE PROFILE =================
  const saveProfile = async (data) => {
    if (!auth.currentUser) return;

    try {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        data,
        { merge: true }
      );
    } catch (error) {
      console.log("Save profile error:", error);
    }
  };

  // ================= REALTIME AUTH + PROFILE =================
  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);

          const ref = doc(
            db,
            "users",
            firebaseUser.uid
          );

          //REALTIME PROFILE LISTENER
          unsubscribeProfile = onSnapshot(
            ref,
            async (snap) => {
              if (snap.exists()) {
                const data = snap.data();

                setProfileData({
                  ...data,

                  // ensure safe defaults
                  apsScore: Number(
                    data?.apsScore || 0
                  ),

                  subjects: Array.isArray(
                    data?.subjects
                  )
                    ? data.subjects
                    : [],
                });
              } else {
                // create default profile
                const starterProfile = {
                  email: firebaseUser.email,
                  firstName: "",
                  lastName: "",
                  phone: "",
                  apsScore: 0,
                  subjects: [],
                };

                await setDoc(ref, starterProfile);

                setProfileData(starterProfile);
              }

              setLoading(false);
            },
            (error) => {
              console.log(
                "Realtime profile error:",
                error
              );

              setLoading(false);
            }
          );
        } else {
          setUser(null);
          setProfileData(null);
          setLoading(false);
        }
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // auth
        user,
        loading,

        // profile
        profileData,
        apsScore,
        subjects,

        // actions
        login,
        register,
        logout,
        saveProfile,

        // refresh
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);