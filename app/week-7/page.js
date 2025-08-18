"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./new-item";
import ItemList from "./item-list";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(item) {
    setItems([item, ...items]);
  }

  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight">
            Shopping list
            <span className="block text-zinc-400 text-lg md:text-xl font-normal mt-4">
              Add new items and sort the list
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 space-y-8 pb-16">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </section>
    </main>
  );
}
