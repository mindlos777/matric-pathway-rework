import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { courseData } from "../data/courseData";
import { useAuth } from "../auth/AuthContext";
import SearchFilterBar from "../components/FilterBar";
import { courseDescriptions } from "../data/courseDescriptions";
import { universities } from "../data/universityData";

export default function CoursesScreen() {
  const { apsScore } = useAuth();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedCourse, setSelectedCourse] =
    useState(null);

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
    "Engineering",
  ];

  const demandOptions = [
    "High",
    "Medium",
    "Low",
  ];

  const durationOptions = [
    "1",
    "2",
    "3",
    "4",
  ];

  // ================= TOGGLE FILTER =================
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        prev[key] === value ? null : value,
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

    // SEARCH
    if (search.trim()) {
      list = list.filter((course) =>
        course.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // FIELD
    if (filters.field) {
      list = list.filter(
        (course) =>
          course.field === filters.field
      );
    }

    // DEMAND
    if (filters.demand) {
      list = list.filter(
        (course) =>
          course.demand === filters.demand
      );
    }

    // DURATION
    if (filters.duration) {
      list = list.filter(
        (course) =>
          String(course.duration) ===
          String(filters.duration)
      );
    }

    // APS FILTER
    if (filters.apsMode === true) {
      const userAPS = Number(apsScore);

      if (!userAPS || isNaN(userAPS)) {
        return [];
      }

      list = list.filter((course) => {
        const minAPS = Number(
          course.minAPS
        );

        return userAPS >= minAPS;
      });
    }

    // SMART SORT
    if (apsScore) {
      const userAPS = Number(apsScore);

      list.sort((a, b) => {
        const diffA = Math.abs(
          userAPS - Number(a.minAPS)
        );

        const diffB = Math.abs(
          userAPS - Number(b.minAPS)
        );

        return diffA - diffB;
      });
    }

    return list;
  }, [search, filters, apsScore]);

  return (
    <View style={styles.container}>
      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() =>
          setShowFilters(true)
        }
        placeholder="Search courses..."
      />

      {/* APS */}
      <Text style={styles.apsText}>
        Your APS: {String(apsScore || 0)}
      </Text>

      {/* ================= COURSES LIST ================= */}
      <FlatList
        data={matched}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No courses found
          </Text>
        }
        renderItem={({ item }) => {
          const qualified =
            apsScore &&
            apsScore >= item.minAPS;

          return (
            <TouchableOpacity
              onPress={() =>
                setSelectedCourse(item)
              }
              activeOpacity={0.92}
              style={styles.courseCard}
            >
              {/* IMAGE */}
              <Image
                source={{ uri: item.image }}
                style={styles.courseImage}
              />

              {/* CONTENT */}
              <View style={styles.courseContent}>
                {/* TITLE */}
                <Text style={styles.courseTitle}>
                  {item.name}
                </Text>

                {/* FIELD */}
                <Text style={styles.courseField}>
                  {item.field}
                </Text>

                {/* INFO ROW */}
                <View style={styles.infoRow}>
                  <View style={styles.durationBadge}>
                    <Text
                      style={
                        styles.durationText
                      }
                    >
                      {item.duration} Years
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.demandBadge,
                      {
                        backgroundColor:
                          item.demand ===
                          "High"
                            ? "#DCFCE7"
                            : item.demand ===
                              "Medium"
                            ? "#FEF3C7"
                            : "#F3F4F6",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          item.demand ===
                          "High"
                            ? "#166534"
                            : item.demand ===
                              "Medium"
                            ? "#92400E"
                            : "#374151",

                        fontWeight: "700",
                      }}
                    >
                      {item.demand} Demand
                    </Text>
                  </View>
                </View>

                {/* APS */}
                <View style={styles.apsRow}>
                  <Ionicons
                    name="school-outline"
                    size={18}
                    color="#4F46E5"
                  />

                  <Text style={styles.apsLabel}>
                    Minimum APS:
                    {" "}
                    {item.minAPS}
                  </Text>
                </View>

                {/* QUALIFIED */}
                {apsScore ? (
                  <View
                    style={[
                      styles.qualifyBadge,
                      {
                        backgroundColor:
                          qualified
                            ? "#DCFCE7"
                            : "#FEE2E2",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: qualified
                          ? "#166534"
                          : "#991B1B",

                        fontWeight: "700",
                      }}
                    >
                      {qualified
                        ? "✓ APS Qualified"
                        : "APS Too Low"}
                    </Text>
                  </View>
                ) : null}

                {/* READ MORE */}
                <View style={styles.readMore}>
                  <Text
                    style={
                      styles.readMoreText
                    }
                  >
                    Read full details
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color="#4F46E5"
                    style={{
                      marginLeft: 6,
                    }}
                  />
                </View>
              </View>
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
        <View style={styles.filterOverlay}>
          <View style={styles.filterContainer}>
            {/* HEADER */}
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>
                Filters
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowFilters(false)
                }
              >
                <Text
                  style={{
                    fontSize: 22,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
              style={{ marginTop: 15 }}
            >
              {/* APS MODE */}
              <Text style={styles.filterLabel}>
                Smart Recommendations
              </Text>

              <TouchableOpacity
                onPress={toggleAPSMode}
                style={[
                  styles.filterOption,
                  {
                    backgroundColor:
                      filters.apsMode
                        ? "#4F46E5"
                        : "#eee",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      filters.apsMode
                        ? "#fff"
                        : "#000",

                    fontWeight: "600",
                  }}
                >
                  Based on my APS
                </Text>
              </TouchableOpacity>

              {/* TYPE */}
              <Text style={styles.filterLabel}>
                Type
              </Text>

              {typeOptions.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() =>
                    toggleFilter(
                      "field",
                      t
                    )
                  }
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        filters.field === t
                          ? "#4F46E5"
                          : "#eee",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        filters.field ===
                        t
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* DEMAND */}
              <Text style={styles.filterLabel}>
                Demand
              </Text>

              {demandOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() =>
                    toggleFilter(
                      "demand",
                      d
                    )
                  }
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        filters.demand ===
                        d
                          ? "#4F46E5"
                          : "#eee",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        filters.demand ===
                        d
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* DURATION */}
              <Text style={styles.filterLabel}>
                Duration
              </Text>

              {durationOptions.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() =>
                    toggleFilter(
                      "duration",
                      d
                    )
                  }
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        filters.duration ===
                        d
                          ? "#4F46E5"
                          : "#eee",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        filters.duration ===
                        d
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
              onPress={() =>
                setShowFilters(false)
              }
              style={styles.applyBtn}
            >
              <Text style={styles.applyText}>
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
        {selectedCourse && (
          <ScrollView
            style={styles.detailsContainer}
            showsVerticalScrollIndicator={
              false
            }
          >
            {/* HERO IMAGE */}
            <View>
              <Image
                source={{
                  uri: selectedCourse.image,
                }}
                style={styles.heroImage}
              />

              {/* CLOSE */}
              <TouchableOpacity
                onPress={() =>
                  setSelectedCourse(null)
                }
                style={styles.closeBtn}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>

              {/* COURSE NAME */}
              <View
                style={styles.heroOverlay}
              >
                <Text style={styles.heroTitle}>
                  {selectedCourse.name}
                </Text>

                <Text
                  style={styles.heroField}
                >
                  {selectedCourse.field}
                </Text>
              </View>
            </View>

            {/* CONTENT */}
            <View style={styles.detailsContent}>
              {/* QUICK INFO */}
              <View
                style={styles.quickInfoRow}
              >
                <View style={styles.infoPill}>
                  <Text
                    style={
                      styles.infoPillText
                    }
                  >
                    {
                      selectedCourse.duration
                    }{" "}
                    Years
                  </Text>
                </View>

                <View style={styles.infoPill}>
                  <Text
                    style={
                      styles.infoPillText
                    }
                  >
                    NQF{" "}
                    {
                      selectedCourse.nqfLevel
                    }
                  </Text>
                </View>

                <View style={styles.infoPill}>
                  <Text
                    style={
                      styles.infoPillText
                    }
                  >
                    APS{" "}
                    {
                      selectedCourse.minAPS
                    }
                  </Text>
                </View>

                <View
                  style={[
                    styles.infoPill,
                    {
                      backgroundColor:
                        selectedCourse.demand ===
                        "High"
                          ? "#DCFCE7"
                          : "#FEF3C7",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color:
                        selectedCourse.demand ===
                        "High"
                          ? "#166534"
                          : "#92400E",
                    }}
                  >
                    {
                      selectedCourse.demand
                    }{" "}
                    Demand
                  </Text>
                </View>
              </View>

              {/* ABOUT */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  About This Course
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {courseDescriptions[
                    selectedCourse.id
                  ]?.overview ||
                    "No description available yet."}
                </Text>
              </View>

              {/* INSTITUTIONS */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Institutions Offering This Course
                </Text>

                {(selectedCourse.offeredAt || []).map(
                  (uni, index) => {
                    const institution =
                      universities?.find(
                        (u) => u.id === uni.universityId
                      );

                    if (!institution) return null;
                    console.log("COURSE UNI:", uni.universityId);
                    console.log("FOUND:", institution);

                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#F9FAFB",
                          padding: 14,
                          borderRadius: 16,
                          marginTop: 12,
                        }}
                      >
                        {/* LOGO */}
                        <Image
                          source={{
                            uri: institution.logo,
                          }}
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 12,
                            marginRight: 14,
                            backgroundColor: "#fff",
                          }}
                          resizeMode="contain"
                        />

                        {/* INFO */}
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "700",
                              color: "#111827",
                            }}
                          >
                            {institution.name}
                          </Text>

                          <Text
                            style={{
                              marginTop: 4,
                              color: "#6B7280",
                            }}
                          >
                            APS Requirement:
                            {" "}
                            {institution.minAPS}
                          </Text>
                        </View>

                        <Ionicons
                          name="school"
                          size={22}
                          color="#4F46E5"
                        />
                      </View>
                    );
                  }
                )}
              </View>

              {/* AI SAFETY */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  AI & Future Safety
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {courseDescriptions[
                    selectedCourse.id
                  ]?.aiSafety ||
                    "Information coming soon."}
                </Text>
              </View>

              {/* CAREERS */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Career Opportunities
                </Text>

                {courseDescriptions[
                  selectedCourse.id
                ]?.careers?.map(
                  (career, index) => (
                    <Text
                      key={index}
                      style={
                        styles.bulletText
                      }
                    >
                      • {career}
                    </Text>
                  )
                )}
              </View>

              {/* WHAT YOU LEARN */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  What You Will Learn
                </Text>

                {courseDescriptions[
                  selectedCourse.id
                ]?.procedures?.map(
                  (item, index) => (
                    <Text
                      key={index}
                      style={
                        styles.bulletText
                      }
                    >
                      • {item}
                    </Text>
                  )
                )}
              </View>

              {/* SUBJECT REQUIREMENTS */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Subject Requirements
                </Text>

                {(
                  selectedCourse.subjects ||
                  []
                ).map((s, i) => (
                  <View
                    key={i}
                    style={
                      styles.subjectRow
                    }
                  >
                    <Text
                      style={
                        styles.detailsText
                      }
                    >
                      {s.name}
                    </Text>

                    <Text
                      style={
                        styles.subjectMark
                      }
                    >
                      {s.min}%
                    </Text>
                  </View>
                ))}
              </View>

              {/* SALARY */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Salary Expectations
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {courseDescriptions[
                    selectedCourse.id
                  ]?.salary ||
                    "Information coming soon."}
                </Text>
              </View>

              {/* PERSONALITY */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Best Personality Fit
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {courseDescriptions[
                    selectedCourse.id
                  ]?.personalityFit ||
                    "Information coming soon."}
                </Text>
              </View>

              {/* FUTURE DEMAND */}
              <View style={styles.detailsCard}>
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Future Job Demand
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {courseDescriptions[
                    selectedCourse.id
                  ]?.futureDemand ||
                    "Information coming soon."}
                </Text>
              </View>

              <View
                style={{ height: 40 }}
              />
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F9FAFB",
  },

  apsText: {
    marginBottom: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },

  // ================= COURSE CARD =================
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  courseImage: {
    width: "100%",
    height: 190,
  },

  courseContent: {
    padding: 16,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  courseField: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 14,
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },

  durationBadge: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  durationText: {
    color: "#4338CA",
    fontWeight: "700",
  },

  demandBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  apsRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  apsLabel: {
    marginLeft: 6,
    color: "#374151",
    fontWeight: "600",
  },

  qualifyBadge: {
    marginTop: 14,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  readMore: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  readMoreText: {
    color: "#4F46E5",
    fontWeight: "700",
  },

  // ================= FILTER =================
  filterOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:
      "rgba(0,0,0,0.5)",
  },

  filterContainer: {
    backgroundColor: "#fff",
    height: "75%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 18,
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  filterLabel: {
    fontWeight: "bold",
    marginTop: 25,
    fontSize: 16,
  },

  filterOption: {
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
  },

  applyBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },

  applyText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  // ================= DETAILS =================
  detailsContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  heroImage: {
    width: "100%",
    height: 280,
  },

  closeBtn: {
    position: "absolute",
    top: 55,
    left: 20,
    backgroundColor:
      "rgba(0,0,0,0.5)",
    width: 42,
    height: 42,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  heroOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor:
      "rgba(0,0,0,0.55)",
    padding: 20,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },

  heroField: {
    color: "#E5E7EB",
    marginTop: 5,
    fontSize: 15,
  },

  detailsContent: {
    padding: 18,
  },

  quickInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  infoPill: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
  },

  infoPillText: {
    color: "#4338CA",
    fontWeight: "700",
  },

  detailsCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  detailsText: {
    color: "#4B5563",
    lineHeight: 24,
    fontSize: 15,
  },

  bulletText: {
    color: "#374151",
    lineHeight: 28,
    fontSize: 15,
  },

  subjectRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 10,
  },

  subjectMark: {
    fontWeight: "700",
    color: "#4F46E5",
  },
});