import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { universities } from "../data/universityData";
import { bursaryData } from "../data/bursaryData";

export default function NotificationsScreen({ navigation }) {

  // ---------------- DEADLINE TRACKER ----------------
  const deadlines = useMemo(() => {

    const uniDeadlines = universities.map((u) => ({
      id: `uni-${u.id}`,
      type: "University",
      name: u.name,
      date: u.closingDate,
      status: u.status,
      link: u.applyLink,
    }));

    const bursaryDeadlines = bursaryData.map((b) => ({
      id: `b-${b.id}`,
      type: "Bursary",
      name: b.name,
      date: b.closingDate,
      status: b.status,
      link: b.link,
    }));

    return [...uniDeadlines, ...bursaryDeadlines]
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  }, []);

  return (
    <View style={styles.container}>

      {/*<Text style={styles.title}>
        Deadline Tracker
      </Text>

      <Text style={styles.subtitle}>
        Track all institution and bursary deadlines
      </Text>*/}

      <FlatList
        data={deadlines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WebView", {
                url: item.link,
              })
            }
          >

            <View style={styles.topRow}>

              <View>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.type}>
                  {item.type}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      item.status === "Open"
                        ? "#DCFCE7"
                        : "#FEE2E2",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      item.status === "Open"
                        ? "#166534"
                        : "#991B1B",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.deadline}>
              Deadline: {item.date}
            </Text>

            <Text style={styles.openText}>
              Open application page →
            </Text>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  /*title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },*/

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  type: {
    color: "#666",
    marginTop: 4,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  deadline: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "600",
  },

  openText: {
    marginTop: 10,
    color: "#4F46E5",
    fontWeight: "600",
  },
});