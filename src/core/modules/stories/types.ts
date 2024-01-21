import { Tables } from "../../../../database.types";
import { Profile } from "../profiles/types";

export type Story = Tables<"Stories">;

export type StoryWithRelations = Story & { profile: Profile };