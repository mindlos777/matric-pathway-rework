import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import SearchFilterBar from "../components/FilterBar";
import TemplateCard from "../components/TemplateCard";

import { emailTemplates } from "../data/emailTemplates";

const categories = [
  "All",
  "Professional",
  "Formal",
  "Student",
  "Internship",
  "Bursary",
];

export default function EmailTemplatesScreen({
  navigation,
}) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // ================= FILTER =================
  const filteredTemplates = useMemo(() => {
    let list = [...emailTemplates];

    // SEARCH
    if (search.trim()) {
      list = list.filter((template) =>
        template.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // CATEGORY
    if (selectedCategory !== "All") {
      list = list.filter(
        (template) =>
          template.category === selectedCategory
      );
    }

    return list;
  }, [search, selectedCategory]);

  // ================= OPEN TEMPLATE =================
  const openTemplate = (template) => {
    navigation.navigate("EmailEditor", {
      template,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>
        Email Templates
      </Text>

      <Text style={styles.subtitle}>
        Choose a professional email template
      </Text>

      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        placeholder="Search email templates..."
      />

      {/* CATEGORIES */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        renderItem={({ item }) => {
          const active =
            selectedCategory === item;

          return (
            <TouchableOpacity
              onPress={() =>
                setSelectedCategory(item)
              }
              style={[
                styles.categoryBtn,
                active &&
                  styles.activeCategoryBtn,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  active &&
                    styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* TEMPLATE LIST */}
      <FlatList
        data={filteredTemplates}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <TemplateCard
            item={item}
            onPress={() =>
              openTemplate(item)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 50,
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#6B7280",
    fontSize: 15,
  },

  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 30,
    height: 42,
    justifyContent: "center",
  },

  activeCategoryBtn: {
    backgroundColor: "#4F46E5",
  },

  categoryText: {
    color: "#111827",
    fontWeight: "600",
  },

  activeCategoryText: {
    color: "#fff",
  },
});