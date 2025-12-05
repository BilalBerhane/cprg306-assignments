"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleIncrement = () => {
    setQuantity(quantity < 20 ? quantity + 1 : quantity);
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      quantity: quantity,
      category: category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const isDecrementDisabled = quantity === 1;
  const isIncrementDisabled = quantity === 20;

  const decrementButtonClass = `w-10 h-10 rounded text-white text-xl font-bold ${
    isDecrementDisabled
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-slate-500 hover:bg-blue-300"
  }`;

  const incrementButtonClass = `w-10 h-10 rounded text-white text-xl font-bold ${
    isIncrementDisabled
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-slate-500 hover:bg-blue-300"
  }`;

  return (
    <form onSubmit={handleSubmit} className="bg-slate-700 p-4 shadow-md w-full max-w-md">
      <input
        type="text"
        placeholder="e.g., milk, 4 L 🥛"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-500 hover:bg-blue-300 rounded p-2 mb-4 text-amber-400"
      />

      <div className="flex items-center space-x-2 mb-4">
        
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          className={decrementButtonClass}
        >
          −
        </button>

        <span className="rounded-full w-10 h-10 flex items-center justify-center text-lg font-extrabold text-amber-400 bg-slate-500">
          {quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          className={incrementButtonClass}
        >
          +
        </button>

        <select
          value={category}
          onChange={handleCategoryChange}
          className="ml-auto rounded p-2 text-amber-400 bg-slate-500 hover:bg-blue-300 w-40 focus:bg-slate-500"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-500 hover:bg-blue-300 text-amber-400 py-2 rounded-md"
      >
        Add Item
      </button>
    </form>
  );
}
