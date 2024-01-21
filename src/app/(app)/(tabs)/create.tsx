import { createPost } from "@core/modules/posts/api";
import DefaultView from "@design/View/DefaultView";
import { Post } from "@core/modules/posts/types";
import { useRouter } from "expo-router";
import useTitle from "@core/hooks/useTitle";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import PostForm from "@shared/Posts/PostForm";

const CreatePost = () => {  
  useTitle("Create post");
  const { user } = useAuthContext();
  const router = useRouter();

    const createPostWithUser = async (post) => {
      const postWithUser = { ...post, owner_id: user.id };
      return createPost(postWithUser);
    };

      const handleSuccess = (data: Post) => {
        alert("Post created successfully!");
        router.push("/profile");
      };

  return (
    <DefaultView>
      <PostForm
        initialValues={{ description: "" }}
        onSuccess={handleSuccess}
        updateMethod={createPostWithUser}
        label="Create Post" user={""}      />
    </DefaultView>
  );
};

export default CreatePost;
