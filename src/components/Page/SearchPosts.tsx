import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "../Themed";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../core/modules/posts/api";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { useRouter } from "expo-router";
import debounce from "lodash/debounce";

const SearchPosts = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPosts(debouncedSearchTerm),
    queryKey: ["posts", debouncedSearchTerm],
    enabled: debouncedSearchTerm.length > 0,
  });

  useEffect(() => {
    const debouncer = debounce((value) => setDebouncedSearchTerm(value), 500);
    debouncer(searchTerm);

    return () => {
      debouncer.cancel();
    };
  }, [searchTerm]);

  const handlePostPress = (post) => {
    router.push(`/posts/${post.id}`);
    console.log("test", post.id);
  };

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
        <Text>No posts found</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Search by description"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          // Filter de resultaten op basis van de zoekterm in de beschrijving
          if (
            item?.description ?? ""
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          ) {
            return (
              <TouchableOpacity onPress={() => handlePostPress(item)}>
                <View style={styles.item}>
                  <Image
                    source={{ uri: item.image || undefined }}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            );
          } else {
            return null; // Verberg de post als deze niet overeenkomt met de zoekterm
          }
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  item: {
    width: "25%",
    padding: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default SearchPosts;
