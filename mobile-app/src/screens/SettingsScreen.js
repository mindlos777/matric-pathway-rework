import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";

import { useAuth } from "../../backend/auth/AuthContext";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";

export default function SettingsScreen() {
  const { user, profileData, logout } = useAuth();

  const [prefs, setPrefs] = useState({
    notifications: true,
    bursaryAlerts: true,
    deadlineReminders: true,
    courseRecommendations: true,
    preferredField: "Technology",
    preferredInstitutionType: "University",
    smartAPSMatching: true,
  });

  // ---------------- LOAD PREFS ----------------
  useEffect(() => {
    if (profileData?.preferences) {
      setPrefs(profileData.preferences);
    }
  }, [profileData]);

  // ---------------- TOGGLE ----------------
  const toggle = async (key) => {
    const updated = {
      ...prefs,
      [key]: !prefs[key],
    };

    setPrefs(updated);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        preferences: updated,
      });
    } catch (e) {
      console.log("Preference update error:", e);
    }
  };

  // ---------------- SELECT ----------------
  const selectOption = async (key, value) => {
    const updated = {
      ...prefs,
      [key]: value,
    };

    setPrefs(updated);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        preferences: updated,
      });
    } catch (e) {
      console.log("Preference update error:", e);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* ---------------- NOTIFICATIONS ---------------- */}
      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.card}>

        <View style={styles.row}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            value={prefs.notifications}
            onValueChange={() => toggle("notifications")}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Bursary Alerts</Text>
          <Switch
            value={prefs.bursaryAlerts}
            onValueChange={() => toggle("bursaryAlerts")}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Deadline Reminders</Text>
          <Switch
            value={prefs.deadlineReminders}
            onValueChange={() => toggle("deadlineReminders")}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Course Recommendations</Text>
          <Switch
            value={prefs.courseRecommendations}
            onValueChange={() => toggle("courseRecommendations")}
          />
        </View>

      </View>

      {/* ---------------- APS ---------------- */}
      <Text style={styles.sectionTitle}>APS Matching</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Smart APS Matching</Text>
          <Switch
            value={prefs.smartAPSMatching}
            onValueChange={() => toggle("smartAPSMatching")}
          />
        </View>
      </View>

      {/* ---------------- FIELD ---------------- */}
      <Text style={styles.sectionTitle}>Preferred Field</Text>

      <View style={styles.optionsWrap}>
        {[
          "Technology",
          "Business",
          "Health",
          "Law",
          "Education",
        ].map((field) => (
          <TouchableOpacity
            key={field}
            onPress={() =>
              selectOption("preferredField", field)
            }
            style={[
              styles.option,
              prefs.preferredField === field &&
                styles.optionActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                prefs.preferredField === field &&
                  styles.optionTextActive,
              ]}
            >
              {field}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------------- INSTITUTION ---------------- */}
      <Text style={styles.sectionTitle}>
        Preferred Institution
      </Text>

      <View style={styles.optionsWrap}>
        {[
          "University",
          "Private",
          "TVET",
        ].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() =>
              selectOption(
                "preferredInstitutionType",
                type
              )
            }
            style={[
              styles.option,
              prefs.preferredInstitutionType === type &&
                styles.optionActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                prefs.preferredInstitutionType === type &&
                  styles.optionTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------------- LOGOUT ---------------- */}
      <TouchableOpacity
        style={styles.logout}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
    color: "#555",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 15,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  label: {
    fontSize: 15,
  },

  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  option: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 28,
  },

  optionActive: {
    backgroundColor: "#4F46E5",
  },

  optionText: {
    color: "#000",
    fontWeight: "600",
  },

  optionTextActive: {
    color: "#fff",
  },

  logout: {
    marginTop: 20,
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 28,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});