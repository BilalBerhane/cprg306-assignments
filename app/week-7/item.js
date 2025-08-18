"use client";

export default function Item({ name, quantity, category }) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 hover:bg-zinc-900/70 transition">
      <div>
        <p className="font-medium text-zinc-100">{name}</p>
        <p className="text-sm text-zinc-400">
          Category: <span className="capitalize">{category}</span>
        </p>
      </div>
      <span className="inline-flex min-w-10 items-center justify-center rounded-md border border-zinc-700 px-2 py-1 text-sm text-zinc-200">
        x{quantity}
      </span>
    </li>
  );
}
