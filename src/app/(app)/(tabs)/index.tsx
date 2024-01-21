import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import StoryBar from "../../../components/Design/Story/StoryBar";
import Posts from "../../../components/Page/posts";


const HomeScreen = () => {


  return (
    <View>
      <StoryBar />
      <Posts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default HomeScreen;