import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../auth/AuthContext";
import SearchFilterBar from "../components/FilterBar";

export default function UniversitiesScreen({ navigation }) {
  const { apsScore } = useAuth();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    type: null,
    status: null,
    topRated: false,
    basedOnAPS: false,
  });

  // ================= FETCH UNIVERSITIES =================
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "universities_db"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUniversities(data);
        setLoading(false);
      },
      (error) => {
        console.log("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================= OPEN APPLY PAGE =================
  const openApplyPage = (url) => {
    if (!url) {
      Alert.alert(
        "Error",
        "Application link not available"
      );
      return;
    }

    navigation.navigate("WebView", {
      url,
    });
  };

  // ================= FILTER + SORT LOGIC =================
  const filtered = useMemo(() => {
    let list = [...universities];

    // SEARCH
    if (search.trim()) {
      list = list.filter((uni) =>
        uni.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // TYPE FILTER
    if (filters.type) {
      list = list.filter(
        (uni) => uni.type === filters.type
      );
    }

    // STATUS FILTER
    if (filters.status) {
      list = list.filter((uni) => {
        const today = new Date();

        const openDate = uni.opensAt
          ? new Date(uni.opensAt)
          : null;

        const closeDate = uni.closesAt
          ? new Date(uni.closesAt)
          : null;

        const isOpen =
          openDate &&
          closeDate &&
          today >= openDate &&
          today <= closeDate;

        return filters.status === "Open"
          ? isOpen
          : !isOpen;
      });
    }

    // APS FILTER
    if (filters.basedOnAPS) {
      const safeAPS = Number(apsScore || 0);

      list = list.filter((uni) => {
        const uniAPS = Number(uni.minAPS || 0);

        return safeAPS >= uniAPS;
      });
    }

    // SORT TOP RATED
    if (filters.topRated) {
      list.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return list;
  }, [universities, search, filters, apsScore]);

  // ================= TOGGLE FILTER =================
  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        prev[key] === value ? null : value,
    }));
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() =>
          setShowFilters(true)
        }
        placeholder="Search universities..."
      />

      {/* APS */}
      <Text style={styles.apsText}>
        Your APS: {apsScore || 0}
      </Text>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No universities found
          </Text>
        }
        renderItem={({ item }) => {
          const today = new Date();

          const openDate = item.opensAt
            ? new Date(item.opensAt)
            : null;

          const closeDate = item.closesAt
            ? new Date(item.closesAt)
            : null;

          const isOpen =
            openDate &&
            closeDate &&
            today >= openDate &&
            today <= closeDate;

          const daysLeft =
            closeDate
              ? Math.ceil(
                  (closeDate - today) /
                    (1000 * 60 * 60 * 24)
                )
              : null;

          // CLOSING SOON
          const closingSoon =
            isOpen &&
            daysLeft !== null &&
            daysLeft <= 10 &&
            daysLeft >= 1;

          return (
            <View style={styles.card}>

              {/* HEADER */}
              <View style={styles.headerRow}>
                <Image
                  source={{
                    uri:
                      item.logo ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
                  }}
                  style={styles.logo}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.uniName}>
                    {item.name}
                  </Text>

                  <Text style={styles.uniType}>
                    {item.type}
                  </Text>
                </View>
              </View>

              {/* INFO */}
              <Text style={styles.infoText}>
                Min APS:
                <Text style={styles.bold}>
                  {" "}
                  {item.minAPS || "N/A"}
                </Text>
              </Text>

              {/* STATUS */}
              <Text
                style={[
                  styles.status,
                  {
                    color: closingSoon
                      ? "#EA580C"
                      : isOpen
                      ? "#16A34A"
                      : "#DC2626",
                  },
                ]}
              >
                {closingSoon
                  ? "🟠 Closing Soon"
                  : isOpen
                  ? "🟢 Applications Open"
                  : "🔴 Applications Closed"}
              </Text>

              {/* DEADLINE */}
              {isOpen &&
                daysLeft !== null && (
                  <Text
                    style={[
                      styles.deadline,
                      {
                        color:
                          daysLeft <= 10
                            ? "#DC2626"
                            : "#6B7280",
                      },
                    ]}
                  >
                    Closes in {daysLeft} days
                  </Text>
                )}

              {/* APS QUALIFIED */}
              {Number(apsScore || 0) >=
                Number(item.minAPS || 0) && (
                <View style={styles.qualifiedBadge}>
                  <Text style={styles.badgeText}>
                    APS Qualified
                  </Text>
                </View>
              )}

              {/* APPLY */}
              <TouchableOpacity
                onPress={() =>
                  openApplyPage(item.applyLink)
                }
                style={styles.applyBtn}
              >
                <Text style={styles.applyText}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* ================= FILTER MODAL ================= */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Filters
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowFilters(false)
                }
              >
                <Text style={styles.closeBtn}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* SCROLLABLE CONTENT */}
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* TYPE */}
              <Text style={styles.filterTitle}>
                Institution Type
              </Text>

              {[
                "University",
                "Private",
                "TVET",
              ].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() =>
                    toggle("type", t)
                  }
                  style={[
                    styles.filterBtn,
                    filters.type === t &&
                      styles.activeFilter,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filters.type === t &&
                        styles.activeFilterText,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* STATUS */}
              <Text style={styles.filterTitle}>
                Application Status
              </Text>

              {["Open", "Closed"].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() =>
                    toggle("status", s)
                  }
                  style={[
                    styles.filterBtn,
                    filters.status === s &&
                      styles.activeFilter,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filters.status === s &&
                        styles.activeFilterText,
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* SMART FILTERS */}
              <Text style={styles.filterTitle}>
                Smart Filters
              </Text>

              {/* TOP RATED */}
              <TouchableOpacity
                onPress={() =>
                  setFilters((p) => ({
                    ...p,
                    topRated: !p.topRated,
                  }))
                }
                style={[
                  styles.filterBtn,
                  filters.topRated &&
                    styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filters.topRated &&
                      styles.activeFilterText,
                  ]}
                >
                  Top Rated
                </Text>
              </TouchableOpacity>

              {/* APS */}
              <TouchableOpacity
                onPress={() =>
                  setFilters((p) => ({
                    ...p,
                    basedOnAPS:
                      !p.basedOnAPS,
                  }))
                }
                style={[
                  styles.filterBtn,
                  filters.basedOnAPS &&
                    styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filters.basedOnAPS &&
                      styles.activeFilterText,
                  ]}
                >
                  Based on My APS
                </Text>
              </TouchableOpacity>

              {/* APPLY */}
              <TouchableOpacity
                onPress={() =>
                  setShowFilters(false)
                }
                style={styles.applyFilterBtn}
              >
                <Text style={styles.applyFilterText}>
                  Apply Filters
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  apsText: {
    marginBottom: 10,
    color: "#666",
    fontWeight: "500",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },

  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },

  uniName: {
    fontSize: 17,
    fontWeight: "700",
  },

  uniType: {
    color: "#666",
    marginTop: 2,
  },

  infoText: {
    marginTop: 2,
    color: "#444",
  },

  bold: {
    fontWeight: "700",
  },

  status: {
    marginTop: 8,
    fontWeight: "600",
  },

  deadline: {
    marginTop: 4,
    fontWeight: "500",
  },

  qualifiedBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#166534",
    fontWeight: "600",
    fontSize: 12,
  },

  applyBtn: {
    marginTop: 14,
    backgroundColor: "#4F46E5",
    padding: 12,
    borderWidth: 1,
    borderColor: "#2165f988",
    borderRadius: 28,  },

  applyText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "75%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  closeBtn: {
    fontSize: 20,
  },

  filterTitle: {
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
  },

  filterBtn: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F3F4F6",
  },

  activeFilter: {
    backgroundColor: "#4F46E5",
  },

  filterText: {
    color: "#111",
    fontWeight: "500",
  },

  activeFilterText: {
    color: "#fff",
  },

  applyFilterBtn: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 20,
    alignItems: "center",
  },

  applyFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
});