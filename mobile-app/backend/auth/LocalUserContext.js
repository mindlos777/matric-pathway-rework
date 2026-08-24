import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalUserContext = createContext();

export const LocalUserProvider = ({
  children,
}) => {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [onboardingComplete,
    setOnboardingComplete] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored =
        await AsyncStorage.getItem(
          "userProfile"
        );

      if (stored) {
        setProfile(JSON.parse(stored));
        setOnboardingComplete(true);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const saveProfile = async (
    data
  ) => {
    try {
      await AsyncStorage.setItem(
        "userProfile",
        JSON.stringify(data)
      );

      setProfile(data);

      setOnboardingComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalUserContext.Provider
      value={{
        profile,
        saveProfile,
        onboardingComplete,
        loading,
      }}
    >
      {children}
    </LocalUserContext.Provider>
  );
};

export const useLocalUser = () =>
  useContext(LocalUserContext);