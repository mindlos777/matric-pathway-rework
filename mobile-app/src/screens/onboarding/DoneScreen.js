import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../../../backend/auth/AuthContext";

export default function DoneScreen({ route }) {
  const {
    saveProfile,
    completeOnboarding,
  } = useAuth();

  const [saving, setSaving] =
    useState(false);

  const finishSetup = async () => {
    try {
      setSaving(true);

      await saveProfile({
        firstName:
          route.params?.name || "",

        lastName: "",

        province:
          route.params?.province || "",

        hobbies:
          route.params?.hobbies || [],

        phone: "",
        matricYear: "",

        subjects: [],
        apsScore: 0,
      });

      await completeOnboarding();

      // App.js automatically switches
      // to Tabs when onboardingComplete=true

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to complete setup."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/done.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        You're Almost Set
      </Text>

      <Text style={styles.subtitle}>
        Go fill your profile and start
        exploring institutions,
        bursaries and more.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          saving && {
            opacity: 0.7,
          },
        ]}
        onPress={finishSetup}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Go To Dashboard
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 270,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  subtitle: {
    marginTop: 12,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 24,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 28,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});