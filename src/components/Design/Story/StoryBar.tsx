import React from "react";
import { Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../../core/modules/stories/api";
import { useRouter, useNavigation } from "expo-router";
import { Story } from "@core/modules/stories/types";

const StoryBar = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getStories,
    queryKey: ["stories"],
  });

  const handleStoryPress = (story: Story) => {
    router.push(`/stories/${story.id}`);
    console.log("test",story.id);
  }

  const styles = StyleSheet.create({
    centeredView: {
      alignItems: "center",
      justifyContent: "center",
    },
    storyContainer: {
      alignItems: "center",
      marginHorizontal: 5,
    },
    storyImage: {
      width: 75,
      height: 75,
      borderRadius: 50,
      borderWidth: 3,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#FF8501",
    },
    storyInside: {
      width: 70,
      height: 70,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
    },
    storyText: {
      fontSize: 15,
      textAlign: "center",
    },
    contentContainer: {
      paddingVertical: 10,
    },
  });

  if (isError) {
    return (
      <View>
        <Text>Error: {String(error)}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (data && data.length === 0) {
    return (
      <View>
        <Text>No stories found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.storyContainer}>
            <TouchableOpacity onPress={() => handleStoryPress(item)}>
              <View style={styles.storyImage}>
                <Image
                  style={styles.storyInside}
                  source={{ uri: item.image || undefined }}
                />
              </View>
              <Text style={styles.storyText}>{item.profile.username}</Text>
            </TouchableOpacity>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default StoryBar;
