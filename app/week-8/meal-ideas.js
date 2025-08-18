"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.meals || [];
}

async function fetchMealDetails(idMeal) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(idMeal)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.meals?.[0] || null;
}

function extractIngredients(meal) {
  if (!meal) return [];
  const out = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) out.push(`${(mea || "").trim()} ${ing.trim()}`.trim());
  }
  return out;
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setOpenId(null);
    setDetails({});
    fetchMealIdeas(ingredient).then(setMeals);
  }, [ingredient]);

  async function toggleDetails(idMeal) {
    if (openId === idMeal) { setOpenId(null); return; }
    if (!details[idMeal]) {
      const info = await fetchMealDetails(idMeal);
      setDetails((m) => ({ ...m, [idMeal]: info }));
    }
    setOpenId(idMeal);
  }

  return (
    <section className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">
      <h2 className="text-xl font-semibold">Meal ideas {ingredient ? `for “${ingredient}”` : ""}</h2>
      <ul className="mt-4 space-y-2">
        {meals.length === 0 && <li className="text-zinc-400 text-sm">Pick an item to see meals.</li>}
        {meals.map((m) => {
          const isOpen = openId === m.idMeal;
          const info = details[m.idMeal];
          const ing = extractIngredients(info);
          return (
            <li key={m.idMeal} className="rounded-lg border border-zinc-800/70 p-3">
              <button className="w-full text-left hover:underline" onClick={() => toggleDetails(m.idMeal)}>
                {m.strMeal}
              </button>
              {isOpen && info && (
                <div className="mt-3 text-sm">
                  <div className="text-zinc-400 mb-1">Ingredients</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {ing.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
