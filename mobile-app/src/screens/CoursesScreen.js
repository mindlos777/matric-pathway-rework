import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import { courseData } from "../data/courseData";
import { useAuth } from "../auth/AuthContext";
import { matchCourses } from "../services/courseMatcher";

export default function CoursesScreen() {
  const { apsScore, subjects } = useAuth();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ---------------- SAFE MATCHING ----------------
  const matched = matchCourses({
    courses: courseData || [],
    userAPS: apsScore ?? 0,
    userSubjects: subjects || [],
    search: search || "",
    filters: filters || {},
  });

  // ---------------- OPTIONS ----------------
  const typeOptions = ["Technology", "Business", "Health", "Law", "Education"];
  const demandOptions = ["High", "Medium", "Low"];
  const durationOptions = ["1", "2", "3", "4"];

  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  // ---------------- APS TOGGLE ----------------
  const toggleAPSMode = () => {
    setFilters((prev) => ({
      ...prev,
      apsMode: prev.apsMode === "true" ? null : "true",
    }));
  };

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#fff" }}>

      {/* ================= SEARCH ================= */}
      <TextInput
        placeholder="Search courses..."
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

      {/* ================= FILTER BUTTON ================= */}
      <TouchableOpacity
        onPress={() => setShowFilters(true)}
        style={{
          backgroundColor: "#4F46E5",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          Filter Courses
        </Text>
      </TouchableOpacity>

      {/* ================= COURSES LIST ================= */}
      <FlatList
        data={matched}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No courses found
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCourse(item)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ height: 120, borderRadius: 10 }}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {item.name}
            </Text>

            <Text>{item.field}</Text>
            <Text>Duration: {item.duration} years</Text>
            <Text>Demand: {item.demand}</Text>
            <Text>Min APS: {item.minAPS}</Text>

            <Text style={{ color: "#4F46E5", marginTop: 5 }}>
              Tap to read more →
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ================= FILTER MODAL ================= */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              height: "75%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 15,
            }}
          >

            {/* HEADER */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Filters
              </Text>

              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={{ fontSize: 20 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ marginTop: 15 }}>

              {/* ================= APS MODE (RADIO STYLE) ================= */}
              <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                Smart Filter
              </Text>

              <TouchableOpacity
                onPress={toggleAPSMode}
                style={{
                  padding: 12,
                  marginTop: 10,
                  borderRadius: 8,
                  backgroundColor:
                    filters.apsMode === "true" ? "#4F46E5" : "#eee",
                }}
              >
                <Text
                  style={{
                    color: filters.apsMode === "true" ? "#fff" : "#000",
                  }}
                >
                  Based on my APS
                </Text>
              </TouchableOpacity>

              {/* ================= TYPE ================= */}
              <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                Type
              </Text>

              {typeOptions.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => toggleFilter("field", t)}
                  style={{
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 8,
                    backgroundColor:
                      filters.field === t ? "#4F46E5" : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color: filters.field === t ? "#fff" : "#000",
                    }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* ================= DEMAND ================= */}
              <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                Demand
              </Text>

              {demandOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => toggleFilter("demand", d)}
                  style={{
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 8,
                    backgroundColor:
                      filters.demand === d ? "#4F46E5" : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color: filters.demand === d ? "#fff" : "#000",
                    }}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* ================= DURATION ================= */}
              <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                Duration
              </Text>

              {durationOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => toggleFilter("duration", d)}
                  style={{
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 8,
                    backgroundColor:
                      filters.duration === d ? "#4F46E5" : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color: filters.duration === d ? "#fff" : "#000",
                    }}
                  >
                    {d} Years
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* APPLY */}
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{
                backgroundColor: "#4F46E5",
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= COURSE DETAIL MODAL ================= */}
      <Modal visible={!!selectedCourse} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>

          <TouchableOpacity onPress={() => setSelectedCourse(null)}>
            <Text style={{ fontSize: 20 }}>✕ Close</Text>
          </TouchableOpacity>

          {selectedCourse && (
            <>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
                {selectedCourse.name}
              </Text>

              <Text style={{ marginTop: 10 }}>
                Field: {selectedCourse.field}
              </Text>

              <Text>Duration: {selectedCourse.duration}</Text>
              <Text>Demand: {selectedCourse.demand}</Text>
              <Text>Min APS: {selectedCourse.minAPS}</Text>

              <Text style={{ marginTop: 15, fontWeight: "bold" }}>
                Requirements
              </Text>

              {(selectedCourse.subjects || []).map((s, i) => (
                <Text key={i}>
                  {s.name}: {s.min}%
                </Text>
              ))}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}