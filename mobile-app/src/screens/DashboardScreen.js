import React, { useMemo, useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../../backend/auth/AuthContext";
import { universities } from "../../backend/data/universityData";

import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation }) {
  const {
    user,
    profileData,
    loading,
  } = useAuth();

  const [unreadCount, setUnreadCount] = useState(3);

  //HEADER ICONS (NOTIFICATIONS + SETTINGS)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>

          {/* NOTIFICATIONS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ marginRight: 15 }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          {/* SETTINGS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={{ marginRight: 5 }}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

        </View>
      ),
    });
  }, [navigation]);

  // ---------------- SAFE VALUES ----------------
  const apsScore =
    Number(profileData?.apsScore || 0);

  const subjects =
    Array.isArray(profileData?.subjects)
      ? profileData.subjects
      : [];

  // ---------------- NAME ----------------
  const displayName =
    profileData?.firstName ||
    user?.email?.split("@")[0] ||
    "Student";

  // ---------------- PROFILE PROGRESS ----------------
  const profileProgress = useMemo(() => {
    let score = 0;

    if (profileData?.firstName)
      score += 20;

    if (profileData?.province)
      score += 20;

    if (apsScore > 0)
      score += 30;

    if (subjects.length > 0)
      score += 30;

    return score;
  }, [profileData, apsScore, subjects]);

  // ---------------- QUALIFIED UNIVERSITIES ----------------
  const qualified = useMemo(() => {
    if (!apsScore) return [];

    return universities.filter(
      (u) => apsScore >= u.minAPS
    );
  }, [apsScore]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          Welcome, {displayName}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {profileData?.province
          ? `Province: ${profileData.province}`
          : "Let's build your future today"}
      </Text>

      {/* APS CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your APS Score</Text>

        <Text style={styles.aps}>
          {apsScore ?? "Not calculated yet"}
        </Text>

        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.whiteButtonText}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* PROFILE PROGRESS */}
      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>
          Profile Completion
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${profileProgress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {profileProgress}% complete
        </Text>
      </View>

      {/* QUALIFIED UNIVERSITIES */}
      <Text style={styles.sectionTitle}>
        Qualified Institutions
      </Text>

      {qualified.length > 0 ? (
        qualified.slice(0, 3).map((u) => (
          <TouchableOpacity
            key={u.id}
            style={styles.uniCard}
            onPress={() =>
              navigation.navigate(
                "WebViewScreen",
                {
                  url: u.applyLink,
                }
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.uniRow}>
              <View>
                <Text style={styles.uniName}>{u.name}</Text>
                <Text style={styles.uniMeta}>
                  Min APS: {u.minAPS}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>
          Add your APS in profile to see matches
        </Text>
      )}

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Courses")}
      >
        <Text style={styles.actionText}>
          Browse Courses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Universities")}
      >
        <Text style={styles.actionText}>
          Explore Universities
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Bursaries")}
      >
        <Text style={styles.actionText}>
          Find Bursaries
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 28,
    marginBottom: 15,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
  },

  aps: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 10,
  },

  whiteButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 28,
  },

  whiteButtonText: {
    textAlign: "center",
    color: "#4F46E5",
    fontWeight: "bold",
  },

  progressCard: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 28,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    backgroundColor: "#4F46E5",
  },

  progressText: {
    marginTop: 5,
    color: "#666",
  },

  uniCard: {
    padding: 12,
    borderWidth: 3,
    borderColor: "#eee",
    borderRadius: 28,
    marginBottom: 10,
  },

  uniName: {
    fontWeight: "bold",
  },

  uniMeta: {
    color: "#666",
  },

  emptyText: {
    color: "#999",
    fontStyle: "italic",
  },

  uniRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionCard: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 28,
    marginBottom: 10,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
});