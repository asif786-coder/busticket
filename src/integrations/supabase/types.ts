export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_reference: string
          booking_status: string | null
          created_at: string | null
          id: string
          match_id: string | null
          payment_status: string | null
          quantity: number
          ticket_category_id: string | null
          total_amount: number
          user_id: string | null
        }
        Insert: {
          booking_reference: string
          booking_status?: string | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          payment_status?: string | null
          quantity?: number
          ticket_category_id?: string | null
          total_amount: number
          user_id?: string | null
        }
        Update: {
          booking_reference?: string
          booking_status?: string | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          payment_status?: string | null
          quantity?: number
          ticket_category_id?: string | null
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_ticket_category_id_fkey"
            columns: ["ticket_category_id"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          base_price: number
          created_at: string | null
          id: string
          match_date: string
          match_type: string
          status: Database["public"]["Enums"]["match_status"] | null
          team1_id: string
          team2_id: string
          venue_id: string
        }
        Insert: {
          base_price: number
          created_at?: string | null
          id?: string
          match_date: string
          match_type?: string
          status?: Database["public"]["Enums"]["match_status"] | null
          team1_id: string
          team2_id: string
          venue_id: string
        }
        Update: {
          base_price?: number
          created_at?: string | null
          id?: string
          match_date?: string
          match_type?: string
          status?: Database["public"]["Enums"]["match_status"] | null
          team1_id?: string
          team2_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      merchandise: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          sizes: string[] | null
          stock_quantity: number | null
          team_id: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          sizes?: string[] | null
          stock_quantity?: number | null
          team_id?: string | null
          type?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          sizes?: string[] | null
          stock_quantity?: number | null
          team_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchandise_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      merchandise_orders: {
        Row: {
          created_at: string | null
          id: string
          merchandise_id: string | null
          order_status: string | null
          quantity: number
          size: string
          total_amount: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          merchandise_id?: string | null
          order_status?: string | null
          quantity: number
          size: string
          total_amount: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          merchandise_id?: string | null
          order_status?: string | null
          quantity?: number
          size?: string
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchandise_orders_merchandise_id_fkey"
            columns: ["merchandise_id"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["id"]
          },
        ]
      }
      predictions: {
        Row: {
          created_at: string | null
          id: string
          match_date: string
          predicted_score_team1: number | null
          predicted_score_team2: number | null
          status: string | null
          team1: string
          team1_win_probability: number | null
          team2: string
          team2_win_probability: number | null
          user_id: string
          venue: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_date: string
          predicted_score_team1?: number | null
          predicted_score_team2?: number | null
          status?: string | null
          team1: string
          team1_win_probability?: number | null
          team2: string
          team2_win_probability?: number | null
          user_id: string
          venue: string
        }
        Update: {
          created_at?: string | null
          id?: string
          match_date?: string
          predicted_score_team1?: number | null
          predicted_score_team2?: number | null
          status?: string | null
          team1?: string
          team1_win_probability?: number | null
          team2?: string
          team2_win_probability?: number | null
          user_id?: string
          venue?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          city: string
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          short_name: string
        }
        Insert: {
          city: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name: string
        }
        Update: {
          city?: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name?: string
        }
        Relationships: []
      }
      ticket_categories: {
        Row: {
          available_seats: number
          category_name: string
          created_at: string | null
          id: string
          match_id: string | null
          price: number
          section_name: string | null
          ticket_type: Database["public"]["Enums"]["ticket_type"]
          total_seats: number
        }
        Insert: {
          available_seats: number
          category_name: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          price: number
          section_name?: string | null
          ticket_type: Database["public"]["Enums"]["ticket_type"]
          total_seats: number
        }
        Update: {
          available_seats?: number
          category_name?: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          price?: number
          section_name?: string | null
          ticket_type?: Database["public"]["Enums"]["ticket_type"]
          total_seats?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_categories_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string | null
          capacity: number
          city: string
          created_at: string | null
          id: string
          name: string
          state: string
        }
        Insert: {
          address?: string | null
          capacity: number
          city: string
          created_at?: string | null
          id?: string
          name: string
          state: string
        }
        Update: {
          address?: string | null
          capacity?: number
          city?: string
          created_at?: string | null
          id?: string
          name?: string
          state?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      match_status: "upcoming" | "live" | "completed" | "cancelled"
      ticket_type: "general" | "premium" | "vip" | "hospitality"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      match_status: ["upcoming", "live", "completed", "cancelled"],
      ticket_type: ["general", "premium", "vip", "hospitality"],
    },
  },
} as const
