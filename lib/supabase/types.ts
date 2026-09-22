export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      visitor_telemetry: {
        Row: {
          id: string;
          created_at: string;
          path: string;
          space_code: string | null;
          action_type: string;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          path: string;
          space_code?: string | null;
          action_type: string;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          path?: string;
          space_code?: string | null;
          action_type?: string;
          metadata?: Json | null;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          sender_name: string;
          sender_email: string;
          message: string;
          topic: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          sender_name: string;
          sender_email: string;
          message: string;
          topic?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          sender_name?: string;
          sender_email?: string;
          message?: string;
          topic?: string | null;
        };
      };
      agent_execution_traces: {
        Row: {
          id: string;
          created_at: string;
          agent_name: string;
          kind: string;
          status: string;
          step_count: number;
          last_action: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          agent_name: string;
          kind: string;
          status: string;
          step_count?: number;
          last_action: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          agent_name?: string;
          kind?: string;
          status?: string;
          step_count?: number;
          last_action?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
