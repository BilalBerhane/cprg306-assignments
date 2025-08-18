"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const list = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    return 0;
  });

  const btn = "rounded-full border px-4 py-2 text-xs md:text-sm tracking-wide uppercase transition";
  const active = "bg-zinc-100 text-zinc-900 border-zinc-100";
  const inactive = "bg-transparent text-zinc-200 border-zinc-700 hover:border-zinc-500";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button className={`${btn} ${sortBy === "name" ? active : inactive}`} aria-pressed={sortBy === "name"} onClick={() => setSortBy("name")}>
          Sort by Name
        </button>
        <button className={`${btn} ${sortBy === "category" ? active : inactive}`} aria-pressed={sortBy === "category"} onClick={() => setSortBy("category")}>
          Sort by Category
        </button>
      </div>

      <ul className="space-y-2">
        {list.map((it) => (
          <Item
            key={it.id}
            name={it.name}
            quantity={it.quantity}
            category={it.category}
            onSelect={() => onItemSelect(it)}
          />
        ))}
      </ul>
    </section>
  );
}
