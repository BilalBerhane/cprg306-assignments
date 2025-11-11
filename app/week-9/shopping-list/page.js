"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const router = useRouter();
  const { user } = useUserAuth();

  // If not logged in, send to landing page
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  // Optionally render nothing or a tiny placeholder while we check/redirect
  if (user === null) {
    return null;
  }

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    const itemWithId = {
      id: Math.random().toString(36).substring(2, 9),
      ...newItem,
    };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

    const cleanItemName = (name) => {
  return name
    .replace(/[^\p{L}\p{N}\s]/gu, "")  
    .replace(/\d+(\s*(kg|g|l|ml|pack|packs|dozen))?/gi, "") 
    .split(",")[0]                     
    .trim()                            
    .toLowerCase();                    
};

  const handleItemSelect = (item) => {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  };

  return (
    <main className="min-h-screen bg-slate-800 flex flex-col md:flex-row justify-center items-start gap-10 py-10 px-4">
      {/* Left: Shopping List + Form */}
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
          Shopping List + Meal Ideas
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <div className="mt-8">
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
      </div>

      {/* Right: Meal Ideas */}
      <div className="w-full max-w-md">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}