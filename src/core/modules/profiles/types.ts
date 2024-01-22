import { Tables, Body } from "../../../../database.types";

export type Profile = Tables<"Profiles">;

export type CreateProfileBody = Body<"Profiles">["Insert"];
export type UpdateProfileBody = Body<"Profiles">["Update"];
