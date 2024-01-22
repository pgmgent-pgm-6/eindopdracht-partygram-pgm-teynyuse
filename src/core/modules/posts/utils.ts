import isVoid from "@core/utils/isVoid";
import { Bucket } from "../files/constans";
import { getPublicUrl } from "../files/utils";
import { Post } from "./types";

export const getImageUrl = (post?: Post | null) => {
  if (!post || isVoid(post.image)) {
    return null;
  }
  return getPublicUrl(Bucket.Posts, post.image);
};


