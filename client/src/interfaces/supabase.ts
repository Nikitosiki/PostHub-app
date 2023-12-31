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
      age_ratings: {
        Row: {
          age: number
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          age: number
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          age?: number
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      comment_reactions: {
        Row: {
          comment_id: number
          created_at: string
          reaction_id: number
          user_id: string
        }
        Insert: {
          comment_id: number
          created_at?: string
          reaction_id: number
          user_id: string
        }
        Update: {
          comment_id?: number
          created_at?: string
          reaction_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_reactions_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: number
          parent_comment_id: number | null
          path: number[]
          post_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          path: number[]
          post_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          path?: number[]
          post_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      count_views_auth: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "count_views_auth_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "count_views_auth_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      count_views_unauth: {
        Row: {
          created_at: string
          fingerprint_id: string
          post_id: string
        }
        Insert: {
          created_at?: string
          fingerprint_id: string
          post_id: string
        }
        Update: {
          created_at?: string
          fingerprint_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "count_views_unauth_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      genders: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      post_reactions: {
        Row: {
          created_at: string
          post_id: string
          reaction_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          reaction_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          reaction_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reactions_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      post_tags: {
        Row: {
          created_at: string
          post_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          age_rating_id: number | null
          author_id: string
          content: string | null
          count_view: number
          created_at: string
          id: string
          image_path: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          age_rating_id?: number | null
          author_id?: string
          content?: string | null
          count_view?: number
          created_at?: string
          id?: string
          image_path?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          age_rating_id?: number | null
          author_id?: string
          content?: string | null
          count_view?: number
          created_at?: string
          id?: string
          image_path?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_age_rating_id_fkey"
            columns: ["age_rating_id"]
            isOneToOne: false
            referencedRelation: "age_ratings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reactions: {
        Row: {
          emoji: string
          grade: number
          id: number
        }
        Insert: {
          emoji: string
          grade?: number
          id?: number
        }
        Update: {
          emoji?: string
          grade?: number
          id?: number
        }
        Relationships: []
      }
      tags: {
        Row: {
          author_id: string
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          gender_id: number | null
          id: string
          name: string | null
          uid: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          gender_id?: number | null
          id?: string
          name?: string | null
          uid?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          gender_id?: number | null
          id?: string
          name?: string | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_gender"
            columns: ["gender_id"]
            isOneToOne: false
            referencedRelation: "genders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_comment: {
        Args: {
          content: string
          author_id: string
          post_id: string
          parent_comment_id?: number
        }
        Returns: undefined
      }
      create_post: {
        Args: {
          title: string
          content: string
          author_id: string
        }
        Returns: undefined
      }
      get_childrens_comment: {
        Args: {
          parent_id: number
          from: number
          to: number
        }
        Returns: {
          id: number
          created_at: string
          updated_at: string
          content: string
          author_id: string
          post_id: string
          parent_comment_id: number
          path: number[]
        }[]
      }
      get_count_comments: {
        Args: {
          post_id_prop: string
        }
        Returns: number
      }
      get_count_post: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_first_user_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_posts_by_tag: {
        Args: {
          tag_id_value: string
          from: number
          to: number
          sort_option?: string
        }
        Returns: {
          post_id: string
          created_at: string
          view_count: number
        }[]
      }
      get_reverse_childrens_comment: {
        Args: {
          parent_id: number
          from: number
          to: number
        }
        Returns: {
          id: number
          created_at: string
          updated_at: string
          content: string
          author_id: string
          post_id: string
          parent_comment_id: number
          path: number[]
        }[]
      }
      increment_of_post_views: {
        Args: {
          post_id: string
        }
        Returns: number
      }
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
