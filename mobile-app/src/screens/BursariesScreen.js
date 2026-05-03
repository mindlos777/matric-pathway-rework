import React, { useState, useMemo } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from "react-native";

import { bursaryData } from "../data/bursaryData";

export default function BursariesScreen() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    type: null,
    status: null,
    emailAutoApply: false,
    fund: null,
  });

  // ---------------- FILTER LOGIC ----------------
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

  return (
    <View style={{ flex: 1, padding: 15 }}>

      {/* SEARCH */}
      <TextInput
        placeholder="Search bursaries..."
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

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No bursaries found
          </Text>
        }
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

            {/* NAME + BADGE */}
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}>
              <Image
                source={{ uri: item.logo }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  marginRight: 8,
                }}
              />

              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name}
              </Text>
            </View>

            <Text>Status: {item.status}</Text>
            <Text>Closing: {item.closingDate}</Text>
            <Text>Funds: {item.funds?.join(", ")}</Text>

            <Text style={{ marginTop: 5 }}>
              {item.requirements}
            </Text>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              onPress={() => {}}
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

            {/* EMAIL AUTO APPLY */}
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

    </View>
  );
}