import { supabase } from "../../api/supabase";
import { Profile } from "./types";

export const getProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) throw error;
  return data ?? [];
};

export const getProfile = async (id: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", id)
    .single();
  if (error) throw error;
  return data ?? null;
};



