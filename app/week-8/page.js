"use client";

import { useState } from "react";
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
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(item) {
    setItems([item, ...items]);
  }

  function handleItemSelect(item) {
    const cleaned = cleanIngredientName(item?.name);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight">
            Shopping list + meal ideas
            <span className="block text-zinc-400 text-lg md:text-xl font-normal mt-4">
              Click an item to see meal ideas
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-6">
            <NewItem onAddItem={handleAddItem} />
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>
          <div className="md:w-1/3">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </section>
    </main>
  );
}
