import { createClient } from "@supabase/supabase-js";
import { Database } from "src/interfaces";

export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
