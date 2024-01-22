import { getPost } from "@core/modules/posts/api";
import { Post, PostWithRelations } from "@core/modules/posts/types";
import Divider from "@design/List/Divider";
import DefaultView from "@design/View/DefaultView";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import Button from "@design/Button/Button";
import { Text, View, Image,   StyleSheet, } from "react-native";
import { useState } from "react";
import moment from "moment";
import DeletePostDialog from "@shared/Posts/Delete/DeletePostDialog";
import HeaderButton from "@design/Button/HeaderButton";
import { useQueryClient } from "@tanstack/react-query";
import useTitle from "@core/hooks/useTitle";


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
  const [showDelete, setShowDelete] = useState(false);
 const queryClient = useQueryClient();
  const [post, setPost] = useState<PostWithRelations | null>(null);

   useTitle(post?.description || "Post detail");

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButton
            onPress={() => setShowDelete(true)}
            title="Delete log"
            icon="trash-can"
          />
        ),
      });
    }, [navigation]);

      const handleDelete = () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      };


  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPost(id);
      setPost(postData);
    };
    fetchPost();
  }, []);

  console.log("post", post);

    const ConditionalImage = ({ style, sourceUri }) => {
      if (!sourceUri) {
        return <View style={[style, { backgroundColor: "black" }]} />;
      }
      return <Image style={style} source={{ uri: sourceUri }} />;
    };

    const formatDate = (dateString) => {
      return moment(dateString).format("DD MMM YYYY");
    };

    const timeSince = (dateString) => {
      return moment(dateString).fromNow();
    };


  return (
    <View>
      <ConditionalImage style={styles.image} sourceUri={post?.image} />
      <Text>{post?.description}</Text>
      <Text>{post?.location}</Text>
      {showDelete && (
        <DeletePostDialog
          id={parseInt(id)}
          onDelete={handleDelete}
          onDismiss={() => setShowDelete(false)}
        />
      )}
    </View>
  );
};

export default PostDetailScreen;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      borderRadius: 12,
      marginVertical: 10,
      shadowColor: "#c5c5c5",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingBottom: 15,
    },
    grayText: {
      fontSize: 15,
      marginLeft: 12,
      color: "#808080",
    },
    icons: {
      marginTop: 2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
    },
    icon: {
      marginRight: 10,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: 12,
    },
    postInfo: {
      flexDirection: "column",
      textAlign: "left",
      justifyContent: "space-between",
      padding: 5,
    },
    image: {
      width: "100%",
      height: 300,
      resizeMode: "cover",
    },
    group: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 12,
    },
    description: {
      fontSize: 18,
      color: "#333",
      padding: 5,
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 25,
      marginRight: 12,
    },
    username: {
      fontWeight: "bold",
      fontSize: 17,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: "red",
    },
  });