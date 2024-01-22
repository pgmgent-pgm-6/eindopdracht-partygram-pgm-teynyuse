import isVoid from "@core/utils/isVoid";
import { Bucket } from "../files/constans";
import { getPublicUrl } from "../files/utils";
import { Profile } from "./types";

export const getAvatarUrl = (profile?: Profile | null) => {
  if (!profile || isVoid(profile.avatar)) {
    return null;
  }
  return getPublicUrl(Bucket.Avatars, profile.avatar);
};


