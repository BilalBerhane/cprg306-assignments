"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import itemsData from "./items.json";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

function cleanIngredientName(name) {
  if (!name) return "";
  let base = name.split(",")[0];
  base = base.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
  base = base.replace(/\s+/g, " ").trim();
  return base.toLowerCase();
}

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">Week 9 — Shopping list</h1>
          <p className="mt-4 text-zinc-300">You must be signed in to view this page.</p>
          <Link
            href="/week-9"
            className="mt-4 inline-block rounded-full border px-4 py-2 text-sm bg-zinc-100 text-zinc-900 border-zinc-100"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  function handleAddItem(item) {
    setItems([item, ...items]);
  }

  function handleItemSelect(item) {
    const cleaned = cleanIngredientName(item?.name);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold">Shopping list</h1>
          <button
            onClick={firebaseSignOut}
            className="rounded-full border px-4 py-2 text-sm bg-transparent text-zinc-200 border-zinc-700 hover:border-zinc-500"
          >
            Log out
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-6">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div className="md:w-1/3">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </section>
    </main>
  );
}
