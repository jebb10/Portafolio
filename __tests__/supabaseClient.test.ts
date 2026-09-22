import { describe, it, expect } from "vitest";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

describe("Supabase Client Architecture", () => {
  it("should handle unconfigured environments gracefully without throwing", () => {
    // Without env vars, client should report false and return null safely
    expect(isSupabaseConfigured()).toBe(false);
    const client = getSupabaseClient();
    expect(client).toBeNull();
  });

  it("should return null for server client when service key is absent", () => {
    const serverClient = createServerSupabaseClient();
    expect(serverClient).toBeNull();
  });
});
