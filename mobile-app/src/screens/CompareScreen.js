import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../backend/firebase/firebase";

export default function CompareScreen() {
  const [universities, setUniversities] = useState([]);

  const [selectedType, setSelectedType] =
    useState(null);

  const [selectedInstitution, setSelectedInstitution] =
    useState(null);

  const [compareList, setCompareList] =
    useState([]);

  // ================= LOAD UNIVERSITIES =================

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "universities_db"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUniversities(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================= FILTER BY TYPE =================
  const filteredInstitutions = useMemo(() => {
    if (!selectedType) return [];

    const normalized = selectedType.toLowerCase();

  return universities.filter(
    (uni) =>
      uni.type?.toLowerCase().includes(
        selectedType.toLowerCase()
      ) &&
      !compareList.some(
        (selected) => selected.id === uni.id
      )
  );
  }, [selectedType, universities]);

  // ================= ADD =================

  const addInstitution = () => {
    if (!selectedInstitution) {
      Alert.alert(
        "Select Institution",
        "Choose an institution first."
      );
      return;
    }

    const exists = compareList.some(
      (uni) => uni.id === selectedInstitution.id
    );

    if (exists) {
      Alert.alert(
        "Already Added",
        "Institution already exists in comparison."
      );
      return;
    }

    if (compareList.length >= 3) {
      Alert.alert(
        "Limit Reached",
        "Maximum of 3 institutions can be compared."
      );
      return;
    }

    setCompareList((prev) => [
      ...prev,
      selectedInstitution,
    ]);

    setSelectedInstitution(null);
    setSelectedType(null);
  };

  // ================= REMOVE =================

  const removeInstitution = (id) => {
    setCompareList((prev) =>
      prev.filter((uni) => uni.id !== id)
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TYPE SELECTOR */}

      <Text style={styles.label}>
        Institution Type
      </Text>

      <View style={styles.row}>
        {["University", "Private College", "TVET College"].map(
          (type) => (
            <TouchableOpacity
              key={type}
              onPress={() => {
                setSelectedType(
                  selectedType === type ? null : type
                );

                setSelectedInstitution(null);
              }}
              style={[
                styles.optionBtn,
                selectedType === type &&
                  styles.activeBtn,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedType === type &&
                    styles.activeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* INSTITUTION SELECTOR */}

      {selectedType && (
        <>
          <Text style={styles.label}>
            Select Institution
          </Text>

          <View
            style={{
              maxHeight: 250,
              marginTop: 10,
            }}
          >
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              {filteredInstitutions.map((uni) => (
                <TouchableOpacity
                  key={uni.id}
                  onPress={() => setSelectedInstitution(uni)}
                  style={[
                    styles.dropdownItem,
                    selectedInstitution?.id === uni.id &&
                      styles.activeBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedInstitution?.id === uni.id &&
                        styles.activeText,
                    ]}
                  >
                    {uni.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {/* ADD BUTTON */}

      <TouchableOpacity
        disabled={!selectedInstitution}
        style={[
          styles.addBtn,
          !selectedInstitution && {
            opacity: 0.5,
          },
        ]}
        onPress={addInstitution}
      >
        <Text style={styles.addText}>
          Add To Compare
        </Text>
      </TouchableOpacity>

      {/* SELECTED */}

      {compareList.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            Selected Institutions
          </Text>

          {compareList.map((uni) => (
            <View
              key={uni.id}
              style={styles.selectedCard}
            >
              <Text style={styles.selectedName}>
                {uni.name}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  removeInstitution(uni.id)
                }
              >
                <Text
                  style={{
                    color: "red",
                    fontWeight: "700",
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      {/* COMPARISON */}

      {compareList.length >= 2 && (
        <>
          <Text style={styles.sectionTitle}>
            Comparison Results
          </Text>

          <ScrollView horizontal style={{paddingBottom:70}}>
            <View>
              {/* NAME */}

              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>
                  Name
                </Text>

                {compareList.map((uni) => (
                  <Text
                    key={uni.id}
                    style={styles.compareCell}
                  >
                    {uni.name || "-"}
                  </Text>
                ))}
              </View>

              {/* APS */}
              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>
                  APS
                </Text>

                {compareList.map((uni) => (
                  <Text
                    key={uni.id}
                    style={styles.compareCell}
                  >
                    {uni.minAPS || "-"}
                  </Text>
                ))}
              </View>

              {/* LOCATION */}

              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>
                  Location
                </Text>

                {compareList.map((uni) => (
                  <Text
                    key={uni.id}
                    style={styles.compareCell}
                  >
                    {uni.location || "-"}
                  </Text>
                ))}
              </View>

              {/* RATING */}
              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>
                  Rating
                </Text>

                {compareList.map((uni) => (
                  <Text
                    key={uni.id}
                    style={styles.compareCell}
                  >
                    ⭐ {uni.rating?.scoreOutOf10 || "-"}
                  </Text>
                ))}
              </View>

              {/* APPLICATIONS */}

              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>
                  Applications Close
                </Text>

                {compareList.map((uni) => (
                  <Text
                    key={uni.id}
                    style={styles.compareCell}
                  >
                    {uni.closesAt || "-"}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {compareList.length === 1 && (
        <Text style={styles.minimumText}>
          Add at least 2 institutions to compare.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  optionBtn: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },

  activeBtn: {
    backgroundColor: "#4F46E5",
  },

  optionText: {
    color: "#111827",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

  dropdownContainer: {
    marginTop: 10,
  },

  dropdownItem: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
  },

  addBtn: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 25,
    marginBottom: 15,
  },

  selectedCard: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectedName: {
    fontWeight: "700",
    flex: 1,
  },

  compareRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  compareLabel: {
    width: 140,
    fontWeight: "800",
    backgroundColor: "#F3F4F6",
    padding: 10,
  },

  compareCell: {
    width: 140,
    padding: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  minimumText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },
});