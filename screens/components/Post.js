import React from "react";
import { Divider } from "react-native-elements";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postFooterIcons } from "../../ios/data/postFooterIcons";
import { firebase, db } from "../firebase";
const Post = ({ post }) => {
  const handlelike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Documment successfully updated");
      })
      .catch((error) => console.log("Error updating document:", error.message));
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handlelike={handlelike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      margin: 5,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: post.profile_picture }}
        style={styles.profile_picture}
      />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "bold" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 560 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handlelike, post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => handlelike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(firebase.auth().currentUser)
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon
        imageStyle={[styles.footerIcon, styles.message]}
        imgUrl={postFooterIcons[1].imageUrl}
      />
      <Icon
        imageStyle={[styles.footerIcon, styles.send]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
  </View>
);

const Icon = ({ imageStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);
const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 2 }}>
    <Text style={{ color: "#FFF", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);
const Caption = ({ post }) => (
  <View style={{ marginTop: 4 }}>
    <Text style={{ color: "#FFF" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {/* if true (comments exits continue with length determination if false (do nothing)) */}
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        {/* if comments are more than 1 render View all and length 
        otherwise render 'View' comment as 1 'View 1'  */}
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {/* if are comments render 'comments' or just "comment" for a single comment */}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);
// A.) 0 comments Don't render commponent
// B.) 1 comment render component without 'all' and a singular comment
// C.) 2 comments render component with 'all' : 'comments'
const styles = StyleSheet.create({
  profile_picture: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  message: {
    height: 27,
    width: 27,
  },
  send: {
    width: 36,
  },
});
export default Post;
