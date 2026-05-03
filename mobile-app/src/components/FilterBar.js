import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function FilterBar({
  search,
  setSearch,
  filters = [],
  activeFilters = {},
  setActiveFilters,
}) {
  const toggleFilter = (key, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* SEARCH (GLOBAL FOR ALL SCREENS) */}
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* FILTER CHIPS */}
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.chip,
              activeFilters[filter.key] === filter.value && styles.activeChip,
            ]}
            onPress={() => toggleFilter(filter.key, filter.value)}
          >
            <Text
              style={{
                color:
                  activeFilters[filter.key] === filter.value
                    ? "#fff"
                    : "#333",
              }}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeChip: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
});