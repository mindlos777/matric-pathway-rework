import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { useAuth } from "../auth/AuthContext";

export default function TemplateViewerScreen({ route }) {
  const { type } = route.params;
  const { profileData } = useAuth();

  const [editable, setEditable] = useState(false);
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });

  // ---------------- AUTO FILL ----------------
  useEffect(() => {
    const name = profileData?.firstName || "Your Name";
    const email = profileData?.email || "your@email.com";
    const phone = profileData?.phone || "Your Contact Info";

    if (type === "email") {
      setText(`Subject: Application for Bursary Opportunity

Dear Sir/Madam,

My name is ${name}, and I am interested in applying for your bursary programme.

I am a hardworking and dedicated student who is passionate about achieving academic success.

I would greatly appreciate this opportunity.

Kind regards,  
${name}  
${phone}  
${email}`);
    } else {
      setText(`${name}
${phone} | ${email}

PROFILE  
Motivated student with strong academic performance.

EDUCATION  
School Name — ${
        profileData?.matricYear || "Year"
      }  
Subjects: ${
        profileData?.subjects?.map((s) => s.name).join(", ") ||
        "Subjects"
      }

SKILLS  
- Communication  
- Teamwork  
- Problem-solving  

ACHIEVEMENTS  
- Academic awards  
- Leadership roles  

REFERENCES  
Available on request`);
    }
  }, [type, profileData]);

  // ---------------- COPY ----------------
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", "Template copied to clipboard");
  };

  // ---------------- AI PERSONALISE ----------------
  const personalize = () => {
    const name = profileData?.firstName || "Student";

    setText(`Dear Hiring Committee,

My name is ${name}, and I am writing to express my strong interest in your bursary programme.

I am a driven and goal-oriented student who is committed to academic excellence and making a meaningful impact.

Receiving this bursary would greatly assist me in achieving my educational and career aspirations.

Thank you for your time and consideration.

Warm regards,  
${name}`);
  };

  // ---------------- UPLOAD CV ----------------
  const uploadCV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];

        setUploadedFile(file);

        Alert.alert(
          "CV Uploaded",
          `${file.name} uploaded successfully`
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to upload CV");
    }
  };

  // ---------------- SAVE CV ----------------
  const saveCV = async () => {
    try {
      const fileName =
        type === "cv-template"
          ? "My_CV.txt"
          : "Document.txt";

      const fileUri =
        FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, text);

      Alert.alert(
        "Saved Successfully",
        "Your edited CV has been saved to your device."
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not save file");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* HEADER */}
          <Text style={styles.title}>
            {type === "email"
              ? "📧 Email Template"
              : "📄 CV Template"}
          </Text>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            {/* EDIT + COPY */}
            <View style={styles.leftGroup}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => setEditable(!editable)}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color="#fff"
                />

                <Text style={styles.btnText}>
                  {editable ? "Done" : "Edit"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyBtn}
                onPress={copyToClipboard}
              >
                <Ionicons
                  name="copy-outline"
                  size={16}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* AI BUTTON */}
            {type === "email" && (
              <TouchableOpacity
                style={styles.aiBtn}
                onPress={personalize}
              >
                <Ionicons
                  name="sparkles-outline"
                  size={18}
                  color="#fff"
                />

                <Text style={styles.btnText}>
                  Personalise
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* TEMPLATE EDITOR */}
          <View style={styles.card}>
            <TextInput
              ref={inputRef}
              multiline
              value={text}
              editable={editable}
              onChangeText={setText}
              style={styles.text}
              textAlignVertical="top"
              scrollEnabled={true}
              onSelectionChange={(e) => {
                setSelection(e.nativeEvent.selection);
              }}
              onContentSizeChange={() => {
                scrollRef.current?.scrollToEnd({
                  animated: true,
                });
              }}
            />
          </View>

          {/* CV ACTION BUTTONS */}
          {type !== "email" && (
            <View style={styles.cvButtons}>
              {/* UPLOAD */}
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={uploadCV}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={18}
                  color="#fff"
                />

                <Text style={styles.btnText}>
                  Upload CV
                </Text>
              </TouchableOpacity>

              {/* SAVE */}
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveCV}
              >
                <Ionicons
                  name="download-outline"
                  size={18}
                  color="#fff"
                />

                <Text style={styles.btnText}>
                  Save CV
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* FILE NAME */}
          {uploadedFile && (
            <View style={styles.fileCard}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#4F46E5"
              />

              <Text style={styles.fileName}>
                {uploadedFile.name}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9fafb",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  leftGroup: {
    flexDirection: "row",
    gap: 8,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },

  copyBtn: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },

  aiBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    minHeight: 450,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#111",
    minHeight: 400,
  },

  cvButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 10,
  },

  uploadBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    gap: 6,
  },

  saveBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#059669",
    padding: 14,
    borderRadius: 10,
    gap: 6,
  },

  fileCard: {
    marginTop: 15,
    backgroundColor: "#EEF2FF",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  fileName: {
    color: "#111",
    fontWeight: "500",
  },
});