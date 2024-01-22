import { supabase } from "../../api/supabase";
import { Comment, CreateCommentBody, UpdateCommentBody } from "./types";

export const getPostComments = async (postId: number) => {
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("post_id", postId)
  return { data, error };
};

export const createComment = async (comment: CreateCommentBody) => {
  const response = await supabase
    .from("Comments")
    .insert(comment)
    .select()
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};



