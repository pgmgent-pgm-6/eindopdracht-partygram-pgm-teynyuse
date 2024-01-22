import {
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../Themed";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../core/modules/posts/api";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import PostComments from "@design/Posts/PostComments";
import PostLikes from "@design/Posts/PostLikes";
import moment from "moment";
import CreateLike from "../Shared/Likes/CreateLike";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import CreateComment from "@shared/Comments/CreateComment";
import { getProfile } from "@core/modules/profiles/api";
import { Post } from "@core/modules/posts/types";
import { useRouter } from "expo-router";


const Posts = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getPosts,
    queryKey: ["posts"],
  });

    const handlePostPress = (post: Post) => {
      router.push(`/posts/${post.id}`);
      console.log("test", post.id);
    };


    const {
      data: profile,
    } = useQuery({
      queryKey: ["profile", user?.id ?? ""],
      queryFn: () => getProfile(user?.id ?? ""),
    });

    console.log("profile", profile);


  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {String(error)}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (data && data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No posts found</Text>
      </View>
    );
  }


  const handleSuccess = (responseData) => {
    console.log("Like succesvol aangemaakt of geüpdatet", responseData);
  };

  const updateLike = async (likeData) => {
    try {
      const response = await myApi.updateLike(likeData);
      return response.data;
    } catch (error) {
      console.error("Fout bij het updaten van de like", error);
    }
  };

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
      <FlatList
        data={data}
        style={{ marginBottom: 200, marginTop: 10 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostPress(item)}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.userInfo}>
                <ConditionalImage
                  style={styles.avatar}
                  sourceUri={item.profile.avatar}
                />
                <View style={styles.postInfo}>
                  <Text style={styles.username}>{item.profile.username}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.grayText}>
                  {timeSince(item.created_at)}
                </Text>
              </View>
            </View>
            <ConditionalImage style={styles.image} sourceUri={item.image} />
            <View style={styles.icons}>
              <View style={{ flexDirection: "row" }}>
                <CreateLike
                  onSuccess={handleSuccess}
                  post_id={item.id}
                  liker_id={user?.id ?? ""}
                />
                <Fontisto
                  style={styles.icon}
                  name="comment"
                  size={20}
                  color="black"
                />
              </View>
              <FontAwesome5 name="bookmark" size={20} color="black" />
            </View>
            <PostLikes postId={item.id} />
            <View style={styles.group}>
              <Text style={styles.username}>{item.profile.username}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View>
              <PostComments postId={item.id} />
              <CreateComment
                userAvatar={profile?.avatar ?? ""}
                user_id={user?.id ?? ""}
                initialValues={{ post_id: item.id }}
                label="Create Comment"
                onSuccess={handleSuccess}
              />
            </View>
            <Text style={styles.grayText}>{formatDate(item.created_at)}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

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

export default Posts;
