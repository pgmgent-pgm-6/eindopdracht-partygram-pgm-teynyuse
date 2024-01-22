import { supabase } from "../../api/supabase";
import { Post, CreatePostBody, UpdatePostBody, PostWithRelations } from "./types";

export const getPosts = async (): Promise<PostWithRelations[]> => {
  const { data, error } = await supabase
    .from("Posts")
    .select(`*, profile:Profiles (username, avatar, user_id)`)
    .order("created_at", { ascending: false});
  if (error) throw error;
  return data ?? [];
};

export const getPost = async (id: string): Promise<PostWithRelations[] | null> => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data ?? null;
};

export const getUserPosts = async (id: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .order("created_at", { ascending: false})
    .eq("owner_id", id);
  if (error) throw error;
  return data ?? [];
};

export const createPost = async (post: CreatePostBody) => {
  const response = await supabase
    .from("Posts")
    .insert(post)
    .select()
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const updatePost = async (post: UpdatePostBody) => {
  const response = await supabase
    .from("Posts")
    .update(post)
    .eq("id", post.id)
    .select()
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const deletePost = async (uid: number) => {
  const response = await supabase
    .from("Posts")
    .delete()
    .eq("id", uid)
    .throwOnError();
  return Promise.resolve(response.data);
};


