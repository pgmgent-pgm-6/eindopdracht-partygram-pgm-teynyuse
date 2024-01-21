import { getPostComments } from "@core/modules/comments/api";
import { Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "../../Themed";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

type PostCommentsProps = {
    postId: number
}


const PostComments = ({postId}:PostCommentsProps) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comment", postId],
    queryFn: () => getPostComments(postId),
  });

  console.log(comments);


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

    
    return (
      <View>
        <View style={styles.title}>
          {comments && (comments.data?.length ?? 0) > 0 ? (
            <Text>View all {comments.data?.length} comments</Text>
          ) : (
            <Text>no comments</Text>
          )}
        </View>
        <FlatList
          style={{ marginTop: 12 }}
          data={comments?.data?.slice(0, 2) ?? []} // Only the first two comments
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.username}>username</Text>
              <Text style={styles.comment}>{item?.comment ?? ""}</Text>
            </View>
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft:12,
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 2,
  },
  title: {
    borderBottomColor: "#c5c5c5",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginLeft: 12,
    marginRight: 20,
  },
  comment: {
    fontSize: 16,
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


export default PostComments;
