export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_type: string
          created_at: string | null
          family_room_id: string | null
          id: string
          metadata: Json | null
          target_id: string | null
          target_table: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          family_room_id?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          family_room_id?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color_code: string | null
          created_at: string | null
          family_room_id: string | null
          group_id: string | null
          icon: string | null
          id: string
          is_active: boolean
          is_system_defined: boolean
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color_code?: string | null
          created_at?: string | null
          family_room_id?: string | null
          group_id?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          is_system_defined?: boolean
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color_code?: string | null
          created_at?: string | null
          family_room_id?: string | null
          group_id?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          is_system_defined?: boolean
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "categories_group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "view_all_categories"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "categories_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "view_system_categories"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories_group: {
        Row: {
          color_code: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string | null
        }
        Insert: {
          color_code?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string | null
        }
        Update: {
          color_code?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      e_statements: {
        Row: {
          billing_date: string | null
          cutoff_date: string | null
          family_room_id: string | null
          file_url: string
          generated_at: string | null
          id: string
          period_end: string
          period_start: string
          type: string
          user_id: string | null
        }
        Insert: {
          billing_date?: string | null
          cutoff_date?: string | null
          family_room_id?: string | null
          file_url: string
          generated_at?: string | null
          id?: string
          period_end: string
          period_start: string
          type: string
          user_id?: string | null
        }
        Update: {
          billing_date?: string | null
          cutoff_date?: string | null
          family_room_id?: string | null
          file_url?: string
          generated_at?: string | null
          id?: string
          period_end?: string
          period_start?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "e_statements_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "e_statements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          color_code: string | null
          family_room_id: string
          id: string
          is_active: boolean | null
          joined_at: string | null
          removed_at: string | null
          role: string
          role_id: number
          user_id: string
        }
        Insert: {
          color_code?: string | null
          family_room_id: string
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          removed_at?: string | null
          role?: string
          role_id: number
          user_id: string
        }
        Update: {
          color_code?: string | null
          family_room_id?: string
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          removed_at?: string | null
          role?: string
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_family_members_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_rooms: {
        Row: {
          billing_day: number
          color_codes: string[]
          created_at: string
          cut_off_day: number
          id: string
          mode: string
          name: string
          quota_limit: number
          updated_at: string
        }
        Insert: {
          billing_day?: number
          color_codes: string[]
          created_at?: string
          cut_off_day?: number
          id?: string
          mode?: string
          name: string
          quota_limit?: number
          updated_at?: string
        }
        Update: {
          billing_day?: number
          color_codes?: string[]
          created_at?: string
          cut_off_day?: number
          id?: string
          mode?: string
          name?: string
          quota_limit?: number
          updated_at?: string
        }
        Relationships: []
      }
      family_settings: {
        Row: {
          created_at: string | null
          currency: string
          custom_categories: Json | null
          default_color_codes: Json | null
          email_notifications_enabled: boolean | null
          family_id: string
          id: string
          recurring_thresholds: Json | null
          reminder_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          custom_categories?: Json | null
          default_color_codes?: Json | null
          email_notifications_enabled?: boolean | null
          family_id: string
          id?: string
          recurring_thresholds?: Json | null
          reminder_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          custom_categories?: Json | null
          default_color_codes?: Json | null
          email_notifications_enabled?: boolean | null
          family_id?: string
          id?: string
          recurring_thresholds?: Json | null
          reminder_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_settings_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: true
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      general_settings: {
        Row: {
          created_at: string | null
          currency: string
          custom_categories: Json | null
          email_notifications_enabled: boolean | null
          id: string
          recurring_threshold: number | null
          reminder_time: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          custom_categories?: Json | null
          email_notifications_enabled?: boolean | null
          id?: string
          recurring_threshold?: number | null
          reminder_time?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          custom_categories?: Json | null
          email_notifications_enabled?: boolean | null
          id?: string
          recurring_threshold?: number | null
          reminder_time?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "general_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          family_id: string
          id: string
          is_read: boolean | null
          message: string | null
          priority: string
          read_at: string | null
          sent_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          family_id: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          priority: string
          read_at?: string | null
          sent_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          family_id?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          priority?: string
          read_at?: string | null
          sent_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: true
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_transactions: {
        Row: {
          amount: number
          category_id: string
          created_at: string | null
          currency_code: string
          description: string | null
          end_date: string | null
          frequency: string
          id: number
          is_active: boolean | null
          start_date: string
          updated_at: string | null
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          category_id: string
          created_at?: string | null
          currency_code: string
          description?: string | null
          end_date?: string | null
          frequency: string
          id?: number
          is_active?: boolean | null
          start_date: string
          updated_at?: string | null
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          category_id?: string
          created_at?: string | null
          currency_code?: string
          description?: string | null
          end_date?: string | null
          frequency?: string
          id?: number
          is_active?: boolean | null
          start_date?: string
          updated_at?: string | null
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "view_all_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "view_system_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      relationship_invitations: {
        Row: {
          created_at: string
          family_room_id: string
          id: string
          invitee_email: string
          invitee_id: string | null
          inviter_id: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          family_room_id: string
          id?: string
          invitee_email: string
          invitee_id?: string | null
          inviter_id: string
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          family_room_id?: string
          id?: string
          invitee_email?: string
          invitee_id?: string | null
          inviter_id?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationship_invitations_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      report_summaries: {
        Row: {
          category_breakdown: Json | null
          daily_spending: Json | null
          family_room_id: string | null
          generated_at: string | null
          id: string
          period_end: string
          period_start: string
          total_expense: number
          user_id: string | null
        }
        Insert: {
          category_breakdown?: Json | null
          daily_spending?: Json | null
          family_room_id?: string | null
          generated_at?: string | null
          id?: string
          period_end: string
          period_start: string
          total_expense?: number
          user_id?: string | null
        }
        Update: {
          category_breakdown?: Json | null
          daily_spending?: Json | null
          family_room_id?: string | null
          generated_at?: string | null
          id?: string
          period_end?: string
          period_start?: string
          total_expense?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_summaries_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_summaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          id: number
          is_default: boolean | null
          label: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          is_default?: boolean | null
          label: string
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          is_default?: boolean | null
          label?: string
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          category_id: string | null
          created_at: string
          currency_code: string
          description: string | null
          id: string
          is_deleted: boolean
          is_recurring: boolean
          receipt_url: string | null
          transaction_date: string
          updated_at: string
          user_id: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          category: string
          category_id?: string | null
          created_at?: string
          currency_code: string
          description?: string | null
          id?: string
          is_deleted?: boolean
          is_recurring?: boolean
          receipt_url?: string | null
          transaction_date?: string
          updated_at?: string
          user_id: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          category_id?: string | null
          created_at?: string
          currency_code?: string
          description?: string | null
          id?: string
          is_deleted?: boolean
          is_recurring?: boolean
          receipt_url?: string | null
          transaction_date?: string
          updated_at?: string
          user_id?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "view_all_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "view_system_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: string
          color_code: string
          created_at: string
          currency_code: string
          email: string | null
          family_id: string | null
          id: string
          is_active: boolean
          last_login: string | null
          mode: string
          name: string
          password_hash: string | null
          phone_number: string | null
          photo_url: string | null
          profile_photo: string | null
          reminder_time: string | null
          role: string
          updated_at: string
        }
        Insert: {
          auth_provider: string
          color_code: string
          created_at?: string
          currency_code: string
          email?: string | null
          family_id?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          mode: string
          name: string
          password_hash?: string | null
          phone_number?: string | null
          photo_url?: string | null
          profile_photo?: string | null
          reminder_time?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          auth_provider?: string
          color_code?: string
          created_at?: string
          currency_code?: string
          email?: string | null
          family_id?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          mode?: string
          name?: string
          password_hash?: string | null
          phone_number?: string | null
          photo_url?: string | null
          profile_photo?: string | null
          reminder_time?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          created_at: string | null
          family_room_id: string | null
          id: string
          is_default: boolean
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          family_room_id?: string | null
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          family_room_id?: string | null
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      view_all_categories: {
        Row: {
          category_icon: string | null
          category_name: string | null
          color_code: string | null
          family_room_id: string | null
          group_icon: string | null
          group_id: string | null
          group_name: string | null
          id: string | null
          is_system_defined: boolean | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_family_room_id_fkey"
            columns: ["family_room_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      view_couple_expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          currency_code: string | null
          description: string | null
          id: string | null
          is_recurring: boolean | null
          transaction_date: string | null
          updated_at: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      view_family_expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          currency_code: string | null
          description: string | null
          id: string | null
          is_recurring: boolean | null
          transaction_date: string | null
          updated_at: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      view_system_categories: {
        Row: {
          category_icon: string | null
          category_name: string | null
          color_code: string | null
          group_icon: string | null
          group_id: string | null
          group_name: string | null
          id: string | null
        }
        Relationships: []
      }
      view_total_couple_expenses: {
        Row: {
          family_id: string | null
          month: string | null
          total_amount: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      view_total_family_expenses: {
        Row: {
          month: string | null
          scope_id: string | null
          total_amount: number | null
        }
        Relationships: []
      }
      view_total_user_expenses: {
        Row: {
          month: string | null
          total_amount: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      view_user_expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          currency_code: string | null
          description: string | null
          id: string | null
          is_recurring: boolean | null
          transaction_date: string | null
          updated_at: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_relationship_invite: {
        Args: { p_invite_id: string }
        Returns: undefined
      }
      create_relationship_invite: {
        Args: {
          p_family_room_id: string
          p_invitee_email: string
          p_role?: string
        }
        Returns: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
