"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");
  const sortByName = (a, b) => a.name.localeCompare(b.name);
  const sortByCategory = (a, b) => a.category.localeCompare(b.category);

  let sortedItems = [...items];
  if (sortBy === "name") 
    sortedItems.sort(sortByName);
  else if (sortBy === "category") 
    sortedItems.sort(sortByCategory);
    return (
    <div>
      <div className="flex mb-7 gap-2">
        <button
          type="button"
          onClick={() => {
            setSortBy("name");
          }}
          className={`w-36 h-16 rounded-md font-bold transition text-amber-400 border-2 ${
            sortBy === "name" 
              ? "bg-slate-800 border-gray-500"
              : "bg-slate-500 hover:bg-blue-300 border-gray-500"
          }`}
        >
          Sort by
          <br />
          Name
        </button>

        <button
          type="button"
          onClick={() => {
            setSortBy("category");
          }}
          className={`w-36 h-16 rounded-md font-bold transition text-amber-400 border-2 ${
            sortBy === "category"
              ? "bg-slate-800 border-gray-500"
              : "bg-slate-500 hover:bg-blue-300 border-gray-500"
          }`}
        >
          Sort by
          <br />
          Category
        </button>

      </div>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <Item key={item.id} item={item} onSelect={onItemSelect} />
        ))}
      </ul>
    </div>
  );
}


