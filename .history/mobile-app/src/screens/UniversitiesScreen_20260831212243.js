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
import RNModal from "react-native-modal";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import { db } from "../../backend/firebase/firebase";
import { useAuth } from "../../backend/auth/AuthContext";
import SearchFilterBar from "../components/FilterBar";

export default function UniversitiesScreen({ navigation }) {
  const { apsScore } = useAuth();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedInstitution, setSelectedInstitution] = useState(null);

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
    if (!url) return;

    const allowedProtocols = ["https://"];

    const valid = allowedProtocols.some((p) =>
      url.startsWith(p)
    );

    if (!valid) {
      alert("Invalid application link");
      return;
    }

    navigation.navigate("WebViewScreen", { url });
  };

  // ----------------- STATUS TRACKER -----------------
  const computeInstitutionStatus = (institution) => {
    const today = new Date();

    const openDate = institution.opensAt
      ? new Date(institution.opensAt)
      : null;

    const closeDate = institution.closesAt
      ? new Date(institution.closesAt)
      : null;

    if (
      !closeDate ||
      isNaN(closeDate.getTime())
    ) {
      return {
        status: "Unknown",
        isOpen: false,
        closingSoon: false,
        daysLeft: null,
      };
    }

    const daysLeft = Math.ceil(
      (closeDate - today) /
        (1000 * 60 * 60 * 24)
    );

    const hasOpened =
      !openDate || today >= openDate;

    const isOpen =
      hasOpened && daysLeft > 0;

    const closingSoon =
      isOpen &&
      daysLeft <= 14 &&
      daysLeft > 0;

    let status = "Closed";

    if (isOpen && closingSoon) {
      status = "Closing Soon";
    } else if (isOpen) {
      status = "Open";
    }

    return {
      status,
      isOpen,
      closingSoon,
      daysLeft,
    };
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
        const { status } =
          computeInstitutionStatus(uni);

        return status === filters.status;
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
      list = list.filter(
        (uni) =>
          Number(
            uni.rating?.scoreOutOf10 || 0
          ) >= 7
      );

      list.sort(
        (a, b) =>
          Number(
            b.rating?.scoreOutOf10 || 0
          ) -
          Number(
            a.rating?.scoreOutOf10 || 0
          )
      );
    }

    return list;
  }, [universities, search, filters, apsScore]);

  // ================= TOGGLE FILTER =================
  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]:prev[key] === value ? null : value,
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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CompareScreen")
        }
        style={{
          backgroundColor: "#111827",
          padding: 14,
          borderRadius: 28,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Compare Institutions
        </Text>
      </TouchableOpacity>

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
          const {
            status,
            isOpen,
            closingSoon,
            daysLeft,
          } = computeInstitutionStatus(item);

          const qualified =
            Number(apsScore || 0) >=
            Number(item.minAPS || 0);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                setSelectedInstitution(item)
              }
              style={styles.modernCard}
            >
              {/* LOGO */}
              <Image
                source={{
                  uri:
                    item.logo ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
                }}
                style={styles.modernLogo}
              />

              {/* INFO */}
              <View style={{ flex: 1 }}>
                <Text style={styles.modernName}>
                  {item.name}
                </Text>

                <Text style={styles.modernType}>
                  {item.type}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color: isOpen
                        ? "#16A34A"
                        : "#DC2626",
                      fontWeight: "700",
                      marginRight: 12,
                    }}
                  >
                    {status === "Closing Soon"
                      ? "🟠 Closing Soon"
                      : status === "Open"
                      ? "🟢 Open"
                      : "🔴 Closed"}
                  </Text>

                  {isOpen && (
                    <Text
                      style={{
                        color: "#6B7280",
                        fontWeight: "600",
                      }}
                    >
                      Closes in {daysLeft} days
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    color: "#F59E0B",
                    fontWeight: "700",
                    marginTop: 4,
                  }}
                >
                  ⭐{item.rating?.scoreOutOf10 || "N/A"}/10
                </Text>

                {qualified && (
                  <View
                    style={{
                      marginTop: 8,
                      alignSelf: "flex-start",
                      backgroundColor: "#DCFCE7",
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#166534",
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      APS Qualified
                    </Text>
                  </View>
                )}
              </View>

              {/* APPLY */}
              <TouchableOpacity
                onPress={() =>
                  openApplyPage(item.applyLink)
                }
                style={styles.smallApplyBtn}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
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
                "Private College",
                "TVET College",
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
      <RNModal
        isVisible={!!selectedInstitution}
        swipeDirection="down"
        onSwipeComplete={() =>
          setSelectedInstitution(null)
        }
        propagateSwipe
        backdropOpacity={0.4}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{
          margin: 0,
          justifyContent: "flex-end",
          height:"80%"
        }}
      >
        {selectedInstitution && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
                      }}
          >
            {/* Swipe handle */}
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 6,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: "#D1D5DB",
                }}
              />
            </View>

            {/* HERO IMAGE */}
            <View>
              <Image
                source={{
                  uri:
                    selectedInstitution.coverImage ||
                    selectedInstitution.logo,
                }}
                style={{
                  width: "100%",
                  height: 280,
                }}
              />

              {/* CLOSE */}
              <TouchableOpacity
                onPress={() =>
                  setSelectedInstitution(null)
                }
                style={{
                  position: "absolute",
                  top: 55,
                  left: 20,
                  width: 44,
                  height: 44,
                  borderRadius: 50,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>

              {/* FAVOURITE */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 55,
                  right: 20,
                  width: 44,
                  height: 44,
                  borderRadius: 50,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  ♡
                </Text>
              </TouchableOpacity>

              {/* NAME */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor:
                    "rgba(0,0,0,0.55)",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: "800",
                  }}
                >
                  {selectedInstitution.name}
                </Text>

                <Text
                  style={{
                    color: "#E5E7EB",
                    marginTop: 4,
                  }}
                >
                  {selectedInstitution.type}
                </Text>
                
                <Text style={{color:"white"}}>
                Rating:
                {" ⭐ "}
                {selectedInstitution.rating?.scoreOutOf10}
              </Text>
              </View>
            </View>

            <View style={{ padding: 18 }}>

              {/* QUICK INFO */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <View style={styles.infoPill}>
                  <Text style={styles.infoPillText}>
                    APS {selectedInstitution.minAPS}
                  </Text>
                </View>

                <View style={styles.infoPill}>
                  <Text style={styles.infoPillText}>
                    {selectedInstitution.type}
                  </Text>
                </View>
              </View>

              {/* ABOUT */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  About Institution
                </Text>

                <Text style={styles.detailsText}>
                  {
                    selectedInstitution.description
                  }
                </Text>
              </View>

              {/* ================= LOCATION MAP ================= */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Institution Location
                </Text>

                {selectedInstitution?.latitude &&
                selectedInstitution?.longitude ? (
                  <>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: Number(
                          selectedInstitution.latitude
                        ),
                        longitude: Number(
                          selectedInstitution.longitude
                        ),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: Number(
                            selectedInstitution.latitude
                          ),
                          longitude: Number(
                            selectedInstitution.longitude
                          ),
                        }}
                        title={selectedInstitution.name}
                        description="Institution location"
                      />
                    </MapView>

                    <Text style={styles.locationText}>
                      📍 {selectedInstitution.location ||
                        selectedUniversity.address ||
                        "Location available on map"}
                    </Text>
                  </>
                ) : (
                  <View style={styles.noMapContainer}>
                    <Ionicons
                      name="location-outline"
                      size={30}
                      color="#9CA3AF"
                    />

                    <Text style={styles.noMapText}>
                      Location information is not available
                      for this institution.
                    </Text>
                  </View>
                )}
              </View>

              {/* CONTACT */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Contact Information
                </Text>

                <Text style={styles.detailsText}>
                  📍 {selectedInstitution.location}
                </Text>

                <Text style={styles.detailsText}>
                  📞 {selectedInstitution.phone}
                </Text>

                <Text style={styles.detailsText}>
                  ✉️ {selectedInstitution.email}
                </Text>
              </View>

              {/* APPLICATION DATES */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Applications
                </Text>

                <Text style={styles.detailsText}>
                  Opens:
                  {" "}
                  {selectedInstitution.opensAt}
                </Text>

                <Text style={styles.detailsText}>
                  Closes:
                  {" "}
                  {selectedInstitution.closesAt}
                </Text>
              </View>

              {/* COURSES */}
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Courses Offered
                </Text>

                {(
                  selectedInstitution.courses ||
                  []
                ).map((course, index) => (
                  <Text
                    key={index}
                    style={styles.detailsText}
                  >
                    • {course}
                  </Text>
                ))}
              </View>

              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Rankings & Ratings
                </Text>

                <Text style={styles.detailsText}>
                  Overall Score:
                  {" "}
                  {selectedInstitution.rating?.scoreOutOf10}/10
                </Text>

                <Text style={styles.detailsText}>
                  Webometrics:
                  {" "}
                  {selectedInstitution.rating?.webometrics2026}
                </Text>

                <Text style={styles.detailsText}>
                  UniRanks:
                  {" "}
                  {selectedInstitution.rating?.uniranksScore2026}
                </Text>

                <Text style={styles.detailsText}>
                  {selectedInstitution.rating?.notes}
                </Text>
              </View>

              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                  Accommodation
                </Text>

                <Text style={styles.detailsText}>
                  Available Accommodation:
                  {" "}
                  {selectedInstitution.accommodations?.length || 0}
                </Text>

                <TouchableOpacity
                  style={styles.viewAccommodationBtn}
                  onPress={() =>
                    navigation.navigate(
                      "AccommodationScreen",
                      {
                        institution:
                          selectedInstitution,
                      }
                    )
                  }
                >
                  <Text style={styles.viewAccommodationText}>
                    View Accommodation {" ->"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* APPLY */}
              <TouchableOpacity
                style={styles.bigApplyBtn}
                onPress={() =>
                  openApplyPage(
                    selectedInstitution.applyLink
                  )
                }
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Apply Now
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        )}
      </RNModal>
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

  modernCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  modernLogo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 14,
  },

  modernName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },

  modernType: {
    color: "#6B7280",
    marginTop: 2,
  },

  smallApplyBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
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
    borderRadius: 22,
    marginTop: 16,
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  detailsText: {
    color: "#4B5563",
    lineHeight: 24,
  },

  compareBtn: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  bigApplyBtn: {
    backgroundColor: "#4F46E5",
    padding: 18,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
/*
  map: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginTop: 5,
  },

  locationText: {
    marginTop: 10,
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 20,
  },

  noMapContainer: {
    height: 150,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  noMapText: {
    marginTop: 8,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 20,
  },*/
});