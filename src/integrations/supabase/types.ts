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
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string | null
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          service_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          service_type: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          service_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: number
          rating: number | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: number
          rating?: number | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: number
          rating?: number | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          appointment_id: string
          created_at: string | null
          currency: string
          id: string
          patient_id: string
          payment_method: string | null
          payment_reference: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          appointment_id: string
          created_at?: string | null
          currency?: string
          id?: string
          patient_id: string
          payment_method?: string | null
          payment_reference?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string
          created_at?: string | null
          currency?: string
          id?: string
          patient_id?: string
          payment_method?: string | null
          payment_reference?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_history: {
        Row: {
          allergies: string | null
          chronic_conditions: string | null
          created_at: string | null
          document_urls: string[] | null
          family_history: string | null
          id: string
          medications: string | null
          patient_id: string
          previous_surgeries: string | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string | null
          chronic_conditions?: string | null
          created_at?: string | null
          document_urls?: string[] | null
          family_history?: string | null
          id?: string
          medications?: string | null
          patient_id: string
          previous_surgeries?: string | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string | null
          chronic_conditions?: string | null
          created_at?: string | null
          document_urls?: string[] | null
          family_history?: string | null
          id?: string
          medications?: string | null
          patient_id?: string
          previous_surgeries?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "Medications and Billing": {
        Row: {
          created_at: string
          id: number
          start: string | null
          stop: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          start?: string | null
          stop?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          start?: string | null
          stop?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          id: string
          is_published: boolean | null
          patient_id: string
          rating: number
          review_text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          patient_id: string
          rating: number
          review_text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          patient_id?: string
          rating?: number
          review_text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
