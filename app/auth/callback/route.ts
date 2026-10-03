import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/wizard/step-1";

  if (code) {
    const supabase = await supabaseServer();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Buat baris profil bila user baru (disabilitas/needs diisi di wizard).
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();
      if (!existing) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          role: "talent",
          name: data.user.user_metadata?.full_name ?? data.user.email?.split("@")[0] ?? "",
          email: data.user.email ?? "",
        });
      }
    }
  }
  return NextResponse.redirect(`${origin}${next}`);
}
