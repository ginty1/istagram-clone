import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddNewPost from "./components/newpost/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({});
