export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Tables<T extends keyof IDatabase["public"]["Tables"]> =
  IDatabase["public"]["Tables"][T]["Row"];

export type Create<T extends keyof IDatabase["public"]["Tables"]> =
  IDatabase["public"]["Tables"][T]["Insert"];

export interface IDatabase {
  public: {
    Tables: {
      age_ratings: {
        Row: {
          age: number;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          age: number;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          age?: number;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      child_comments: {
        Row: {
          comment_id: number;
          id: number;
        };
        Insert: {
          comment_id: number;
          id?: number;
        };
        Update: {
          comment_id?: number;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "child_comments_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          author_id: string;
          child_comment_id: number | null;
          content: string;
          created_at: string;
          id: number;
          updated_at: string | null;
        };
        Insert: {
          author_id: string;
          child_comment_id?: number | null;
          content: string;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          child_comment_id?: number | null;
          content?: string;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_child_comment_id_fkey";
            columns: ["child_comment_id"];
            isOneToOne: false;
            referencedRelation: "child_comments";
            referencedColumns: ["id"];
          },
        ];
      };
      count_views: {
        Row: {
          created_at: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "count_views_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "count_views_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      genders: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      post_comments: {
        Row: {
          comment_id: number;
          post_id: string;
        };
        Insert: {
          comment_id: number;
          post_id: string;
        };
        Update: {
          comment_id?: number;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_comments_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_reactions: {
        Row: {
          created_at: string;
          post_id: string;
          reaction_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          reaction_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          reaction_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_reactions_reaction_id_fkey";
            columns: ["reaction_id"];
            isOneToOne: false;
            referencedRelation: "reactions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_tags: {
        Row: {
          created_at: string;
          post_id: string;
          tag_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          tag_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          age_rating_id: number | null;
          author_id: string;
          content: string | null;
          count_view: number;
          created_at: string;
          id: string;
          image_path: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          age_rating_id?: number | null;
          author_id?: string;
          content?: string | null;
          count_view?: number;
          created_at?: string;
          id?: string;
          image_path?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          age_rating_id?: number | null;
          author_id?: string;
          content?: string | null;
          count_view?: number;
          created_at?: string;
          id?: string;
          image_path?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_age_rating_id_fkey";
            columns: ["age_rating_id"];
            isOneToOne: false;
            referencedRelation: "age_ratings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reactions: {
        Row: {
          emoji: string;
          grade: number;
          id: number;
        };
        Insert: {
          emoji: string;
          grade?: number;
          id?: number;
        };
        Update: {
          emoji?: string;
          grade?: number;
          id?: number;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          author_id: string;
          created_at: string;
          description: string | null;
          id: string;
          image_path: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tags_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          gender_id: number | null;
          id: string;
          name: string | null;
          uid: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          gender_id?: number | null;
          id?: string;
          name?: string | null;
          uid?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          gender_id?: number | null;
          id?: string;
          name?: string | null;
          uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_gender";
            columns: ["gender_id"];
            isOneToOne: false;
            referencedRelation: "genders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_post: {
        Args: {
          title: string;
          content: string;
          author_id: string;
        };
        Returns: undefined;
      };
      get_first_user_name: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
