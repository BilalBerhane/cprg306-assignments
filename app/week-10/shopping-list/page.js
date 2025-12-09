"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const router = useRouter();
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Redirect to login if user is null
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  // Load shopping list from Firestore
  useEffect(() => {
    const loadItems = async () => {
      if (!user) return;
      const data = await getItems(user.uid);
      setItems(data);
    };

    loadItems();
  }, [user]);

  if (user === null) {
    return null;
  }

  const handleAddItem = async (newItem) => {
    if (!user) return;

    const id = await addItem(user.uid, newItem);
    const itemWithId = {
      id,
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
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
          Shopping List + Meal Ideas
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <div className="mt-8">
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
      </div>

      <div className="w-full max-w-md">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
