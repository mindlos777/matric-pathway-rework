import React, { createContext, useContext, useEffect, useState } from "react";
import { universities } from "../data/Universities";
import { auth, db } from "./firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/* ===================================================
   CONTEXT
=================================================== */
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

/* ===================================================
   PROVIDER
=================================================== */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({});

  const [apsScore, setApsScoreState] = useState(null);

  const [subjects, setSubjectsState] = useState([]);

  const [qualifiedUniversities, setQualifiedUniversities] = useState([]);

  /* ===============================================
     LOGIN
  =============================================== */
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  /* ===============================================
     SIGNUP
  =============================================== */
  const signup = async (email, password, fullName) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: fullName,
    });

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const starterProfile = {
      uid: result.user.uid,
      fullName,
      firstName,
      lastName,
      email,

      phone: "",
      dob: "",
      gender: "",
      idNumber: "",
      citizenship: "South African",

      addressLine1: "",
      city: "",
      province: "",
      postalCode: "",

      schoolName: "",
      matricYear: "",

      disability: "No",
      disabilityDetails: "",

      apsScore: null,
      subjects: [],

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(
      doc(db, "users", result.user.uid),
      starterProfile
    );
  };

  /* ===============================================
     LOGOUT
  =============================================== */
  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setProfileData({});
    setApsScoreState(null);
    setSubjectsState([]);
    setQualifiedUniversities([]);
  };

  /* ===============================================
     SAVE PROFILE
  =============================================== */
  const saveProfile = async (profile) => {
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        ...profile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setProfileData((prev) => ({
      ...prev,
      ...profile,
    }));

    if (profile.apsScore !== undefined) {
      setApsScoreState(profile.apsScore);
    }

    if (profile.subjects !== undefined) {
      setSubjectsState(profile.subjects);
    }
  };

  /* ===============================================
     SAVE APS ONLY
  =============================================== */
  const saveAPS = async (score, subs = subjects) => {
    if (!user) return;

    await saveProfile({
      apsScore: score,
      subjects: subs,
    });
  };

  /* ===============================================
     SAVE SUBJECTS ONLY
  =============================================== */
  const saveSubjects = async (subs) => {
    if (!user) return;

    setSubjectsState(subs);

    await saveProfile({
      subjects: subs,
      apsScore: apsScore,
    });
  };

  /* ===============================================
     AUTH STATE LISTENER
  =============================================== */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);

          const ref = doc(db, "users", currentUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();

            setProfileData(data);
            setApsScoreState(data.apsScore || null);
            setSubjectsState(data.subjects || []);
          } else {
            setProfileData({
              email: currentUser.email,
              fullName:
                currentUser.displayName || "",
            });
          }
        } else {
          setUser(null);
          setProfileData({});
          setApsScoreState(null);
          setSubjectsState([]);
        }
      } catch (error) {
        console.log(
          "Firestore unavailable temporarily."
        );
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  /* ===============================================
     AUTO QUALIFIED UNIVERSITIES
  =============================================== */
  useEffect(() => {
    if (apsScore !== null) {
      const eligible = universities.filter(
        (uni) => apsScore >= uni.minAPS
      );

      setQualifiedUniversities(eligible);
    } else {
      setQualifiedUniversities([]);
    }
  }, [apsScore]);

  /* ===============================================
     CONTEXT VALUE
  =============================================== */
  const value = {
    user,
    loading,

    login,
    signup,
    logout,

    profileData,
    saveProfile,

    apsScore,
    setApsScore: saveAPS,

    subjects,
    setSubjects: saveSubjects,

    qualifiedUniversities,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};