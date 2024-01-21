import { Database } from "./database-generated.types";

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Body<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T];