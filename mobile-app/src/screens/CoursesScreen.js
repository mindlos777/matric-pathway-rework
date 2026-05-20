import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import { courseData } from "../data/courseData";
import { useAuth } from "../auth/AuthContext";
import SearchFilterBar from "../components/FilterBar";

export default function CoursesScreen() {
  const { apsScore, subjects } = useAuth();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [filters, setFilters] = useState({
    field: null,
    demand: null,
    duration: null,
    apsMode: false,
  });

  // ================= FILTER OPTIONS =================
  const typeOptions = [
    "Technology",
    "Business",
    "Health",
    "Law",
    "Education",
  ];

  const demandOptions = ["High", "Medium", "Low"];

  const durationOptions = ["1", "2", "3", "4"];

  // ================= TOGGLE FILTER =================
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  // ================= APS FILTER =================
  const toggleAPSMode = () => {
    setFilters((prev) => ({
      ...prev,
      apsMode: !prev.apsMode,
    }));
  };

  // ================= FILTER LOGIC =================
  const matched = useMemo(() => {
    let list = [...courseData];

    // ================= SEARCH =================
    if (search.trim()) {
      list = list.filter((course) =>
        course.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // ================= FIELD =================
    if (filters.field) {
      list = list.filter(
        (course) => course.field === filters.field
      );
    }

    // ================= DEMAND =================
    if (filters.demand) {
      list = list.filter(
        (course) => course.demand === filters.demand
      );
    }

    // ================= DURATION =================
    if (filters.duration) {
      list = list.filter(
        (course) =>
          String(course.duration) ===
          String(filters.duration)
      );
    }

    // ================= APS FILTER =================
    if (filters.apsMode === true) {
      const userAPS = Number(apsScore);

      // if no APS → show nothing
      if (!userAPS || isNaN(userAPS)) {
        return [];
      }

      list = list.filter((course) => {
        const minAPS = Number(course.minAPS);

        return userAPS >= minAPS;
      });
    }

    // ================= SMART SORT =================
    if (apsScore) {
      const userAPS = Number(apsScore);

      list.sort((a, b) => {
        const diffA =
          Math.abs(userAPS - Number(a.minAPS));

        const diffB =
          Math.abs(userAPS - Number(b.minAPS));

        return diffA - diffB;
      });
    }

    return list;
  }, [search, filters, apsScore]);

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
      }}
    >

      {/* SEARCH + FILTER */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() => setShowFilters(true)}
        placeholder="Search courses..."
      />

      <Text style={{ marginBottom: 10 }}>
        Your APS: {String(apsScore)}
      </Text>

      {/* ================= COURSES LIST ================= */}
      <FlatList
        data={matched}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#666",
            }}
          >
            No courses found
          </Text>
        }
        renderItem={({ item }) => {
          const qualified =
            apsScore && apsScore >= item.minAPS;

          return (
            <TouchableOpacity
              onPress={() => setSelectedCourse(item)}
              activeOpacity={0.9}
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 16,
                marginBottom: 14,
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 150,
                  borderRadius: 12,
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 12,
                }}
              >
                {item.name}
              </Text>

              <Text style={{ marginTop: 4 }}>
                {item.field}
              </Text>

              <Text>
                Duration: {item.duration} years
              </Text>

              <Text>
                Demand: {item.demand}
              </Text>

              <Text>
                Min APS: {item.minAPS}
              </Text>

              {/* APS MATCH */}
              {apsScore ? (
                <View
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-start",
                    backgroundColor: qualified
                      ? "#DCFCE7"
                      : "#FEE2E2",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: qualified
                        ? "#166534"
                        : "#991B1B",
                      fontWeight: "600",
                    }}
                  >
                    {qualified
                      ? "✓ APS Qualified"
                      : "APS Too Low"}
                  </Text>
                </View>
              ) : null}

              <Text
                style={{
                  color: "#4F46E5",
                  marginTop: 10,
                  fontWeight: "600",
                }}
              >
                Tap to read more →
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* ================= FILTER MODAL ================= */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent
      >
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
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 18,
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Filters
              </Text>

              <TouchableOpacity
                onPress={() => setShowFilters(false)}
              >
                <Text style={{ fontSize: 22 }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 15 }}
            >

              {/* APS MODE */}
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 10,
                  fontSize: 16,
                }}
              >
                Smart Recommendations
              </Text>

              <TouchableOpacity
                onPress={toggleAPSMode}
                style={{
                  padding: 14,
                  marginTop: 10,
                  borderRadius: 12,
                  backgroundColor: filters.apsMode
                    ? "#4F46E5"
                    : "#eee",
                }}
              >
                <Text
                  style={{
                    color: filters.apsMode
                      ? "#fff"
                      : "#000",
                    fontWeight: "600",
                  }}
                >
                  Based on my APS
                </Text>
              </TouchableOpacity>

              {/* TYPE */}
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 25,
                  fontSize: 16,
                }}
              >
                Type
              </Text>

              {typeOptions.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() =>
                    toggleFilter("field", t)
                  }
                  style={{
                    padding: 12,
                    marginTop: 8,
                    borderRadius: 10,
                    backgroundColor:
                      filters.field === t
                        ? "#4F46E5"
                        : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color:
                        filters.field === t
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* DEMAND */}
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 25,
                  fontSize: 16,
                }}
              >
                Demand
              </Text>

              {demandOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() =>
                    toggleFilter("demand", d)
                  }
                  style={{
                    padding: 12,
                    marginTop: 8,
                    borderRadius: 10,
                    backgroundColor:
                      filters.demand === d
                        ? "#4F46E5"
                        : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color:
                        filters.demand === d
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* DURATION */}
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 25,
                  fontSize: 16,
                }}
              >
                Duration
              </Text>

              {durationOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() =>
                    toggleFilter("duration", d)
                  }
                  style={{
                    padding: 12,
                    marginTop: 8,
                    borderRadius: 10,
                    backgroundColor:
                      filters.duration === d
                        ? "#4F46E5"
                        : "#eee",
                  }}
                >
                  <Text
                    style={{
                      color:
                        filters.duration === d
                          ? "#fff"
                          : "#000",
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
                padding: 16,
                borderRadius: 12,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Apply Filters
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* ================= COURSE DETAILS ================= */}
      <Modal
        visible={!!selectedCourse}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#fff",
          }}
        >

          <TouchableOpacity
            onPress={() => setSelectedCourse(null)}
          >
            <Text style={{ fontSize: 20 }}>
              ✕ Close
            </Text>
          </TouchableOpacity>

          {selectedCourse && (
            <>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  marginTop: 15,
                }}
              >
                {selectedCourse.name}
              </Text>

              <Text style={{ marginTop: 15 }}>
                Field: {selectedCourse.field}
              </Text>

              <Text>
                Duration: {selectedCourse.duration}
              </Text>

              <Text>
                Demand: {selectedCourse.demand}
              </Text>

              <Text>
                Min APS: {selectedCourse.minAPS}
              </Text>

              <Text
                style={{
                  marginTop: 20,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Requirements
              </Text>

              {(selectedCourse.subjects || []).map(
                (s, i) => (
                  <Text
                    key={i}
                    style={{ marginTop: 6 }}
                  >
                    {s.name}: {s.min}%
                  </Text>
                )
              )}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}