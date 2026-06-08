import React, { useState, useMemo } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNModal from "react-native-modal";
import { bursaryData } from "../data/bursaryData";
import SearchFilterBar from "../components/FilterBar";

export default function BursariesScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBursary, setSelectedBursary] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    status: null,
    emailAutoApply: false,
    fund: null,
  });

  // ---------------- FILTER ----------------
  const filtered = useMemo(() => {
    return (bursaryData || []).filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        !filters.status || b.status === filters.status;

      const matchFund =
        !filters.fund || b.funds?.includes(filters.fund);

      const matchAuto =
        !filters.emailAutoApply || b.autoApply === true;

      const matchType =
        !filters.type || b.type === filters.type;

      return (
        matchSearch &&
        matchStatus &&
        matchFund &&
        matchAuto &&
        matchType
      );
    });
  }, [search, filters]);

  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  // ---------------- OPEN WEBVIEW ----------------
  const openApplyPage = (url) => {
    if (!url) return;

    navigation.navigate("WebViewScreen", { url });
  };

  const computeBursaryStatus = (bursary) => {
    const today = new Date();

    const openDate = bursary.openingDate
      ? new Date(bursary.openingDate)
      : null;

    const closeDate = bursary.closingDate
      ? new Date(bursary.closingDate)
      : null;

    const isValid =
      closeDate &&
      !isNaN(closeDate.getTime());

    if (!isValid) {
      return {
        status: "Unknown",
        isOpen: false,
        closingSoon: false,
        daysLeft: null,
      };
    }

    const daysLeft = Math.ceil(
      (closeDate - today) / (1000 * 60 * 60 * 24)
    );

    const hasOpened = !openDate || today >= openDate;
    const isOpen = hasOpened && daysLeft > 0;

    const closingSoon = isOpen && daysLeft <= 14 && daysLeft > 0;

    let status = "Closed";
    if (isOpen && closingSoon) status = "Closing Soon";
    else if (isOpen) status = "Open";

    return {
      status,
      isOpen,
      closingSoon,
      daysLeft,
    };
  };
  const modalStatus = selectedBursary
  ? computeBursaryStatus(selectedBursary)
  : null;

  return (
    <View style={{ flex: 1, padding: 15 }}>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() => setShowFilters(true)}
        placeholder="Search bursaries..."
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Templates")}
        style={{
          backgroundColor: "#111",
          padding: 10,
          borderRadius: 28,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Templates (CV & Email)
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No bursaries found
          </Text>
        }
        renderItem={({ item }) => {
          const { status, isOpen, closingSoon, daysLeft } =
            computeBursaryStatus(item);

          return (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                console.log("Pressed:", item.name);
                setSelectedBursary(item);
              }}
              style={{
                backgroundColor: "#fff",
                borderRadius: 30,
                padding: 16,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "#ECECEC",
              }}
            >
              {/* TOP ROW */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* LOGO */}
                <Image
                  source={{
                    uri:
                      item.logo ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
                  }}
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    marginRight: 12,
                  }}
                />

                {/* INFO */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 16,
                      color: "#111827",
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      color: "#6B7280",
                      marginTop: 2,
                    }}
                  >
                    {item.type}
                  </Text>
                </View>

                {/* APPLY */}
                <TouchableOpacity
                  onPress={() =>
                    openApplyPage(item.link)
                  }
                  style={{
                    backgroundColor: "#4F46E5",
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    borderRadius: 25,
                  }}
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
              </View>

              {/* STATUS ROW */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: closingSoon
                      ? "#EA580C"
                      : isOpen
                      ? "#16A34A"
                      : "#DC2626",
                  }}
                >
                  {status === "Closing Soon"
                    ? "🟠 Closing Soon"
                    : status === "Open"
                    ? "🟢 Open"
                    : "🔴 Closed"}
                </Text>

                {daysLeft > 0 && (
                  <Text
                    style={{
                      marginLeft: 12,
                      color: "#6B7280",
                    }}
                  >
                    Closes in {daysLeft} days
                  </Text>
                )}

                <Text
                  style={{
                    marginLeft: 12,
                    color: "#4F46E5",
                    fontWeight: "700",
                  }}
                >
                  Read more →
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* FILTER MODAL */}
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
            maxHeight: "75%",
          }}>

            {/* HEADER */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Filters
              </Text>

              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* TYPE */}
            <Text style={{ fontWeight: "bold", marginTop: 15 }}>
              Type
            </Text>

            {["Government", "Private", "NGO"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => toggle("type", t)}
                style={{
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 8,
                  backgroundColor:
                    filters.type === t ? "#4F46E5" : "#eee",
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
                  marginTop: 5,
                  borderRadius: 8,
                  backgroundColor:
                    filters.status === s ? "#4F46E5" : "#eee",
                }}
              >
                <Text style={{
                  color: filters.status === s ? "#fff" : "#000",
                }}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}

            {/* AUTO APPLY */}
            <TouchableOpacity
              onPress={() =>
                setFilters((p) => ({
                  ...p,
                  emailAutoApply: !p.emailAutoApply,
                }))
              }
              style={{
                padding: 10,
                marginTop: 15,
                borderRadius: 8,
                backgroundColor:
                  filters.emailAutoApply ? "#4F46E5" : "#eee",
              }}
            >
              <Text style={{
                color: filters.emailAutoApply ? "#fff" : "#000",
              }}>
                Email Auto Apply
              </Text>
            </TouchableOpacity>

            {/* APPLY */}
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{
                marginTop: 20,
                backgroundColor: "#4F46E5",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Apply Filters
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* ================= BURSARY DETAILS ================= */}
      <RNModal
        isVisible={!!selectedBursary}
        swipeDirection="down"
        onSwipeComplete={() =>
          setSelectedBursary(null)
        }
        backdropOpacity={0.4}
        style={{ margin: 0 }}
        
      >
        {selectedBursary && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: "#F8FAFC",
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* HERO IMAGE */}
            <View>
              <Image
                source={{
                  uri:
                    selectedBursary.banner ||
                    selectedBursary.logo,
                }}
                style={{
                  width: "100%",
                  height: 280,
                }}
              />

              {/* CLOSE */}
              <TouchableOpacity
                onPress={() =>
                  setSelectedBursary(null)
                }
                style={{
                  position: "absolute",
                  top: 55,
                  left: 20,
                  width: 42,
                  height: 42,
                  borderRadius: 50,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="close"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* LIKE BUTTON */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 55,
                  right: 20,
                  width: 42,
                  height: 42,
                  borderRadius: 50,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* TITLE */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor:
                    "rgba(0,0,0,0.5)",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 26,
                    fontWeight: "800",
                  }}
                >
                  {selectedBursary.name}
                </Text>

                <Text
                  style={{
                    color: "#E5E7EB",
                    marginTop: 4,
                  }}
                >
                  {selectedBursary.type}
                </Text>
              </View>
            </View>

            {/* CONTENT */}
            <View
              style={{
                padding: 18,
              }}
            >
              {/* QUICK INFO */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      "#EEF2FF",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#4338CA",
                      fontWeight: "700",
                    }}
                  >
                    {selectedBursary.type}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor:
                      modalStatus?.status === "Open"
                        ? "#DCFCE7"
                        : modalStatus?.status === "Closing Soon"
                        ? "#FFEDD5"
                        : "#FEE2E2",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={{
                      color:
                        modalStatus?.status === "Open"
                          ? "#166534"
                          : modalStatus?.status === "Closing Soon"
                          ? "#9A3412"
                          : "#DC2626",
                      fontWeight: "700",
                    }}
                  >
                    {modalStatus?.status === "Open"
                      ? "🟢 Open"
                      : modalStatus?.status === "Closing Soon"
                      ? "🟠 Closing Soon"
                      : "🔴 Closed"}
                  </Text>
                </View>
              </View>

              {/* ABOUT */}
              <View
                style={styles.detailsCard}
              >
                <Text
                  style={styles.detailsTitle}
                >
                  About This Bursary
                </Text>

                <Text
                  style={styles.detailsText}
                >
                  {selectedBursary.description ||
                    "Information about this bursary will appear here."}
                </Text>
              </View>

              {/* FUNDS */}
              <View
                style={styles.detailsCard}
              >
                <Text
                  style={styles.detailsTitle}
                >
                  What It Covers
                </Text>

              {Array.isArray(selectedBursary.funds) ? (
                selectedBursary.funds.map(
                  (item, index) => (
                    <Text
                      key={index}
                      style={styles.bulletText}
                    >
                      • {item}
                    </Text>
                  )
                )
              ) : (
                <Text style={styles.bulletText}>
                  {selectedBursary.funds ||
                    "No funding information"}
                </Text>
              )}
              </View>

              {/* REQUIREMENTS */}
              <View
                style={styles.detailsCard}
              >
                <Text
                  style={styles.detailsTitle}
                >
                  Requirements
                </Text>

              {Array.isArray(selectedBursary.requirements) ? (
                selectedBursary.requirements.map(
                  (item, index) => (
                    <Text
                      key={index}
                      style={styles.bulletText}
                    >
                      • {item}
                    </Text>
                  )
                )
              ) : (
                <Text style={styles.bulletText}>
                  {selectedBursary.requirements ||
                    "No requirements available"}
                </Text>
              )}
              </View>

              {/* CONTACT */}
              <View
                style={styles.detailsCard}
              >
                <Text
                  style={styles.detailsTitle}
                >
                  Contact Information
                </Text>

                <Text
                  style={styles.detailsText}
                >
                  📧{" "}
                  {selectedBursary.email ||
                    "Not available"}
                </Text>

                <Text
                  style={styles.detailsText}
                >
                  📞{" "}
                  {selectedBursary.phone ||
                    "Not available"}
                </Text>

                <Text
                  style={styles.detailsText}
                >
                  📍{" "}
                  {selectedBursary.location ||
                    "South Africa"}
                </Text>
              </View>

              {/* APPLY BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  openApplyPage(
                    selectedBursary.link
                  )
                }
                style={{
                  backgroundColor:
                    "#4F46E5",
                  padding: 16,
                  borderRadius: 30,
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
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
  detailsCard: {
  backgroundColor: "#fff",
  padding: 18,
  borderRadius: 22,
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
})