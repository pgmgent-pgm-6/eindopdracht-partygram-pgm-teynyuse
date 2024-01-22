import { supabase } from "../../api/supabase";
import { Story } from "./types";

export const getStories = async () => {
  const { data, error } = await supabase
    .from("Stories")
    .select("*, profile:Profiles (username, avatar)")
    .order("created_at");
  if (error) {
    throw error;
  }
  return data;
};


export const getStory = async (id: string): Promise<Story | null> => {
  const { data, error } = await supabase
    .from("Stories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const createStory = async (body: any) => {
  const { data, error } = await supabase.from("Stories").insert(body);
  if (error) {
    throw error;
  }
  return data;
};
