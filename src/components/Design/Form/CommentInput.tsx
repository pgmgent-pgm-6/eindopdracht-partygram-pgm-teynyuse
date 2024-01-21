import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type CommentInputProps = {
  comment?: string;
  postId: number;
  userId: string;
};

const CommentInput = ({comment, postId, userId}:CommentInputProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://placekitten.com/200/200" }}
        />
        <TextInput value={comment} placeholder="Type your comment..." />
      </View>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="chevron-right" size={19} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 3,
    width: "93%",
    height: 45,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20, // Make it circular
    marginRight: 10,
  },
  input: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
  },
  button: {
    padding: 10,
  },
});

export default CommentInput;
