/**
 * Shape of the database, matching `supabase/migrations/`.
 *
 * Hand written rather than generated so the repo does not need the Supabase CLI
 * to type-check. If you change a migration, either mirror it here or regenerate
 * the file wholesale:
 *
 *   npx supabase gen types typescript --project-id <ref> > src/lib/supabase/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PostStatus = "draft" | "published";

type Empty = { [_ in never]: never };

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: { user_id: string; email: string; created_at: string };
        Insert: { user_id: string; email: string; created_at?: string };
        Update: { user_id?: string; email?: string; created_at?: string };
        Relationships: [];
      };
      categories: {
        Row: {
          slug: string;
          label: string;
          icon_path: string;
          sort_order: number;
        };
        Insert: {
          slug: string;
          label: string;
          icon_path: string;
          sort_order?: number;
        };
        Update: {
          slug?: string;
          label?: string;
          icon_path?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          lead: string;
          body: Json;
          category_slug: string;
          cover_path: string | null;
          cover_alt: string | null;
          reading_minutes: number;
          status: PostStatus;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          lead: string;
          body?: Json;
          category_slug: string;
          cover_path?: string | null;
          cover_alt?: string | null;
          reading_minutes?: number;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          lead?: string;
          body?: Json;
          category_slug?: string;
          cover_path?: string | null;
          cover_alt?: string | null;
          reading_minutes?: number;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          name: string;
          location: string;
          category_slug: string;
          photo_path: string | null;
          photo_alt: string | null;
          consent_on_file: boolean;
          sort_index: number;
          status: PostStatus;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          name: string;
          location: string;
          category_slug: string;
          photo_path?: string | null;
          photo_alt?: string | null;
          consent_on_file?: boolean;
          sort_index?: number;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          name?: string;
          location?: string;
          category_slug?: string;
          photo_path?: string | null;
          photo_alt?: string | null;
          consent_on_file?: boolean;
          sort_index?: number;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      heartbeat: {
        Row: { id: boolean; last_ping: string };
        Insert: { id?: boolean; last_ping?: string };
        Update: { id?: boolean; last_ping?: string };
        Relationships: [];
      };
    };
    Views: Empty;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Empty;
    CompositeTypes: Empty;
  };
};
