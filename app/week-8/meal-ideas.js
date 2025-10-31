"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
try {
    const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!res.ok) throw new Error("Failed to fetch meal ideas");
    const data = await res.json();
    return data.meals || [];
} catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
}
}

export default function MealIdeas({ ingredient }) {
const [meals, setMeals] = useState([]);

useEffect(() => {
    if (!ingredient) return;
    async function loadMealIdeas() {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
    }
    loadMealIdeas();
}, [ingredient]);

return (
    <div className="bg-slate-600 rounded-md shadow-md p-4 w-full max-w-md">
      {/* Title */}
    <h2 className="text-2xl font-bold mb-4 text-amber-400">
        Meal Ideas for <span className="capitalize">{ingredient}</span>
    </h2>

      {/* Conditional rendering messages */}
    {!ingredient && (
        <p className="text-amber-400">Select an item to see meal ideas.</p>
    )}

    {ingredient && meals.length === 0 && (
        <p className="text-amber-400">
        No meal ideas found for &quot;{ingredient}&quot;.
        </p>
    )}

      {/* Render meal list */}
    <ul className="space-y-3">
        {meals.map((meal) => (
        <li
            key={meal.idMeal}
            className="flex items-center bg-slate-700 rounded-md p-2 hover:bg-blue-300 transition"
        >
        <span className="font-semibold text-amber-400">{meal.strMeal}</span>
        </li>
        ))}
    </ul>
    </div>
);
}