import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import StoryBar from "../../../components/Design/Story/StoryBar";
import Posts from "../../../components/Page/posts";
import { useRouter } from "expo-router";
import { logout } from "@core/modules/auth/api";



const HomeScreen = () => {
    const router = useRouter();


  return (
    <View>
      <TouchableOpacity  onPress={() => logout()}>
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
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