import { Tables, Body } from "../../../../database.types";
import { Profile } from "../profiles/types";

export type Story = Tables<"Stories">;

export type StoryWithRelations = Story & { profile: Profile };

export type CreateStoryBody = Body<"Stories">["Insert"];

export type UpdateStoryBody = Body<"Stories">["Update"];
