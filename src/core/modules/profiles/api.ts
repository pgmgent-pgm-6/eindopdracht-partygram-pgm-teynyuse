import { supabase } from "../../api/supabase";
import { getCurrentSession } from "../auth/api";
import { uploadImage } from "../files/api";
import { Bucket } from "../files/constans";
import { CreateProfileBody, Profile, UpdateProfileBody } from "./types";

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


export const deleteProfile = async (id: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("user_id", id);
  if (error) throw error;
  return data![0];
};

export const getProfileByUserId = async (id: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();
  if (error) throw error;
  return data!;
};

export const updateProfile = async (body: UpdateProfileBody) => {
  const { first_name, ...profile } = body;
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("user_id", body.user_id)
    .single();

  if (error) {
    return Promise.reject(error);
  }

};

export const updateUserAvatar = async (avatar: string) => {
  const session = await getCurrentSession();
  const fileName = `${session?.user.id}/${Date.now()}.jpg`;
  await uploadImage(Bucket.Avatars, fileName, avatar);

  // update profile
  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar: fileName })
    .eq("user_id", session?.user.id)
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data;
};




