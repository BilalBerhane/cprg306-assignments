"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [grouped, setGrouped] = useState(false);

  const sortByName = (a, b) => a.name.localeCompare(b.name);
  const sortByCategory = (a, b) => a.category.localeCompare(b.category);

  
  let sortedItems = [...itemsData];
  if (sortBy === "name") {
    sortedItems.sort(sortByName);
  } else if (sortBy === "category") {
    sortedItems.sort(sortByCategory);
  }

  
  const groupedItems = sortedItems.reduce((acc, item) => {
    const cat = item.category;
    (acc[cat] ||= []).push(item);
    return acc;
  }, {});

  
  const sortedCategoryKeys = Object.keys(groupedItems).sort();

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <button
          type="button"
          onClick={() => {
            setGrouped(false);
            setSortBy("name");
          }}
          className={`w-36 h- rounded-md font-bold transition text-amber-400 border- ${
            sortBy === "name" && !grouped
              ? "bg-slate-800 border-black"
              : "bg-slate-700 border-gray-500"
          }`}
        >
          Sort by
          <br />
          Name
        </button>

        <button
          type="button"
          onClick={() => {
            setGrouped(false);
            setSortBy("category");
          }}
          className={`w-36 h-16 rounded-md font-bold transition text-amber-400 border-2 ${
            sortBy === "category" && !grouped
              ? "bg-slate-800 border-black"
              : "bg-slate-700 border-gray-500"
          }`}
        >
          Sort by
          <br />
          Category
        </button>

        <button
          type="button"
          onClick={() => setGrouped(true)}
          className={`w-36 h-16 rounded-md font-bold transition text-amber-400 border-2 ${
            grouped ? "bg-slate-800 border-black" : "bg-slate-700 border-gray-500"
          }`}
        >
          Group by
          <br />
          Category
        </button>
      </div>

      
      {!grouped ? (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id ?? `${item.name}-${item.category}`}
              item={item}
            />
          ))}
        </ul>
      ) : (
        
        <div className="space-y-6">
          {sortedCategoryKeys.map((category) => (
            <div key={category} className="bg-slate-700 rounded-md p-4">
              <h2 className="text-amber-400 font-bold text-lg mb-2 capitalize">
                {category}
              </h2>
              <ul className="space-y-2">
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id ?? `${item.name}-${category}`}
                    item={item}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
