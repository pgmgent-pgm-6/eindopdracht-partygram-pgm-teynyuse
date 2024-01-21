import { getLikes } from "@core/modules/likes/api";
import { Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../../Themed";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

type PostLikeProps = {
  postId: number;
};

const PostLikes = ({ postId }: PostLikeProps) => {
  const {
    data: likes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["like", postId],
    queryFn: () => getLikes(postId),
  });

  console.log("likes", likes);

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
        <Text>Loading...</Text>
      </View>
    );
  }

return (
  <View>
    <View style={styles.title}>
      {likes && likes.length > 0 ? (
        <Text>
          Liked by <Text style={styles.username}>{likes.length}</Text> people
        </Text>
      ) : (
        <Text>no likes</Text>
      )}
    </View>
  </View>
);

}


const styles = StyleSheet.create({
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 2,
  },
  title: {
    paddingBottom: 1,
    marginLeft: 12,
    marginRight: 20,
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

export default PostLikes;
