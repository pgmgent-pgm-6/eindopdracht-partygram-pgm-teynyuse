export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ChatBox: {
        Row: {
          created_at: string
          id: number
          message_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          message_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          message_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ChatBox_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "ChatMessage"
            referencedColumns: ["id"]
          }
        ]
      }
      ChatMessage: {
        Row: {
          chatbox_id: number | null
          created_at: string
          id: number
          message: string | null
          owner_id: string | null
        }
        Insert: {
          chatbox_id?: number | null
          created_at?: string
          id?: number
          message?: string | null
          owner_id?: string | null
        }
        Update: {
          chatbox_id?: number | null
          created_at?: string
          id?: number
          message?: string | null
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ChatMessage_chatbox_id_fkey"
            columns: ["chatbox_id"]
            isOneToOne: false
            referencedRelation: "ChatBox"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ChatMessage_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Comments: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      FavoritePost: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FavoritePost_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FavoritePost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      PostLikes: {
        Row: {
          created_at: string
          id: number
          liker_id: string | null
          post_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          liker_id?: string | null
          post_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          liker_id?: string | null
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "PostLikes_liker_id_fkey"
            columns: ["liker_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "PostLikes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          }
        ]
      }
      Posts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          location: string | null
          owner_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          owner_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      Profiles: {
        Row: {
          avatar: string | null
          created_at: string
          first_name: string | null
          last_name: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Stories: {
        Row: {
          created_at: string
          id: number
          image: string | null
          owner_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          owner_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Stories_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
