import React, { useState, useMemo } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
} from "react-native";

import { universities } from "../data/universityData";
import { useAuth } from "../auth/AuthContext";

export default function UniversitiesScreen() {
  const { apsScore } = useAuth();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    type: null,
    status: null,
    topRated: false,
    basedOnAPS: false,
  });

  // ---------------- FILTER LOGIC ----------------
  const filtered = useMemo(() => {
    return universities.filter((uni) => {
      const matchSearch =
        uni.name.toLowerCase().includes(search.toLowerCase());

      const matchType =
        !filters.type || uni.type === filters.type;

      const matchStatus =
        !filters.status || uni.status === filters.status;

      const matchAPS =
        !filters.basedOnAPS || (apsScore && uni.minAPS <= apsScore);

      return matchSearch && matchType && matchStatus && matchAPS;
    });
  }, [search, filters, apsScore]);

  // ---------------- SORTING ----------------
  const sorted = useMemo(() => {
    let list = [...filtered];

    if (filters.topRated) {
      // placeholder rating logic (you can replace later)
      list.sort((a, b) => (b.minAPS || 0) - (a.minAPS || 0));
    }

    return list;
  }, [filtered, filters.topRated]);

  // ---------------- TOGGLE FILTER ----------------
  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>

      {/* SEARCH BAR (ALWAYS VISIBLE) */}
      <TextInput
        placeholder="Search universities..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* FILTER BUTTON */}
      <TouchableOpacity
        onPress={() => setShowFilters(true)}
        style={{
          backgroundColor: "#4F46E5",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Filters
        </Text>
      </TouchableOpacity>

      {/* UNIVERSITIES LIST */}
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>

            <Text>{item.type}</Text>
            <Text>Min APS: {item.minAPS}</Text>
            <Text>Status: {item.status}</Text>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: "#4F46E5",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ---------------- FILTER MODAL (BOTTOM SHEET STYLE) ---------------- */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}>

          <View style={{
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "70%",
          }}>

            {/* HEADER */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Filters
              </Text>

              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* TYPE DROPDOWN (SIMPLIFIED) */}
            <Text style={{ fontWeight: "bold" }}>Type</Text>

            {["University", "Private", "TVET"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => toggle("type", t)}
                style={{
                  padding: 10,
                  backgroundColor:
                    filters.type === t ? "#4F46E5" : "#eee",
                  marginTop: 5,
                  borderRadius: 8,
                }}
              >
                <Text style={{
                  color: filters.type === t ? "#fff" : "#000",
                }}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}

            {/* STATUS */}
            <Text style={{ fontWeight: "bold", marginTop: 15 }}>
              Status
            </Text>

            {["Open", "Closed"].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => toggle("status", s)}
                style={{
                  padding: 10,
                  backgroundColor:
                    filters.status === s ? "#4F46E5" : "#eee",
                  marginTop: 5,
                  borderRadius: 8,
                }}
              >
                <Text style={{
                  color: filters.status === s ? "#fff" : "#000",
                }}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}

            {/* TOGGLES */}
            <View style={{ marginTop: 20 }}>

              <TouchableOpacity
                onPress={() =>
                  setFilters((p) => ({
                    ...p,
                    topRated: !p.topRated,
                  }))
                }
                style={{
                  padding: 10,
                  backgroundColor: filters.topRated ? "#4F46E5" : "#eee",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <Text style={{
                  color: filters.topRated ? "#fff" : "#000",
                }}>
                  Top Rated
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setFilters((p) => ({
                    ...p,
                    basedOnAPS: !p.basedOnAPS,
                  }))
                }
                style={{
                  padding: 10,
                  backgroundColor: filters.basedOnAPS ? "#4F46E5" : "#eee",
                  borderRadius: 8,
                }}
              >
                <Text style={{
                  color: filters.basedOnAPS ? "#fff" : "#000",
                }}>
                  Based on My APS
                </Text>
              </TouchableOpacity>

            </View>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{
                backgroundColor: "#4F46E5",
                padding: 15,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Apply Filters
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}