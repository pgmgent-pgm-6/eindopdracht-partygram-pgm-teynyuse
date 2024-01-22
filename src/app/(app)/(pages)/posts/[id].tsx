import { getPost } from "@core/modules/posts/api";
import { Post, PostWithRelations } from "@core/modules/posts/types";
import Divider from "@design/List/Divider";
import DefaultView from "@design/View/DefaultView";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import Button from "@design/Button/Button";
import { Text, View, Image } from "react-native";
import { useState } from "react";


enum ListType {
  Header = "header",
  Button = "button",
}

type ListItem = {
  type?: ListType;
  [key: string]: any;
};

const PostDetailScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<PostWithRelations | null>(null);


  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPost(id);
      setPost(postData);
    };
    fetchPost();
  }, []);


  return (
    <View>
      <Image 
      source={{ uri: post?.image || "" }}
      />
      <Text>
        {post?.description}
      </Text>
    </View>
  );
};

export default PostDetailScreen;
