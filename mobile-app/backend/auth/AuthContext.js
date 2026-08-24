import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, db } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const AuthContext = createContext();

const LOCAL_PROFILE_KEY = "userProfile";
const ONBOARDING_KEY = "onboardingComplete";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [profileData, setProfileData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [onboardingComplete, setOnboardingComplete] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [appReady, setAppReady] =
    useState(false);

  // ====================================
  // LOCAL STORAGE HELPERS
  // ====================================

  const loadLocalProfile = async () => {
    try {
      const data =
        await AsyncStorage.getItem(
          LOCAL_PROFILE_KEY
        );

      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const saveLocalProfile = async (
    profile
  ) => {
    try {
      await AsyncStorage.setItem(
        LOCAL_PROFILE_KEY,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ====================================
  // ONBOARDING
  // ====================================

  const completeOnboarding =
    async () => {
      try {
        await AsyncStorage.setItem(
          ONBOARDING_KEY,
          "true"
        );

        setOnboardingComplete(true);
      } catch (error) {
        console.log(error);
      }
    };

  // ====================================
  // LOAD APP STATE
  // ====================================
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const completed =
          await AsyncStorage.getItem(
            ONBOARDING_KEY
          );

        setOnboardingComplete(
          completed === "true"
        );

        const localProfile =
          await loadLocalProfile();

        if (localProfile) {
          setProfileData(localProfile);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAppReady(true);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // ====================================
  // FIREBASE AUTH
  // ====================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          try {
            if (firebaseUser) {
              setUser(firebaseUser);

              const docRef = doc(
                db,
                "users",
                firebaseUser.uid
              );

              const snap =
                await getDoc(docRef);

              if (snap.exists()) {
                const cloudProfile =
                  snap.data();

                setProfileData(
                  cloudProfile
                );

                await saveLocalProfile(
                  cloudProfile
                );
              }
            } else {
              setUser(null);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      );

    return unsubscribe;
  }, []);

  // ====================================
  // REGISTER
  // ====================================

  const register = async (
    email,
    password
  ) => {
    try {
      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const localProfile =
        await loadLocalProfile();

      if (localProfile) {
        await setDoc(
          doc(
            db,
            "users",
            result.user.uid
          ),
          localProfile,
          { merge: true }
        );
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ====================================
  // LOGIN
  // ====================================

  const login = async (
    email,
    password
  ) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ====================================
  // LOGOUT
  // ====================================

  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  // ====================================
  // SAVE PROFILE
  // ====================================

  const saveProfile = async (
    updates
  ) => {
    try {
      const merged = {
        ...(profileData || {}),
        ...updates,
      };

      setProfileData(merged);

      await saveLocalProfile(
        merged
      );

      if (auth.currentUser) {
        await setDoc(
          doc(
            db,
            "users",
            auth.currentUser.uid
          ),
          merged,
          { merge: true }
        );
      }
    } catch (error) {
      console.log(
        "Save profile error:",
        error
      );
    }
  };

  // ====================================
  // REFRESH
  // ====================================

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // ====================================
  // DERIVED VALUES
  // ====================================

  const apsScore = Number(
    profileData?.apsScore || 0
  );

  const subjects = Array.isArray(
    profileData?.subjects
  )
    ? profileData.subjects
    : [];

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        appReady,

        profileData,
        apsScore,
        subjects,

        onboardingComplete,

        saveProfile,
        completeOnboarding,

        register,
        login,
        logout,

        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);