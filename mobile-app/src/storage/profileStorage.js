import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLocalProfile = async (
  profile
) => {
  await AsyncStorage.setItem(
    "userProfile",
    JSON.stringify(profile)
  );
};

export const getLocalProfile = async () => {
  const data =
    await AsyncStorage.getItem(
      "userProfile"
    );

  return data ? JSON.parse(data) : null;
};