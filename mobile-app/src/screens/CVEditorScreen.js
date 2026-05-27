import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import {
  Ionicons,
} from "@expo/vector-icons";

import { useAuth } from "../auth/AuthContext";

export default function CVEditorScreen({
  route,
}) {
  const { template } = route.params;

  const { profileData } = useAuth();

  const [activeTab, setActiveTab] =
    useState("edit");

  const [cv, setCV] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    skills: "",
    achievements: "",
    references: "",
  });

  // ================= AUTO FILL =================
  useEffect(() => {
    setCV({
      fullName: `${
        profileData?.firstName || ""
      } ${profileData?.lastName || ""}`,

      email: profileData?.email || "",

      phone: profileData?.phone || "",

      summary:
        "Motivated student passionate about academic excellence and career growth.",

      education: `Subjects: ${
        profileData?.subjects
          ?.map((s) => s.name)
          .join(", ") || ""
      }`,

      skills:
        "Communication\nTeamwork\nLeadership",

      achievements:
        "Academic Excellence",

      references:
        "Available on request",
    });
  }, [profileData]);

  // ================= UPDATE FIELD =================
  const updateField = (key, value) => {
    setCV((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= EXPORT PDF =================
  const exportPDF = async () => {
    try {

      const safeSkills = cv.skills
        ?.split("\n")
        .filter(Boolean)
        .map((skill) => `<li>${skill}</li>`)
        .join("") || "";

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
          </head>

          <body style="
            font-family: Arial;
            padding: 30px;
            color: #111827;
          ">

            <h1 style="margin-bottom: 5px;">
              ${cv.fullName || ""}
            </h1>

            <p style="color: #4B5563;">
              ${cv.phone || ""} | ${cv.email || ""}
            </p>

            <hr style="margin: 20px 0;" />

            <h2>Professional Summary</h2>
            <p>
              ${cv.summary || ""}
            </p>

            <h2>Education</h2>
            <p>
              ${cv.education || ""}
            </p>

            <h2>Skills</h2>
            <ul>
              ${safeSkills}
            </ul>

            <h2>Achievements</h2>
            <p>
              ${cv.achievements || ""}
            </p>

            <h2>References</h2>
            <p>
              ${cv.references || ""}
            </p>

          </body>
        </html>
      `;

      const { uri } =
        await Print.printToFileAsync({
          html,
        });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Error",
          "Sharing is not available on this device"
        );
        return;
      }

      await Sharing.shareAsync(uri);

    } catch (error) {
      console.log("PDF ERROR:", error);

      Alert.alert(
        "Export Error",
        error?.message ||
          "Failed to export PDF"
      );
    }
  };

  // ================= AI IMPROVE =================
  const improveSummary = () => {
    setCV((prev) => ({
      ...prev,

      summary:
        "Highly motivated and goal-oriented student with strong communication, teamwork, and leadership skills. Passionate about continuous learning and committed to academic and professional excellence.",
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TEMPLATE HEADER */}
      <View style={styles.templateHeader}>
        <Image
          source={{
            uri:
              template?.image ||
              "https://via.placeholder.com/150",
          }}
          style={styles.templateImage}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.templateName}>
            {template?.name || "CV Template"}
          </Text>

          <Text style={styles.templateCategory}>
            ATS-Friendly Template
          </Text>
        </View>
      </View>

      {/* ================= TABS ================= */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() =>
            setActiveTab("edit")
          }
          style={[
            styles.tabBtn,
            activeTab === "edit" &&
              styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "edit" &&
                styles.activeTabText,
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setActiveTab("preview")
          }
          style={[
            styles.tabBtn,
            activeTab === "preview" &&
              styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "preview" &&
                styles.activeTabText,
            ]}
          >
            Preview
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= EDIT MODE ================= */}
      {activeTab === "edit" && (
        <>
          {/* PERSONAL INFO */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Personal Information
            </Text>

            <TextInput
              placeholder="Full Name"
              value={cv.fullName}
              onChangeText={(v) =>
                updateField("fullName", v)
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              value={cv.email}
              onChangeText={(v) =>
                updateField("email", v)
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Phone Number"
              value={cv.phone}
              onChangeText={(v) =>
                updateField("phone", v)
              }
              style={styles.input}
            />
          </View>

          {/* SUMMARY */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text
                style={styles.sectionTitle}
              >
                Professional Summary
              </Text>

              <TouchableOpacity
                onPress={improveSummary}
                style={styles.aiBtn}
              >
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="#fff"
                />

                <Text style={styles.aiText}>
                  AI Improve
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              multiline
              value={cv.summary}
              onChangeText={(v) =>
                updateField("summary", v)
              }
              style={styles.bigInput}
            />
          </View>

          {/* EDUCATION */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Education
            </Text>

            <TextInput
              multiline
              value={cv.education}
              onChangeText={(v) =>
                updateField(
                  "education",
                  v
                )
              }
              style={styles.bigInput}
            />
          </View>

          {/* SKILLS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Skills
            </Text>

            <TextInput
              multiline
              value={cv.skills}
              onChangeText={(v) =>
                updateField("skills", v)
              }
              style={styles.bigInput}
            />
          </View>

          {/* ACHIEVEMENTS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Achievements
            </Text>

            <TextInput
              multiline
              value={cv.achievements}
              onChangeText={(v) =>
                updateField(
                  "achievements",
                  v
                )
              }
              style={styles.bigInput}
            />
          </View>

          {/* REFERENCES */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              References
            </Text>

            <TextInput
              multiline
              value={cv.references}
              onChangeText={(v) =>
                updateField(
                  "references",
                  v
                )
              }
              style={styles.bigInput}
            />
          </View>

          {/* EXPORT */}
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={exportPDF}
          >
            <Ionicons
              name="download-outline"
              size={20}
              color="#fff"
            />

            <Text style={styles.exportText}>
              Export PDF
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* ================= PREVIEW MODE ================= */}
      {activeTab === "preview" && (
        <View style={styles.previewCard}>

          <Text style={styles.previewName}>
            {cv.fullName}
          </Text>

          <Text
            style={styles.previewContact}
          >
            {cv.phone} | {cv.email}
          </Text>

          <View style={styles.line} />

          {/* SUMMARY */}
          <Text style={styles.previewTitle}>
            Professional Summary
          </Text>

          <Text style={styles.previewText}>
            {cv.summary}
          </Text>

          {/* EDUCATION */}
          <Text style={styles.previewTitle}>
            Education
          </Text>

          <Text style={styles.previewText}>
            {cv.education}
          </Text>

          {/* SKILLS */}
          <Text style={styles.previewTitle}>
            Skills
          </Text>

          <Text style={styles.previewText}>
            {cv.skills}
          </Text>

          {/* ACHIEVEMENTS */}
          <Text style={styles.previewTitle}>
            Achievements
          </Text>

          <Text style={styles.previewText}>
            {cv.achievements}
          </Text>

          {/* REFERENCES */}
          <Text style={styles.previewTitle}>
            References
          </Text>

          <Text style={styles.previewText}>
            {cv.references}
          </Text>

          {/* EXPORT */}
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={exportPDF}
          >
            <Ionicons
              name="download-outline"
              size={20}
              color="#fff"
            />

            <Text style={styles.exportText}>
              Export PDF
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },

  templateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
  },

  templateImage: {
    width: 70,
    height: 90,
    borderRadius: 10,
    marginRight: 14,
  },

  templateName: {
    fontSize: 18,
    fontWeight: "700",
  },

  templateCategory: {
    color: "#6B7280",
    marginTop: 4,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tabBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#4F46E5",
  },

  tabText: {
    fontWeight: "600",
    color: "#111827",
  },

  activeTabText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  bigInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  aiBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16A34A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },

  aiText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  exportBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  exportText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },

  previewCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    marginBottom: 30,
  },

  previewName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },

  previewContact: {
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 18,
  },

  line: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },

  previewTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 18,
    color: "#111827",
  },

  previewText: {
    color: "#374151",
    lineHeight: 24,
  },
});