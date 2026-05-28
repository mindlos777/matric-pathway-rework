import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function TemplateCard({
  item,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          {item.atsFriendly && (
            <View style={styles.atsBadge}>
              <Text style={styles.atsText}>
                ATS
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>
            Use Template
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },

  atsBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  atsText: {
    color: "#166534",
    fontWeight: "700",
    fontSize: 12,
  },

  category: {
    marginTop: 6,
    color: "#4F46E5",
    fontWeight: "600",
  },

  description: {
    marginTop: 8,
    color: "#6B7280",
    lineHeight: 20,
  },

  button: {
    marginTop: 14,
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});