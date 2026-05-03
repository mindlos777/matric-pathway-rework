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
} from "react-native";

import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    matricYear: "",
    subjects: [],
  });

  const [aps, setAps] = useState(0);

  // APS CALCULATOR
  const convert = (mark) => {
    mark = Number(mark);
    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;
    if (mark > 0) return 1;
    return 0;
  };

  const calcAPS = (subjects) =>
    subjects.reduce((sum, s) => sum + convert(s.mark), 0);

  // LOAD PROFILE
  useEffect(() => {
  if (!user?.uid) return;

  const loadProfile = async () => {
    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setProfile({
          name: data.firstName || data.name || "",
          surname: data.lastName || data.surname || "",
          phone: data.phone || "",
          yearMatriculated: data.matricYear || "",
          subjects: data.subjects || [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

    loadProfile();
  }, [user]);

  // UPDATE FIELD
  const updateField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // SUBJECT UPDATE
  const updateSubject = (index, field, value) => {
    const copy = [...profile.subjects];
    copy[index][field] = value;

    setProfile({ ...profile, subjects: copy });
    setAps(calcAPS(copy));
  };

  // ADD SUBJECT
  const addSubject = () => {
    if (profile.subjects.length >= 7) {
      Alert.alert("Maximum 7 subjects");
      return;
    }

    setProfile({
      ...profile,
      subjects: [...profile.subjects, { name: "", mark: "" }],
    });
  };

  // SAVE PROFILE
  const saveProfile = async () => {
    try {
      setSaving(true);

      const ref = doc(db, "users", user.uid);

      const finalAPS = calcAPS(profile.subjects);

      await setDoc(
        ref,
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          matricYear: profile.matricYear,
          subjects: profile.subjects,
          apsScore: finalAPS,
        },
        { merge: true }
      );

      setAps(finalAPS);
      setEditMode(false);
      setSaving(false);

      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.log(error);
      setSaving(false);
      Alert.alert("Error", "Failed to save profile");
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.email}>{profile.email}</Text>

      <TextInput
        style={styles.input}
        editable={editMode}
        value={profile.firstName}
        placeholder="First Name"
        onChangeText={(v) => updateField("firstName", v)}
      />

      <TextInput
        style={styles.input}
        editable={editMode}
        value={profile.lastName}
        placeholder="Last Name"
        onChangeText={(v) => updateField("lastName", v)}
      />

      <TextInput
        style={styles.input}
        editable={editMode}
        value={profile.phone}
        placeholder="Phone"
        onChangeText={(v) => updateField("phone", v)}
      />

      <TextInput
        style={styles.input}
        editable={editMode}
        value={profile.matricYear}
        placeholder="Matric Year"
        onChangeText={(v) => updateField("matricYear", v)}
      />

      <View style={styles.apsBox}>
        <Text style={{ color: "white" }}>APS SCORE</Text>
        <Text style={styles.aps}>{aps}</Text>
      </View>

      {profile.subjects.map((s, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={styles.subject}
            editable={editMode}
            value={s.name}
            placeholder="Subject"
            onChangeText={(v) => updateSubject(i, "name", v)}
          />

          <TextInput
            style={styles.mark}
            editable={editMode}
            keyboardType="numeric"
            value={String(s.mark)}
            placeholder="%"
            onChangeText={(v) => updateSubject(i, "mark", v)}
          />
        </View>
      ))}

      {editMode && (
        <TouchableOpacity onPress={addSubject}>
          <Text style={styles.add}>+ Add Subject</Text>
        </TouchableOpacity>
      )}

      {!editMode ? (
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditMode(true)}
        >
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.btnText}>
            {saving ? "Saving..." : "Save Profile"}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ padding:20, backgroundColor:"#fff" },
  loader:{ flex:1, justifyContent:"center", alignItems:"center" },

  email:{ fontSize:16, marginBottom:15, color:"#666" },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:12,
    borderRadius:10,
    marginBottom:12
  },

  apsBox:{
    backgroundColor:"#4F46E5",
    padding:20,
    borderRadius:14,
    marginVertical:15
  },

  aps:{
    color:"white",
    fontSize:28,
    fontWeight:"bold"
  },

  row:{
    flexDirection:"row",
    gap:10,
    marginBottom:10
  },

  subject:{
    flex:1,
    borderWidth:1,
    borderColor:"#ddd",
    padding:10,
    borderRadius:8
  },

  mark:{
    width:70,
    borderWidth:1,
    borderColor:"#ddd",
    padding:10,
    borderRadius:8,
    textAlign:"center"
  },

  add:{
    color:"#4F46E5",
    marginVertical:10,
    fontWeight:"bold"
  },

  editBtn:{
    backgroundColor:"#4F46E5",
    padding:14,
    borderRadius:10,
    marginTop:15
  },

  saveBtn:{
    backgroundColor:"#16A34A",
    padding:14,
    borderRadius:10,
    marginTop:15
  },

  logout:{
    backgroundColor:"#111",
    padding:14,
    borderRadius:10,
    marginTop:15
  },

  btnText:{
    color:"white",
    textAlign:"center",
    fontWeight:"bold"
  }
});