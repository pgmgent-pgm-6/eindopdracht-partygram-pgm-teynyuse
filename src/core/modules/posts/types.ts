import { Tables, Body } from "../../../../database.types";
import { Profile } from "../profiles/types";

export type Post = Tables<"Posts">;

export type PostWithRelations = Post & { profile: Profile };

export type CreatePostBody = Body<"Posts">["Insert"];

export type UpdatePostBody = Body<"Posts">["Update"];
