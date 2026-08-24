import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

export default function AccommodationScreen({
  route,
}) {
  const institution =
    route?.params?.institution || null;

  const accommodations =
    institution?.accommodations || [];

  // ---------------- EMPTY STATE ----------------
  if (accommodations.length === 0) {
    return (
      <View style={styles.emptyContainer}>

        <Text style={styles.emptyTitle}>
          No Accommodation Available
        </Text>

        <Text style={styles.emptyText}>
          We currently do not have accommodation
          information available for this institution.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={accommodations}
      keyExtractor={(item) =>
        item.id?.toString()
      }
      contentContainerStyle={{
        padding: 15,
        paddingTop: 30,
      }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.rating}>
            Rating: {item.rating}/10
          </Text>

          <Text style={styles.text}>
            Location: {item.location}
          </Text>

          <Text style={styles.text}>
            Price: {item.price}
          </Text>

          <Text style={styles.text}>
            Gender: {item.gender}
          </Text>

          <Text style={styles.text}>
            Distance:{" "}
            {item.distanceFromCampus}
          </Text>

          <Text style={styles.text}>
            Contact: {item.contact}
          </Text>

          <Text style={styles.text}>
            Email: {item.email}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  rating: {
    fontWeight: "600",
    color: "#4F46E5",
    marginBottom: 8,
  },

  text: {
    color: "#374151",
    marginBottom: 5,
  },

  description: {
    marginTop: 10,
    lineHeight: 22,
    color: "#4B5563",
  },

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 22,
  },
});