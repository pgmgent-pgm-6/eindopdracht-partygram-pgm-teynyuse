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





