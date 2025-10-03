"use client";

import { useState } from "react";

export default function NewItem() {
    const [count, setCount] = useState(1);

    const increment = () => {
        if (count <20) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
        const buttonClass = (disabled) => {
                let classes = "px-4 py-2 rounded-md text-lg font-bold text-white transition";
                if (disabled) {
                    classes += " bg-gray-300 cursor-not-allowed";
                } 
                else {
                    classes += " bg-blue-500 hover:bg-blue-600";
                }
                return classes;
            };
        
        return (
        <div className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-md">
            <span className="px-4 py-2 border rounded-md text-lg font-semibold">
                {count}
            </span>
            
            <button onClick={decrement} disabled={count === 1} className={buttonClass(count === 1)}>
                −
            </button>
            
             <button onClick={increment} disabled={count === 20} className={buttonClass(count === 20)}>
                +
            </button>
        </div>
        
    );
}