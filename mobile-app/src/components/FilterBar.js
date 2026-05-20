import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchFilterBar({
  search,
  setSearch,
  onFilterPress,
  placeholder = "Search",
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      }}
    >

      {/* SEARCH */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          borderRadius: 30,
          paddingHorizontal: 15,
          height: 52,
          marginRight: 10,

          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: 2,
          },

          elevation: 2,
        }}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 15,
            color: "#111",
          }}
        />
      </View>

      {/* FILTER BUTTON */}
      <TouchableOpacity
        onPress={onFilterPress}
        activeOpacity={0.8}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: "#111",
          justifyContent: "center",
          alignItems: "center",

          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: {
            width: 0,
            height: 3,
          },

          elevation: 4,
        }}
      >
        <Ionicons
          name="options-outline"
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

    </View>
  );
}