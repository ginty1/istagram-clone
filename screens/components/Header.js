//import liraries
import React from "react";
import { firebase } from "../firebase";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// create a component
const Header = ({ navigation }) => {
  const handleSignOut = () => {
    try {
      firebase.auth().signOut();
      console.log("user just Signed Out");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.logo}
          source={require("../../assets/header-logo.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={require("../../assets/plus.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/like.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.ureadBudge}>
            <Text style={styles.ureadBudgeText}>11</Text>
          </View>
          <Image
            style={styles.icon}
            source={require("../../assets/facebook-messenger.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  ureadBudge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  ureadBudgeText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
});

//make this component available to the app
export default Header;
