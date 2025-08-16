"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function inc() {
    setQuantity((q) => (q < 20 ? q + 1 : q));
  }

  function dec() {
    setQuantity((q) => (q > 1 ? q - 1 : q));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = { name, quantity, category };
    console.log(item);
    alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
      <div>
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={dec}
            disabled={quantity <= 1}
            className="border rounded px-3 py-2 disabled:opacity-50"
          >
            -
          </button>
          <span className="min-w-[3rem] text-center text-lg">{quantity}</span>
          <button
            type="button"
            onClick={inc}
            disabled={quantity >= 20}
            className="border rounded px-3 py-2 disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-white"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded px-3 py-2"
      >
        Add Item
      </button>
    </form>
  );
}
