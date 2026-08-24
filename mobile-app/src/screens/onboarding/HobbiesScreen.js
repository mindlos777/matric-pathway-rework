import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const hobbiesList = [
  "Technology",
  "Gaming",
  "Sports",
  "Reading",
  "Music",
  "Business",
  "Art",
];

export default function HobbiesScreen({
  navigation,
  route,
}) {
  const [selected, setSelected] =
    useState([]);

  const toggleHobby = (hobby) => {
    if (selected.includes(hobby)) {
      setSelected(
        selected.filter(
          (h) => h !== hobby
        )
      );
    } else {
      setSelected([
        ...selected,
        hobby,
      ]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      Alert.alert(
        "Select a Hobby",
        "Choose at least one hobby or tap Skip."
      );
      return;
    }

    navigation.navigate("Province", {
      name: route.params.name,
      hobbies: selected,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/hobies.png")} style={styles.image}/>
      <Text style={styles.title}>
        Favourite hobbies?
      </Text>

      <View style={styles.list}>
        {hobbiesList.map((hobby) => (
          <TouchableOpacity
            key={hobby}
            style={[
              styles.option,
              selected.includes(hobby) && styles.active,
            ]}
            onPress={() => toggleHobby(hobby)}
          >
            <Text style={styles.optionText}>{hobby}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Province",
            {
              name: route.params.name,
              hobbies: [],
            }
          )
        }
      >
        <Text style={styles.skip}>
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:25,
    backgroundColor:"#fff"
  },

  title:{
    textAlign:"center",
    fontSize:28,
    fontWeight:"700",
    marginBottom:20
  },

  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    margin: 5,
  },

  optionText: {
    fontSize: 14,
    fontWeight: "500",
  },

  active: {
    backgroundColor: "#4F46E5",
  },

  activeText: {
    color: "#fff",
  },

  button:{
    backgroundColor:"#4F46E5",
    padding:15,
    borderRadius:28,
    marginTop:20
  },

  buttonText:{
    color:"#fff",
    textAlign:"center"
  },

  skip:{
    textAlign:"center",
    marginTop:15
  },

  image: {
    width: "100%",
    height: 270,
    marginVertical: 10,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center"
  },
});