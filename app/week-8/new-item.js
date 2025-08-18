"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function add(e) {
    e.preventDefault();
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    const item = { id, name: name.trim(), quantity: Number(quantity), category };
    if (!item.name) return;
    onAddItem(item);
    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  function inc() { if (quantity < 20) setQuantity(quantity + 1); }
  function dec() { if (quantity > 1) setQuantity(quantity - 1); }

  const btn = "rounded-full border px-4 py-2 text-xs md:text-sm tracking-wide uppercase transition";
  const hollow = "bg-transparent text-zinc-200 border-zinc-700 hover:border-zinc-500";
  const cta = "bg-zinc-100 text-zinc-900 border-zinc-100";

  return (
    <form onSubmit={add} className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <input
            className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="milk, 4 L 🥛"
          />
        </div>
        <select
          className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500 capitalize"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>bakery</option>
          <option>canned goods</option>
          <option>dairy</option>
          <option>dry goods</option>
          <option>household</option>
          <option>meat</option>
          <option>produce</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <button type="button" onClick={dec} className={`${btn} ${hollow} text-lg`} aria-label="decrease">−</button>
          <span className="min-w-8 text-center text-zinc-200">{quantity}</span>
          <button type="button" onClick={inc} className={`${btn} ${hollow} text-lg`} aria-label="increase">＋</button>
        </div>
        <button type="submit" className={`${btn} ${cta}`}>Add Item</button>
      </div>
    </form>
  );
}
