"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch {
      alert("Login failed.");
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch {}
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-extrabold">Week 9 — Login</h1>

        {!user ? (
          <div className="mt-6 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
            <p className="text-zinc-300">Sign in to access your shopping list.</p>
            <button
              onClick={handleLogin}
              className="mt-4 rounded-full border px-4 py-2 text-sm bg-zinc-100 text-zinc-900 border-zinc-100"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
            <p>
              Welcome, <span className="font-semibold">{user.displayName || user.email}</span>
            </p>
            <div className="flex gap-3">
              <Link
                href="/week-9/shopping-list"
                className="rounded-full border px-4 py-2 text-sm bg-zinc-100 text-zinc-900 border-zinc-100"
              >
                Go to shopping list →
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border px-4 py-2 text-sm bg-transparent text-zinc-200 border-zinc-700 hover:border-zinc-500"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
