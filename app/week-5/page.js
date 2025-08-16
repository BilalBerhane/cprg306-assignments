// /app/week-5/page.js
import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-6">
      {/* playful blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full bg-emerald-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 w-80 h-80 rounded-full bg-cyan-300/40 blur-3xl" />

      <div className="relative max-w-xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-emerald-800 drop-shadow-sm">
            🎨 Week 5 — New Item
          </h1>
          <p className="text-sm text-emerald-900/70 mt-1">
            Add something tasty to your list 🍌🥖🧀
          </p>
        </header>

        <section className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-6">
          <NewItem />
        </section>

        <footer className="mt-4 text-center text-xs text-emerald-900/60">
          Min 1 • Max 20 • Choose a category
        </footer>
      </div>
    </main>
  );
}
