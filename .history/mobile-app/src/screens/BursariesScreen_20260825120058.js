import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import RNModal from "react-native-modal";

import SearchFilterBar from "../components/FilterBar";
import { getBursaries } from "../services/bursaryServic";

export default function BursariesScreen({
  navigation,
}) {
  // ================= STATE =================

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedBursary, setSelectedBursary] =
    useState(null);

  const [bursaries, setBursaries] =
    useState([]);

  const [loadingBursaries, setLoadingBursaries] =
    useState(true);

  const [filters, setFilters] = useState({
    type: null,
    status: null,
    field: null,
    fund: null,
  });

  // ================= LOAD FIRESTORE DATA =================

  useEffect(() => {
    loadBursaries();
  }, []);

  const loadBursaries = async () => {
    try {
      setLoadingBursaries(true);

      const data = await getBursaries();

      setBursaries(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.log(
        "Error loading bursaries:",
        error
      );

      setBursaries([]);
    } finally {
      setLoadingBursaries(false);
    }
  };

  // ================= STATUS TRACKER =================

  const computeBursaryStatus = (
    bursary
  ) => {
    const today = new Date();

    // Rolling / ongoing bursaries
    if (
      bursary.closingDate === "Rolling" ||
      bursary.closingDate === "Ongoing"
    ) {
      return {
        status: "Open",
        isOpen: true,
        closingSoon: false,
        daysLeft: null,
      };
    }

    const openDate =
      bursary.openingDate
        ? new Date(bursary.openingDate)
        : null;

    const closeDate =
      bursary.closingDate
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

    const daysLeft = Math.max(
      0,
      Math.ceil(
        (closeDate - today) /
          (1000 * 60 * 60 * 24)
      )
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

  // ================= MODAL STATUS =================

  const modalStatus =
    selectedBursary
      ? computeBursaryStatus(
          selectedBursary
        )
      : null;

  // ================= FIELD OPTIONS =================

  const availableFields = useMemo(() => {
    const fields = new Set();

    bursaries.forEach((bursary) => {
      (
        bursary.fieldsCovered || []
      ).forEach((field) => {
        fields.add(field);
      });
    });

    return [...fields].sort();
  }, [bursaries]);

  // ================= FILTER =================

  const filtered = useMemo(() => {
    return bursaries.filter(
      (bursary) => {
        // SEARCH
        const matchSearch =
          String(
            bursary.name || ""
          )
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        // STATUS
        const computedStatus =
          computeBursaryStatus(
            bursary
          ).status;

        const matchStatus =
          !filters.status ||
          computedStatus ===
            filters.status;

        // FUND
        const matchFund =
          !filters.fund ||
          bursary.funds?.includes(
            filters.fund
          );

        // FIELD
        const matchField =
          !filters.field ||
          bursary.fieldsCovered?.includes(
            filters.field
          );

        // TYPE
        const matchType =
          !filters.type ||
          bursary.type ===
            filters.type;

        return (
          matchSearch &&
          matchStatus &&
          matchFund &&
          matchField &&
          matchType
        );
      }
    );
  }, [
    bursaries,
    search,
    filters,
  ]);

  // ================= TOGGLE FILTER =================

  const toggle = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,

      [key]:
        prev[key] === value
          ? null
          : value,
    }));
  };

  // ================= OPEN WEBVIEW =================

  const openApplyPage = (url) => {
    if (!url) {
      Alert.alert(
        "Application Link",
        "No application link is available."
      );
      return;
    }

    try {
      const parsed = new URL(url);

      if (
        parsed.protocol !==
        "https:"
      ) {
        Alert.alert(
          "Invalid Link",
          "Only HTTPS links are allowed."
        );
        return;
      }

      navigation.navigate(
        "WebViewScreen",
        {
          url,
        }
      );
    } catch {
      Alert.alert(
        "Invalid Link",
        "This application link is invalid."
      );
    }
  };

  // ================= LOADING =================

  if (loadingBursaries) {
    return (
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading bursaries...
        </Text>
      </View>
    );
  }

  // ================= UI =================

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#F9FAFB",
      }}
    >
      {/* SEARCH */}

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() =>
          setShowFilters(true)
        }
        placeholder="Search bursaries..."
      />

      {/* TEMPLATES */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Templates"
          )
        }
        style={{
          backgroundColor: "#111",
          padding: 10,
          borderRadius: 28,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Templates (CV & Email)
        </Text>
      </TouchableOpacity>

      {/* ================= BURSARY LIST ================= */}

      <FlatList
        data={filtered}
        keyExtractor={(
          item,
          index
        ) =>
          item.id?.toString() ||
          item.name ||
          index.toString()
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <View
            style={
              styles.emptyContainer
            }
          >
            <Ionicons
              name="document-text-outline"
              size={45}
              color="#9CA3AF"
            />

            <Text
              style={
                styles.emptyText
              }
            >
              No bursaries found.
            </Text>
          </View>
        }
        renderItem={({
          item,
        }) => {
          const {
            status,
            isOpen,
            closingSoon,
            daysLeft,
          } =
            computeBursaryStatus(
              item
            );

          return (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                console.log(
                  "Pressed:",
                  item.name
                );

                setSelectedBursary(
                  item
                );
              }}
              style={
                styles.bursaryCard
              }
            >
              {/* TOP ROW */}

              <View
                style={
                  styles.topRow
                }
              >
                {/* LOGO */}

                <Image
                  source={{
                    uri:
                      item.logo ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
                  }}
                  style={
                    styles.logo
                  }
                />

                {/* INFO */}

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.bursaryName
                    }
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={
                      styles.bursaryType
                    }
                  >
                    {item.type}
                  </Text>
                </View>

                {/* APPLY */}

                <TouchableOpacity
                  onPress={() =>
                    openApplyPage(
                      item.link
                    )
                  }
                  style={
                    styles.applySmall
                  }
                >
                  <Text
                    style={
                      styles.applySmallText
                    }
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>

              {/* STATUS */}

              <View
                style={
                  styles.statusRow
                }
              >
                <Text
                  style={{
                    fontWeight:
                      "700",

                    color:
                      closingSoon
                        ? "#EA580C"
                        : isOpen
                        ? "#16A34A"
                        : "#DC2626",
                  }}
                >
                  {status ===
                  "Closing Soon"
                    ? "🟠 Closing Soon"
                    : status ===
                      "Open"
                    ? "🟢 Open"
                    : "🔴 Closed"}
                </Text>

                {daysLeft !==
                  null &&
                  daysLeft > 0 && (
                    <Text
                      style={{
                        marginLeft: 12,
                        color:
                          "#6B7280",
                      }}
                    >
                      Closes in{" "}
                      {daysLeft}{" "}
                      days
                    </Text>
                  )}

                <Text
                  style={
                    styles.readMore
                  }
                >
                  Read more →
                </Text>
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
        <View
          style={
            styles.filterOverlay
          }
        >
          <ScrollView
            style={
              styles.filterContainer
            }
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={
              false
            }
          >
            {/* HEADER */}

            <View
              style={
                styles.filterHeader
              }
            >
              <Text
                style={
                  styles.filterTitle
                }
              >
                Filters
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowFilters(
                    false
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* TYPE */}

            <Text
              style={
                styles.filterLabel
              }
            >
              Type
            </Text>

            {[
              "Government",
              "Private",
              "NGO",
            ].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() =>
                  toggle(
                    "type",
                    type
                  )
                }
                style={[
                  styles.filterOption,
                  {
                    backgroundColor:
                      filters.type ===
                      type
                        ? "#4F46E5"
                        : "#eee",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      filters.type ===
                      type
                        ? "#fff"
                        : "#000",
                  }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}

            {/* FIELD */}

            <Text
              style={
                styles.filterLabel
              }
            >
              Field of Study
            </Text>

            <View
              style={{
                flexDirection:
                  "row",
                flexWrap:
                  "wrap",
                marginTop: 8,
              }}
            >
              {availableFields
                .slice(0, 30)
                .map(
                  (field) => (
                    <TouchableOpacity
                      key={
                        field
                      }
                      onPress={() =>
                        toggle(
                          "field",
                          field
                        )
                      }
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginRight: 8,
                        marginBottom: 8,
                        backgroundColor:
                          filters.field ===
                          field
                            ? "#4F46E5"
                            : "#eee",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            filters.field ===
                            field
                              ? "#fff"
                              : "#000",
                        }}
                      >
                        {
                          field
                        }
                      </Text>
                    </TouchableOpacity>
                  )
                )}
            </View>

            {/* STATUS */}

            <Text
              style={
                styles.filterLabel
              }
            >
              Status
            </Text>

            {[
              "Open",
              "Closing Soon",
              "Closed",
            ].map(
              (status) => (
                <TouchableOpacity
                  key={
                    status
                  }
                  onPress={() =>
                    toggle(
                      "status",
                      status
                    )
                  }
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        filters.status ===
                        status
                          ? "#4F46E5"
                          : "#eee",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        filters.status ===
                        status
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    {
                      status
                    }
                  </Text>
                </TouchableOpacity>
              )
            )}

            {/* APPLY */}

            <TouchableOpacity
              onPress={() =>
                setShowFilters(
                  false
                )
              }
              style={
                styles.applyFilterBtn
              }
            >
              <Text
                style={
                  styles.applyFilterText
                }
              >
                Apply Filters
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* ================= BURSARY DETAILS ================= */}

      <RNModal
        isVisible={
          !!selectedBursary
        }
        swipeDirection="down"
        onSwipeComplete={() =>
          setSelectedBursary(
            null
          )
        }
        propagateSwipe
        backdropOpacity={0.4}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{
          margin: 0,
          justifyContent:
            "flex-end",
        }}
      >
        {selectedBursary && (
          <ScrollView
            style={
              styles.modalContainer
            }
            showsVerticalScrollIndicator={
              false
            }
          >
            {/* SWIPE HANDLE */}

            <View
              style={
                styles.swipeHandleContainer
              }
            >
              <View
                style={
                  styles.swipeHandle
                }
              />
            </View>

            {/* HERO */}

            <View>
              <Image
                source={{
                  uri:
                    selectedBursary.banner ||
                    selectedBursary.logo,
                }}
                style={
                  styles.heroImage
                }
              />

              {/* CLOSE */}

              <TouchableOpacity
                onPress={() =>
                  setSelectedBursary(
                    null
                  )
                }
                style={
                  styles.closeButton
                }
              >
                <Ionicons
                  name="close"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* TITLE */}

              <View
                style={
                  styles.heroOverlay
                }
              >
                <Text
                  style={
                    styles.heroTitle
                  }
                >
                  {
                    selectedBursary.name
                  }
                </Text>

                <Text
                  style={
                    styles.heroType
                  }
                >
                  {
                    selectedBursary.type
                  }
                </Text>

                <Text
                  numberOfLines={
                    1
                  }
                  style={
                    styles.heroFields
                  }
                >
                  {(
                    selectedBursary.fieldsCovered ||
                    []
                  )
                    .slice(
                      0,
                      2
                    )
                    .join(
                      ", "
                    )}
                </Text>
              </View>
            </View>

            {/* CONTENT */}

            <View
              style={
                styles.detailsContent
              }
            >
              {/* QUICK INFO */}

              <View
                style={
                  styles.quickInfo
                }
              >
                <View
                  style={
                    styles.infoPill
                  }
                >
                  <Text
                    style={
                      styles.infoPillText
                    }
                  >
                    {
                      selectedBursary.type
                    }
                  </Text>
                </View>

                <View
                  style={[
                    styles.infoPill,
                    {
                      backgroundColor:
                        modalStatus?.status ===
                        "Open"
                          ? "#DCFCE7"
                          : modalStatus?.status ===
                            "Closing Soon"
                          ? "#FFEDD5"
                          : "#FEE2E2",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        modalStatus?.status ===
                        "Open"
                          ? "#166534"
                          : modalStatus?.status ===
                            "Closing Soon"
                          ? "#9A3412"
                          : "#DC2626",

                      fontWeight:
                        "700",
                    }}
                  >
                    {modalStatus?.status ===
                    "Open"
                      ? "🟢 Open"
                      : modalStatus?.status ===
                        "Closing Soon"
                      ? "🟠 Closing Soon"
                      : "🔴 Closed"}
                  </Text>
                </View>
              </View>

              {/* ABOUT */}

              <View
                style={
                  styles.detailsCard
                }
              >
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  About This Bursary
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  {selectedBursary.description ||
                    "Information about this bursary will appear here."}
                </Text>
              </View>

              {/* FUNDS */}

              <View
                style={
                  styles.detailsCard
                }
              >
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  What It Covers
                </Text>

                {Array.isArray(
                  selectedBursary.funds
                ) ? (
                  selectedBursary.funds.map(
                    (
                      item,
                      index
                    ) => (
                      <Text
                        key={
                          index
                        }
                        style={
                          styles.bulletText
                        }
                      >
                        •{" "}
                        {item}
                      </Text>
                    )
                  )
                ) : (
                  <Text
                    style={
                      styles.bulletText
                    }
                  >
                    {selectedBursary.funds ||
                      "No funding information"}
                  </Text>
                )}
              </View>

              {/* REQUIREMENTS */}

              <View
                style={
                  styles.detailsCard
                }
              >
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Requirements
                </Text>

                {Array.isArray(
                  selectedBursary.requirements
                ) ? (
                  selectedBursary.requirements.map(
                    (
                      item,
                      index
                    ) => (
                      <Text
                        key={
                          index
                        }
                        style={
                          styles.bulletText
                        }
                      >
                        •{" "}
                        {item}
                      </Text>
                    )
                  )
                ) : (
                  <Text
                    style={
                      styles.bulletText
                    }
                  >
                    {selectedBursary.requirements ||
                      "No requirements available"}
                  </Text>
                )}
              </View>

              {/* FIELDS */}

              <View
                style={
                  styles.detailsCard
                }
              >
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Fields Covered
                </Text>

                {(
                  selectedBursary.fieldsCovered ||
                  []
                ).map(
                  (
                    field,
                    index
                  ) => (
                    <Text
                      key={`field-${index}`}
                      style={
                        styles.bulletText
                      }
                    >
                      •{" "}
                      {field}
                    </Text>
                  )
                )}
              </View>

              {/* CONTACT */}

              <View
                style={
                  styles.detailsCard
                }
              >
                <Text
                  style={
                    styles.detailsTitle
                  }
                >
                  Contact Information
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  📧{" "}
                  {selectedBursary.email ||
                    "Not available"}
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  📞{" "}
                  {selectedBursary.phone ||
                    "Not available"}
                </Text>

                <Text
                  style={
                    styles.detailsText
                  }
                >
                  📍{" "}
                  {selectedBursary.location ||
                    "South Africa"}
                </Text>
              </View>

              {/* APPLY */}

              <TouchableOpacity
                onPress={() =>
                  openApplyPage(
                    selectedBursary.link
                  )
                }
                style={
                  styles.applyButton
                }
              >
                <Text
                  style={
                    styles.applyButtonText
                  }
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

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        "#F9FAFB",
    },

    loadingText: {
      marginTop: 12,
      color: "#6B7280",
    },

    emptyContainer: {
      alignItems:
        "center",
      marginTop: 50,
    },

    emptyText: {
      marginTop: 10,
      color: "#9CA3AF",
      fontSize: 15,
    },

    bursaryCard: {
      backgroundColor:
        "#fff",
      borderRadius: 30,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor:
        "#ECECEC",
    },

    topRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    logo: {
      width: 58,
      height: 58,
      borderRadius: 16,
      marginRight: 12,
      backgroundColor:
        "#F3F4F6",
    },

    bursaryName: {
      fontWeight:
        "800",
      fontSize: 16,
      color: "#111827",
    },

    bursaryType: {
      color: "#6B7280",
      marginTop: 2,
    },

    applySmall: {
      backgroundColor:
        "#4F46E5",
      paddingHorizontal:
        18,
      paddingVertical: 10,
      borderRadius: 25,
    },

    applySmallText: {
      color: "#fff",
      fontWeight:
        "700",
    },

    statusRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginTop: 14,
      flexWrap:
        "wrap",
    },

    readMore: {
      marginLeft: 12,
      color: "#4F46E5",
      fontWeight:
        "700",
    },

    filterOverlay: {
      flex: 1,
      justifyContent:
        "flex-end",
      backgroundColor:
        "rgba(0,0,0,0.4)",
    },

    filterContainer: {
      backgroundColor:
        "#fff",
      borderTopLeftRadius:
        20,
      borderTopRightRadius:
        20,
      maxHeight: "85%",
    },

    filterHeader: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
    },

    filterTitle: {
      fontSize: 18,
      fontWeight:
        "bold",
    },

    filterLabel: {
      fontWeight:
        "bold",
      marginTop: 15,
    },

    filterOption: {
      padding: 10,
      marginTop: 5,
      borderRadius: 8,
    },

    applyFilterBtn: {
      marginTop: 20,
      backgroundColor:
        "#4F46E5",
      padding: 15,
      borderRadius: 10,
    },

    applyFilterText: {
      color: "#fff",
      textAlign:
        "center",
      fontWeight:
        "700",
    },

    modalContainer: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
      borderTopLeftRadius:
        28,
      borderTopRightRadius:
        28,
    },

    swipeHandleContainer: {
      alignItems:
        "center",
      paddingTop: 10,
      paddingBottom: 6,
    },

    swipeHandle: {
      width: 50,
      height: 5,
      borderRadius: 999,
      backgroundColor:
        "#D1D5DB",
    },

    heroImage: {
      width: "100%",
      height: 280,
    },

    closeButton: {
      position:
        "absolute",
      top: 55,
      left: 20,
      width: 42,
      height: 42,
      borderRadius: 50,
      backgroundColor:
        "rgba(0,0,0,0.45)",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    heroOverlay: {
      position:
        "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor:
        "rgba(0,0,0,0.5)",
      padding: 20,
    },

    heroTitle: {
      color: "#fff",
      fontSize: 26,
      fontWeight:
        "800",
    },

    heroType: {
      color: "#E5E7EB",
      marginTop: 4,
    },

    heroFields: {
      color: "#E5E7EB",
      marginTop: 4,
      fontSize: 13,
    },

    detailsContent: {
      padding: 18,
    },

    quickInfo: {
      flexDirection:
        "row",
      flexWrap:
        "wrap",
      gap: 10,
      marginBottom: 18,
    },

    infoPill: {
      backgroundColor:
        "#EEF2FF",
      paddingHorizontal:
        14,
      paddingVertical: 10,
      borderRadius: 30,
    },

    infoPillText: {
      color: "#4338CA",
      fontWeight:
        "700",
    },

    detailsCard: {
      backgroundColor:
        "#fff",
      padding: 18,
      borderRadius: 22,
      marginBottom: 16,
    },

    detailsTitle: {
      fontSize: 18,
      fontWeight:
        "800",
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

    applyButton: {
      backgroundColor:
        "#4F46E5",
      padding: 16,
      borderRadius: 30,
      marginBottom: 40,
    },

    applyButtonText: {
      color: "#fff",
      textAlign:
        "center",
      fontWeight:
        "700",
    },
  });