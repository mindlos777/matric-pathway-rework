import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../../backend/auth/AuthContext";
import { universities } from "../../backend/data/universityData";
import { bursaryData } from "../../backend/data/bursaryData";

export default function NotificationsScreen({
  navigation,
}) {
  const { profileData } = useAuth();

  const notifications = useMemo(() => {
    const items = [];

    // ---------------- PROFILE REMINDERS ----------------

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

    // ---------------- UNIVERSITY DEADLINES ----------------

    const institution = universities?.find(
      (u) => u.id === uni.universityId
    );
    const bursary = bur?.find(
      (u) => u.id === uni.universityId
    );

    institution.forEach((uni) => {
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

    // ---------------- BURSARY DEADLINES ----------------

    bursaryData.forEach((bursary) => {
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

    return items;
  }, [profileData]);

  const handlePress = (item) => {
    if (item.action === "Profile") {
      navigation.navigate("Profile");
      return;
    }

    if (item.link) {
      navigation.navigate("WebView", {
        url: item.link,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No notifications available.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
          >
            <View style={styles.topRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.type}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.message}>
              {item.message}
            </Text>

            <Text style={styles.linkText}>
              Tap to open
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
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
    paddingLeft:-1,
    color: "#4F46E5",
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});