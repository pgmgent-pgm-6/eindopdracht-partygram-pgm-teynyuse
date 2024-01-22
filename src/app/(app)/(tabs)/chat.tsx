import { createPost } from "@core/modules/posts/api";
import { createStory } from "@core/modules/stories/api";
import DefaultView from "@design/View/DefaultView";
import { Post } from "@core/modules/posts/types";
import { useRouter } from "expo-router";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import PostForm from "@shared/Posts/PostForm";
import StoryForm from "@shared/Stories/StoryForm";
import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const ChatScreen = () => {

  return (
    <DefaultView>
      <Text>Chats</Text>
    </DefaultView>
  );
};

export default ChatScreen;
