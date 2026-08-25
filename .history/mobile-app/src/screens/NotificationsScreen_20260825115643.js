import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";

import { useAuth } from "../auth/AuthContext";

export default function NotificationsScreen({
  navigation,
}) {
  const { profileData } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD NOTIFICATIONS FROM FIRESTORE
  // =====================================================

  useEffect(() => {
    loadNotifications();
  }, [profileData]);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const items = [];

      // =================================================
      // PROFILE REMINDERS
      // =================================================

      if (!profileData?.subjects?.length) {
        items.push({
          id: "profile-subjects",
          type: "Profile",
          title: "Complete your profile",
          message:
            "Add subjects to calculate your APS score.",
          action: "Profile",
        });
      }

      if (!profileData?.phone) {
        items.push({
          id: "profile-phone",
          type: "Profile",
          title: "Add contact details",
          message:
            "Add your phone number to complete your profile.",
          action: "Profile",
        });
      }

      // =================================================
      // UNIVERSITIES FROM FIRESTORE
      // =================================================

      try {
        const universitySnapshot = await getDocs(
          collection(db, "universities_db")
        );

        universitySnapshot.forEach((doc) => {
          const uni = {
            id: doc.id,
            ...doc.data(),
          };

          if (uni.status === "Open") {
            items.push({
              id: `uni-${uni.id}`,
              type: "University",
              title: uni.name,
              message: `Applications close ${uni.closingDate}`,
              link: uni.applyLink,
            });
          }
        });

        console.log(
          "Universities loaded for notifications:",
          universitySnapshot.size
        );
      } catch (error) {
        console.log(
          "Could not load universities from Firestore:",
          error
        );
      }

      // =================================================
      // BURSARIES FROM FIRESTORE
      // =================================================

      try {
        const bursarySnapshot = await getDocs(
          collection(db, "bursaries_db")
        );

        bursarySnapshot.forEach((doc) => {
          const bursary = {
            id: doc.id,
            ...doc.data(),
          };

          if (bursary.status === "Open") {
            items.push({
              id: `bursary-${bursary.id}`,
              type: "Bursary",
              title: bursary.name,
              message: `Applications close ${bursary.closingDate}`,
              link: bursary.link,
            });
          }
        });

        console.log(
          "Bursaries loaded for notifications:",
          bursarySnapshot.size
        );
      } catch (error) {
        console.log(
          "Could not load bursaries from Firestore:",
          error
        );
      }

      setNotifications(items);
    } catch (error) {
      console.log(
        "Failed to load notifications:",
        error
      );

      // At least keep profile notifications available
      const fallbackNotifications = [];

      if (!profileData?.subjects?.length) {
        fallbackNotifications.push({
          id: "profile-subjects",
          type: "Profile",
          title: "Complete your profile",
          message:
            "Add subjects to calculate your APS score.",
          action: "Profile",
        });
      }

      if (!profileData?.phone) {
        fallbackNotifications.push({
          id: "profile-phone",
          type: "Profile",
          title: "Add contact details",
          message:
            "Add your phone number to complete your profile.",
          action: "Profile",
        });
      }

      setNotifications(fallbackNotifications);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE NOTIFICATION PRESS
  // =====================================================

  const handlePress = (item) => {
    // Profile notification
    if (item.action === "Profile") {
      navigation.navigate("Profile");
      return;
    }

    // University / Bursary notification
    if (item.link) {
      navigation.navigate("WebView", {
        url: item.link,
      });
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

        <Text style={styles.loadingText}>
          Loading notifications...
        </Text>
      </View>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              🔔
            </Text>

            <Text style={styles.emptyTitle}>
              No notifications
            </Text>

            <Text style={styles.emptyText}>
              You're all caught up.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              handlePress(item)
            }
          >
            {/* TYPE */}
            <View style={styles.topRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.type}
                </Text>
              </View>
            </View>

            {/* TITLE */}
            <Text style={styles.title}>
              {item.title}
            </Text>

            {/* MESSAGE */}
            <Text style={styles.message}>
              {item.message}
            </Text>

            {/* LINK */}
            {(item.link ||
              item.action) && (
              <Text style={styles.linkText}>
                Tap to open →
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// =======================================================
// STYLES
// =======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 28,
    padding: 16,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },

  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  message: {
    marginTop: 8,
    color: "#6B7280",
    lineHeight: 22,
  },

  linkText: {
    marginTop: 12,
    color: "#4F46E5",
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  emptyText: {
    marginTop: 6,
    color: "#9CA3AF",
    fontSize: 15,
  },
});