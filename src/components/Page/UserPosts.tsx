import React, { useState, useEffect } from "react";
import { Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../core/modules/posts/api";
import { useRouter } from "expo-router";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { Post } from "@core/modules/posts/types";

const UserPosts = () => {
  const { user } = useAuthContext();
  const router = useRouter();

      const handlePostPress = (post: Post) => {
        router.push(`/posts/${post.id}`);
        console.log("test", post.id);
      };

    const {
      data: posts,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["posts", user?.id ?? ""],
      queryFn: () => getUserPosts(user?.id ?? ""),
    });

    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (isError) {
      return <Text>Error: {error.message}</Text>;
    }



  const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: "row",
    numColumns: 4,
    },
    item: {
    width: "25%",
    padding: 2,
    },
    image: {
    width: 100,
    height: 100,
    },
});

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostPress(item)}>
          <View style={styles.item}>
            <Image
                source={{ uri: item.image || undefined }}
              style={styles.image}
            />
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
    </View>
  );
};

export default UserPosts;
