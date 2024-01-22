import DefaultView from "@design/View/DefaultView";
import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import SearchPosts from "src/components/Page/SearchPosts";

const SearchPost = () => {

  return (
    <DefaultView>
      <Text>Search</Text>
      <SearchPosts />
    </DefaultView>
  );
};

export default SearchPost;
