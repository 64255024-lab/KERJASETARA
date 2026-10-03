"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "../lib/supabase-browser";

export default function NavAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    if (!supabase) return; // env belum dipasang — tampil sebagai logged-out
    supabase.auth.getUser().then(({ data }) => setLoggedIn(Boolean(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setLoggedIn(Boolean(session?.user))
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    const supabase = supabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loggedIn) {
    return (
      <>
        <Link className="link" href="/resume">Profil</Link>
        <button type="button" className="btn btn-ghost" style={{ minHeight: 44, padding: "0 24px" }} onClick={logout}>
          Keluar
        </button>
      </>
    );
  }
  return (
    <>
      <Link className="link" href="/login">Masuk</Link>
      <Link className="btn" href="/register">Daftar</Link>
    </>
  );
}
