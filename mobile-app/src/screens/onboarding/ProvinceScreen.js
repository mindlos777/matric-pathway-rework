import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const provinces = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Free State",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

export default function ProvinceScreen({
  navigation,
  route,
}) {
  const [province, setProvince] = useState("");

  const handleFinish = () => {
    if (!province) {
      Alert.alert(
        "Province Required",
        "Please select your province before continuing."
      );
      return;
    }

    navigation.navigate("Done", {
      name: route.params.name,
      hobbies: route.params.hobbies,
      province,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/region.png")} style={styles.image}/>
      <Text style={styles.title}>
        Which province are you in?
      </Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {provinces.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.option,
              province === p && styles.active,
            ]}
            onPress={() => setProvince(p)}
          >
            <Text
              style={[
                styles.optionText,
                province === p && styles.activeText,
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
      >
        <Text style={styles.buttonText}>
          Finish
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
    fontSize:28,
    fontWeight:"700",
    marginBottom:20
  },

  scroll: {
    flex: 1,
  },

  list: {
    paddingBottom: 20,
  },

  option:{
    padding:15,
    borderRadius:20,
    backgroundColor:"#F3F4F6",
    marginBottom:10
  },

  optionText: {
    fontSize: 15,
  },

  active:{
    backgroundColor:"#4F46E5"
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
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

  image: {
    width: "100%",
    height: 270,
    marginVertical: 10,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center"
  },
});