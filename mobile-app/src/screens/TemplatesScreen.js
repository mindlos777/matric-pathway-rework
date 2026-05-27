import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function TemplatesScreen({
  navigation,
}) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.title}>
        Application Templates
      </Text>

      <Text style={styles.subtitle}>
        Professional templates for bursary,
        university, internship and job
        applications.
      </Text>

      {/* ================= CV TEMPLATES ================= */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("CVTemplates")
        }
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="document-text-outline"
            size={28}
            color="#4F46E5"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            CV Templates
          </Text>

          <Text style={styles.cardDesc}>
            Professional ATS-friendly CV
            templates for students and
            graduates.
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                ATS Friendly
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Editable
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* ================= EMAIL TEMPLATES ================= */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(
            "EmailTemplates"
          )
        }
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: "#ECFDF5",
            },
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={28}
            color="#059669"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            Email Templates
          </Text>

          <Text style={styles.cardDesc}>
            Ready-to-use bursary and
            internship email templates.
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                AI Personalise
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                One Click Copy
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* ================= FUTURE SECTION ================= */}
      <Text style={styles.sectionTitle}>
        Coming Soon
      </Text>

      {/* COVER LETTERS */}
      <View style={styles.futureCard}>
        <Ionicons
          name="reader-outline"
          size={24}
          color="#6B7280"
        />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.futureTitle}>
            Cover Letter Templates
          </Text>

          <Text style={styles.futureDesc}>
            Professional cover letters with
            AI enhancement.
          </Text>
        </View>
      </View>

      {/* PORTFOLIOS */}
      <View style={styles.futureCard}>
        <Ionicons
          name="briefcase-outline"
          size={24}
          color="#6B7280"
        />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.futureTitle}>
            Portfolio Templates
          </Text>

          <Text style={styles.futureDesc}>
            Build beautiful student
            portfolios and resumes.
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginTop: 50,
  },

  subtitle: {
    marginTop: 10,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 30,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  cardDesc: {
    marginTop: 6,
    color: "#6B7280",
    lineHeight: 20,
  },

  badgesRow: {
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
  },

  badge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  futureCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  futureTitle: {
    fontWeight: "700",
    color: "#111827",
    fontSize: 15,
  },

  futureDesc: {
    color: "#6B7280",
    marginTop: 4,
  },
});