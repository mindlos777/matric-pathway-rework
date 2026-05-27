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
} from "react-native";

import * as Clipboard from "expo-clipboard";

import {
  Ionicons,
} from "@expo/vector-icons";

import { useAuth } from "../auth/AuthContext";

export default function EmailEditorScreen({
  route,
}) {
  const { template } = route.params;

  const { profileData } = useAuth();

  const [email, setEmail] = useState({
    subject: "",
    body: "",
  });

  // ================= AUTO FILL =================
  useEffect(() => {
    const fullName = `${
      profileData?.firstName || ""
    } ${profileData?.lastName || ""}`;

    const emailAddress =
      profileData?.email || "";

    const phone =
      profileData?.phone || "";

    setEmail({
      subject: template.subject,

      body: template.body
        .replaceAll(
          "{name}",
          fullName
        )
        .replaceAll(
          "{email}",
          emailAddress
        )
        .replaceAll(
          "{phone}",
          phone
        ),
    });
  }, [profileData]);

  // ================= COPY =================
  const copyEmail = async () => {
    await Clipboard.setStringAsync(
      `Subject: ${email.subject}\n\n${email.body}`
    );

    Alert.alert(
      "Copied",
      "Email copied to clipboard"
    );
  };

  // ================= AI IMPROVE =================
  const improveEmail = () => {
    setEmail((prev) => ({
      ...prev,

      body:
        prev.body +
        "\n\nI am highly motivated, eager to learn, and committed to excellence. I would greatly appreciate the opportunity to be considered.",
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.templateName}>
          {template.name}
        </Text>

        <Text style={styles.templateCategory}>
          {template.category} Email
        </Text>
      </View>

      {/* SUBJECT */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Subject
        </Text>

        <TextInput
          value={email.subject}
          onChangeText={(v) =>
            setEmail((p) => ({
              ...p,
              subject: v,
            }))
          }
          style={styles.input}
        />
      </View>

      {/* BODY */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>
            Email Body
          </Text>

          <TouchableOpacity
            onPress={improveEmail}
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
          value={email.body}
          onChangeText={(v) =>
            setEmail((p) => ({
              ...p,
              body: v,
            }))
          }
          style={styles.bigInput}
          textAlignVertical="top"
        />
      </View>

      {/* PREVIEW */}
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>
          Preview
        </Text>

        <Text style={styles.previewSubject}>
          Subject: {email.subject}
        </Text>

        <Text style={styles.previewBody}>
          {email.body}
        </Text>
      </View>

      {/* COPY BUTTON */}
      <TouchableOpacity
        style={styles.copyBtn}
        onPress={copyEmail}
      >
        <Ionicons
          name="copy-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.copyText}>
          Copy Email
        </Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },

  header: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },

  templateName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  templateCategory: {
    marginTop: 6,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fff",
  },

  bigInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    minHeight: 260,
    backgroundColor: "#fff",
    lineHeight: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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

  previewCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  previewTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },

  previewSubject: {
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },

  previewBody: {
    color: "#374151",
    lineHeight: 25,
  },

  copyBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  copyText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});