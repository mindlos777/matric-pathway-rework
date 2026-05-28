import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useAuth } from "../auth/AuthContext";

export default function ProfileScreen() {
  const { user, profileData, saveProfile, loading, logout } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    matricYear: "",
    subjects: [],
  });

  const [aps, setAps] = useState(0);

  // ---------------- APS ----------------
  const convert = (mark) => {
    const m = Number(mark);
    if (isNaN(m)) return 0;
    if (m >= 80) return 7;
    if (m >= 70) return 6;
    if (m >= 60) return 5;
    if (m >= 50) return 4;
    if (m >= 40) return 3;
    if (m >= 30) return 2;
    if (m > 0) return 1;
    return 0;
  };

  const calcAPS = (subjects = []) =>
    subjects.reduce((sum, s) => sum + convert(s?.mark), 0);

  // ---------------- LOAD FROM CONTEXT ----------------
  useEffect(() => {
    if (profileData) {
      const subjects = Array.isArray(profileData.subjects)
        ? profileData.subjects
        : [];

      const loaded = {
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: user?.email || "",
        phone: profileData.phone || "",
        matricYear: profileData.matricYear || "",
        subjects,
      };

      setProfile(loaded);
      setAps(calcAPS(subjects));
    }
  }, [profileData]);

  // ---------------- UPDATE FIELD ----------------
  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // ---------------- SUBJECT ----------------
  const updateSubject = (index, field, value) => {
    const copy = [...profile.subjects];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setProfile((prev) => ({ ...prev, subjects: copy }));
    setAps(calcAPS(copy));
  };

  const addSubject = () => {
    if (profile.subjects.length >= 10) {
      Alert.alert("Limit reached", "Max 10 subjects");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", mark: "" }],
    }));
  };

  const removeSubject = (index) => {
    const updated = profile.subjects.filter((_, i) => i !== index);
    setProfile((prev) => ({ ...prev, subjects: updated }));
    setAps(calcAPS(updated));
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    try {
      setSaving(true);

      const cleanSubjects = profile.subjects.map((s) => ({
        name: s.name.trim(),
        mark: Number(s.mark),
      }));

      const finalAPS = calcAPS(cleanSubjects);

      await saveProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        matricYear: profile.matricYear,
        subjects: cleanSubjects,
        apsScore: finalAPS,
        updatedAt: new Date(),
      });

      setEditMode(false);
      Alert.alert("Success", "Profile saved");
    } catch (e) {
      Alert.alert("Error", "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (e) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  // ---------------- UI ----------------
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* EMAIL */}
        <Text style={styles.email}>{profile.email}</Text>

        {/* BASIC INFO */}
        <TextInput
          style={styles.input}
          editable={editMode}
          value={profile.firstName}
          placeholder="First Name"
          placeholderTextColor="#9CA3AF"
          onChangeText={(v) => updateField("firstName", v)}
        />

        <TextInput
          style={styles.input}
          editable={editMode}
          value={profile.lastName}
          placeholder="Last Name"
          placeholderTextColor="#9CA3AF"
          onChangeText={(v) => updateField("lastName", v)}
        />

        <TextInput
          style={styles.input}
          editable={editMode}
          value={profile.phone}
          placeholder="Phone"
          placeholderTextColor="#9CA3AF"
          onChangeText={(v) => updateField("phone", v)}
        />

        <TextInput
          style={styles.input}
          editable={editMode}
          value={profile.matricYear}
          placeholder="Matric Year"
          placeholderTextColor="#9CA3AF"
          onChangeText={(v) => updateField("matricYear", v)}
        />

        {/* APS */}
        <View style={styles.apsBox}>
          <Text style={{ color: "white" }}>APS SCORE</Text>
          <Text style={styles.aps}>{aps}</Text>
        </View>

        {/* SUBJECTS */}
        {profile.subjects.map((s, i) => (
          <View key={i} style={styles.row}>
            <TextInput
              style={styles.subject}
              editable={editMode}
              value={s.name}
              placeholder="Subject"
              placeholderTextColor="#9CA3AF"
              onChangeText={(v) => updateSubject(i, "name", v)}
            />

            <TextInput
              style={styles.mark}
              editable={editMode}
              keyboardType="numeric"
              value={String(s.mark)}
              placeholder="%"
              placeholderTextColor="#9CA3AF"
              onChangeText={(v) => updateSubject(i, "mark", v)}
            />

            {editMode && (
              <TouchableOpacity onPress={() => removeSubject(i)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* ADD SUBJECT */}
        {editMode && (
          <TouchableOpacity onPress={addSubject}>
            <Text style={styles.add}>+ Add Subject</Text>
          </TouchableOpacity>
        )}

        {/* BUTTONS */}
        {!editMode ? (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.btnText}>
              {saving ? "Saving..." : "Save Profile"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  email: { fontSize: 16, marginBottom: 15, color: "#666" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 28,
    marginBottom: 12,
  },

  apsBox: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 28,
    marginVertical: 15,
  },

  aps: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  subject: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 28,
  },

  mark: {
    width: 70,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 28,
    textAlign: "center",
  },

  remove: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },

  add: {
    color: "#4F46E5",
    marginVertical: 10,
    fontWeight: "bold",
  },

  editBtn: {
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 28,
    marginTop: 15,
  },

  saveBtn: {
    backgroundColor: "#16A34A",
    padding: 14,
    borderRadius: 28,
    marginTop: 15,
  },

  logout: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 28,
    marginTop: 15,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});