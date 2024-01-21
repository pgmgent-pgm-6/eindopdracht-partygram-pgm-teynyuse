import { Tables, Body } from "../../../../database.types";
import { Profile } from "../profiles/types";

export type Like = Tables<"PostLikes">;

export type LikeWithRelations = Like & { profile: Profile };

export type CreateLikeBody = Body<"PostLikes">["Insert"];

export type UpdateLikeBody = Body<"PostLikes">["Update"];
