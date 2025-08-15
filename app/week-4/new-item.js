"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  function increment() {
    if (quantity < 20) {
      setQuantity(quantity + 1)
    }
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#2B633E" }}>
      <div className="p-6 max-w-sm rounded-xl shadow-md flex flex-col items-center space-y-4 text-yellow-400">
        
        <span className="text-2xl font-bold">{quantity}</span>
        <div className="flex space-x-6">
          <button
            onClick={decrement}
            disabled={quantity === 1}
            className={`text-yellow-500 text-4xl font-bold px-3 py-12 rounded-lg border-2 border-yellow-400 ${quantity === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black"}`}
          >
            −
          </button>
          <button
            onClick={increment}
            disabled={quantity === 20}
            className={`text-yellow-400 text-4xl font-bold px-3 py-12 rounded-lg border-2 border-yellow-400 ${quantity === 20 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black"}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
