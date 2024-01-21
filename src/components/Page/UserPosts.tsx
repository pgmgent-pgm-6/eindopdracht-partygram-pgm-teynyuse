import React, { useState, useEffect } from "react";
import { Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../Themed";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../core/modules/posts/api";
import { useRouter } from "expo-router";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

const UserPosts = () => {
  const { user } = useAuthContext();

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
          <View style={styles.item}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
    </View>
  );
};

export default UserPosts;
