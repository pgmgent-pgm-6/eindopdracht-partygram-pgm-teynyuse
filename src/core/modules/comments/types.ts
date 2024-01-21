import { Tables, Body } from "../../../../database.types";

export type Comment = Tables<"Comments">;

export type CreateCommentBody = Body<"Comments">["Insert"];

export type UpdateCommentBody = Body<"Comments">["Update"];
