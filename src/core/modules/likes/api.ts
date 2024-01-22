import { supabase } from "../../api/supabase";
import { Like, LikeWithRelations } from "./types";


export const getLikes = async (postId:number): Promise<LikeWithRelations[]> => {
  const { data, error } = await supabase
    .from("PostLikes")
    .select(`*, profile:Profiles (username, avatar)`)
    .eq("post_id", postId);
  if (error) throw error;
  return data ?? [];
};


export const createLike = async (like: number) => {
  const response = await supabase
    .from("PostLikes")
    .insert(like)
    .select()
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const checkLiked = async (postId, likerId) => {
  const { data, error } = await supabase
    .from("PostLikes")
    .select()
    .eq("post_id", postId)
    .eq("liker_id", likerId);

  if (error) throw error;
  return data ?? [];
};

export const deleteLike = async (likeId: number) => {
  const response = await supabase
    .from("PostLikes")
    .delete()
    .eq("id", likeId)
    .select()
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};





