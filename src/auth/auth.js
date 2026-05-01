<<<<<<< HEAD
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
=======
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
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
