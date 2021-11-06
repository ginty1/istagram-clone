import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Post from "../components/Post";
import Header from "../components/Header";
import Stories from "../components/Stories";
import { ScrollView } from "react-native-gesture-handler";
import BottomTabs, { bottomTabIcons } from "../../assets/Bottom Tab Icons";
import { firebase, db } from "../firebase";
const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts")
      // .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
