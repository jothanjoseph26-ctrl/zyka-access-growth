export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Pawn System Types
export type PawnStatus = 'pending' | 'active' | 'extended' | 'redeemed' | 'forfeited' | 'auctioned'
export type CollateralType = 'gold' | 'diamond' | 'vehicle' | 'other'

export interface Customer {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  phone: string
  email: string | null
  address: string | null
  date_of_birth: string | null
  aadhar_number: string | null
  pan_number: string | null
  is_active: boolean
  created_by: string | null
  notes: string | null
}

export interface Pawn {
  id: string
  created_at: string
  updated_at: string
  ticket_number: string
  customer_id: string
  collateral_type: CollateralType
  item_description: string
  weight_grams: number | null
  purity: string | null
  vehicle_registration: string | null
  vehicle_chassis: string | null
  market_value: number
  loan_amount: number
  interest_rate: number
  tenure_days: number
  status: PawnStatus
  pawn_date: string
  maturity_date: string
  redemption_date: string | null
  total_interest_paid: number
  total_amount_paid: number
  vault_location: string | null
  shelf_number: string | null
  photo_urls: string[] | null
  notes: string | null
  created_by: string | null
}

export interface Payment {
  id: string
  created_at: string
  pawn_id: string
  customer_id: string
  amount: number
  payment_type: 'interest' | 'principal' | 'full'
  payment_method: 'cash' | 'upi' | 'bank_transfer' | 'cheque'
  receipt_number: string
  transaction_id: string | null
  notes: string | null
  created_by: string | null
}

export interface GoldRate {
  id: string
  created_at: string
  purity: string
  rate_per_10g: number
  effective_from: string
  is_active: boolean
}

export interface PawnExtension {
  id: string
  created_at: string
  pawn_id: string
  new_maturity_date: string
  extension_fee: number
  interest_topup: number | null
  notes: string | null
  created_by: string | null
}

export interface Settings {
  key: string
  value: Json
  updated_at: string
}

export interface AuditLog {
  id: string
  created_at: string
  user_id: string | null
  action: string
  table_name: string | null
  record_id: string | null
  changes: Json | null
  ip_address: string | null
}

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          id: string
          ip_address: unknown
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          aadhar_number: string | null
          address: string | null
          created_at: string | null
          created_by: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          is_active: boolean | null
          notes: string | null
          pan_number: string | null
          phone: string
          updated_at: string | null
        }
        Insert: {
          aadhar_number?: string | null
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          pan_number?: string | null
          phone: string
          updated_at?: string | null
        }
        Update: {
          aadhar_number?: string | null
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          pan_number?: string | null
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gold_rates: {
        Row: {
          created_at: string | null
          effective_from: string
          id: string
          is_active: boolean | null
          purity: string
          rate_per_10g: number
        }
        Insert: {
          created_at?: string | null
          effective_from: string
          id?: string
          is_active?: boolean | null
          purity: string
          rate_per_10g: number
        }
        Update: {
          created_at?: string | null
          effective_from?: string
          id?: string
          is_active?: boolean | null
          purity?: string
          rate_per_10g?: number
        }
        Relationships: []
      }
      pawn_extensions: {
        Row: {
          created_at: string | null
          created_by: string | null
          extension_fee: number
          id: string
          interest_topup: number | null
          new_maturity_date: string
          notes: string | null
          pawn_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          extension_fee: number
          id?: string
          interest_topup?: number | null
          new_maturity_date: string
          notes?: string | null
          pawn_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          extension_fee?: number
          id?: string
          interest_topup?: number | null
          new_maturity_date?: string
          notes?: string | null
          pawn_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pawn_extensions_pawn_id_fkey"
            columns: ["pawn_id"]
            isOneToOne: false
            referencedRelation: "pawns"
            referencedColumns: ["id"]
          },
        ]
      }
      pawns: {
        Row: {
          collateral_type: Database["public"]["Enums"]["collateral_type"]
          created_at: string | null
          created_by: string | null
          customer_id: string
          id: string
          interest_rate: number | null
          item_description: string
          loan_amount: number
          market_value: number
          maturity_date: string
          notes: string | null
          pawn_date: string
          photo_urls: string[] | null
          purity: string | null
          redemption_date: string | null
          shelf_number: string | null
          status: Database["public"]["Enums"]["pawn_status"] | null
          tenure_days: number | null
          ticket_number: string
          total_amount_paid: number | null
          total_interest_paid: number | null
          updated_at: string | null
          vault_location: string | null
          vehicle_chassis: string | null
          vehicle_registration: string | null
          weight_grams: number | null
        }
        Insert: {
          collateral_type: Database["public"]["Enums"]["collateral_type"]
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          id?: string
          interest_rate?: number | null
          item_description: string
          loan_amount: number
          market_value: number
          maturity_date: string
          notes?: string | null
          pawn_date: string
          photo_urls?: string[] | null
          purity?: string | null
          redemption_date?: string | null
          shelf_number?: string | null
          status?: Database["public"]["Enums"]["pawn_status"] | null
          tenure_days?: number | null
          ticket_number: string
          total_amount_paid?: number | null
          total_interest_paid?: number | null
          updated_at?: string | null
          vault_location?: string | null
          vehicle_chassis?: string | null
          vehicle_registration?: string | null
          weight_grams?: number | null
        }
        Update: {
          collateral_type?: Database["public"]["Enums"]["collateral_type"]
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          id?: string
          interest_rate?: number | null
          item_description?: string
          loan_amount?: number
          market_value?: number
          maturity_date?: string
          notes?: string | null
          pawn_date?: string
          photo_urls?: string[] | null
          purity?: string | null
          redemption_date?: string | null
          shelf_number?: string | null
          status?: Database["public"]["Enums"]["pawn_status"] | null
          tenure_days?: number | null
          ticket_number?: string
          total_amount_paid?: number | null
          total_interest_paid?: number | null
          updated_at?: string | null
          vault_location?: string | null
          vehicle_chassis?: string | null
          vehicle_registration?: string | null
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pawns_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          customer_id: string
          id: string
          notes: string | null
          pawn_id: string
          payment_method: string | null
          payment_type: string
          receipt_number: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          id?: string
          notes?: string | null
          pawn_id: string
          payment_method?: string | null
          payment_type: string
          receipt_number: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          id?: string
          notes?: string | null
          pawn_id?: string
          payment_method?: string | null
          payment_type?: string
          receipt_number?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_pawn_id_fkey"
            columns: ["pawn_id"]
            isOneToOne: false
            referencedRelation: "pawns"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_interest: {
        Args: { p_days: number; p_loan_amount: number; p_rate: number }
        Returns: number
      }
      get_customer_pawn_summary: {
        Args: { p_customer_id: string }
        Returns: {
          active_pawns: number
          total_loan_amount: number
          total_market_value: number
          total_pawns: number
        }[]
      }
    }
    Enums: {
      collateral_type: "gold" | "diamond" | "vehicle" | "other"
      pawn_status:
        | "pending"
        | "active"
        | "extended"
        | "redeemed"
        | "forfeited"
        | "auctioned"
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
  public: {
    Enums: {
      collateral_type: ["gold", "diamond", "vehicle", "other"],
      pawn_status: [
        "pending",
        "active",
        "extended",
        "redeemed",
        "forfeited",
        "auctioned",
      ],
    },
  },
} as const
