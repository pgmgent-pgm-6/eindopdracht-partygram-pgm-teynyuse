import React from "react";
import { Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../../core/modules/stories/api";
import { useRouter, useNavigation } from "expo-router";
import { Story } from "@core/modules/stories/types";

const StoryItem = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getStories,
    queryKey: ["stories"],
  });

  const handleStoryPress = (story: Story) => {
    router.push(`/stories/${story.id}`);
    console.log("test", story.id);
  };

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
      width: 50,
      height: 50,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: "#FF8501",
    },
    storyText: {
      fontSize: 16,
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
                <Image
                  source={{ uri: item.image || undefined }}
                />
              <Text style={styles.storyText}>{item.user.username}</Text>
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

export default StoryItem;
