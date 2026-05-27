import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchFilterBar({
  search,
  setSearch,
  onFilterPress,
  placeholder = "Search...",
}) {
  return (
    <View style={styles.container}>
      {/* SEARCH INPUT */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#6B7280"
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>

      {/* FILTER BUTTON ONLY IF PROVIDED */}
      {onFilterPress && (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={onFilterPress}
        >
          <Ionicons
            name="options-outline"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },

  filterBtn: {
    marginLeft: 10,
    backgroundColor: "#000000",
    width: 52,
    height: 52,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});