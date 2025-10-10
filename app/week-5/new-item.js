"use client";
import { useState } from "react";
export default function NewItem() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");


    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


const buttonClass = (disabled) => {
        let classes = "px-4 py-2 rounded-md text-lg font-bold text-white transition";
        if (disabled) {
            classes += " bg-gold-500 cursor-not-allowed";
        } 
        else {
            classes += " bg-violet-300 hover:bg-red-300";
        }
            return classes;
        };

function handleSubmit(event) {
    event.preventDefault();
    const newItem = { name, quantity, category };
    console.log("New Item:", newItem);
    alert(
        `Added new item:
- Name: ${name}
- Quantity: ${quantity}
- Category: ${category}`
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
}
    return (
    <form 
        onSubmit={handleSubmit} className="max-w-md mx-auto bg-slate-700 p-4 rounded-md shadow-md space-y-3">
        <input
        type="text"
        required
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<div className="flex items-center justify-center gap-2">
<button
    type="button"
    onClick={decrement}
    disabled={quantity === 1}
    className={buttonClass(quantity === 1)}
>
    −
</button>

    <span className="bg-white text-black px-4 py-2 border rounded-md text-lg font-semibold">
    {quantity}
    </span>

<button
    type="button"
    onClick={increment}
    disabled={quantity === 20}
    className={buttonClass(quantity === 20)}
>
    +
    </button>
</div>  
<select
    value={category}
    onChange={(e) => setCategory(e.target.value)}   
    className="w-full bg-white text-black border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
<button
    type="submit"
    className="w-full bg-blue-300 text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-blue-400 transition"
>
    Add Item
</button>   
</form>
);
}