import { supabase } from "../../api/supabase";
import { CreateProfileBody, Profile } from "./types";

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

export const createProfile = async (profile: CreateProfileBody) => {
  const response = await supabase
  .from("Profiles")
  .insert(profile)
  .select()
  .throwOnError()
  .single();
  return Promise.resolve(response.data);
};

export const updateProfile = async (profile: Profile): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("user_id", profile.user_id);
  if (error) throw error;
  return data![0];
};

export const deleteProfile = async (id: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("user_id", id);
  if (error) throw error;
  return data![0];
};





