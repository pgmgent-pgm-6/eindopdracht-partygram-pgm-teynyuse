import { createPost } from "@core/modules/posts/api";
import { createStory } from "@core/modules/stories/api";
import DefaultView from "@design/View/DefaultView";
import { Post } from "@core/modules/posts/types";
import { useRouter } from "expo-router";
import useTitle from "@core/hooks/useTitle";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import PostForm from "@shared/Posts/PostForm";
import StoryForm from "@shared/Stories/StoryForm";
import React, { useState } from "react";
import { Text, View, Button } from "react-native";
const CreatePost = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isPostFormActive, setIsPostFormActive] = useState(true); 

  const toggleForm = () => {
    setIsPostFormActive(!isPostFormActive);
  };

  const createPostWithUser = async (post:Post) => {
    const postWithUser = { ...post, owner_id: user?.id };
    return createPost(postWithUser);
  };

  const handlePostSuccess = (data: Post) => {
    alert("Post created successfully!");
    router.push("/profile");
  };

  const createStoryWithUser = async (story:any) => {
    const storyWithUser = { ...story, owner_id: user?.id };
    return createStory(storyWithUser);
  };

  const handleStorySuccess = (data: any) => {
    alert("Story created successfully!");
    router.push("/");
  };

  return (
    <DefaultView>
      <Button
        onPress={toggleForm}
        title={isPostFormActive ? "Create story" : "Create post"}
      />
      {isPostFormActive ? (
        <PostForm
          initialValues={{ description: ""}}
          onSuccess={handlePostSuccess}
          updateMethod={createPostWithUser}
          label="Create Post"
          user={""}
        />
      ) : (
        <StoryForm
          onSuccess={handleStorySuccess}
          updateMethod={createStoryWithUser}
          label="Create Story"
          user={""}
          initialValues={{ owner_id: user?.id }}
        />
      )}
    </DefaultView>
  );
};

export default CreatePost;
