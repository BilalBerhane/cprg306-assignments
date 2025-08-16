"use client";

import { useState, useMemo } from "react";
import Item from "./item";
import itemsData from "./items.json";
import { Bebas_Neue } from "next/font/google";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] });

function bgFor(cat) {
  const c = cat.toLowerCase();
  if (c.includes("bakery"))
    return "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,0.08), transparent), radial-gradient(800px 400px at 90% 10%, rgba(255,200,150,0.10), transparent)";
  if (c.includes("dairy"))
    return "radial-gradient(1000px 600px at 20% -10%, rgba(200,220,255,0.10), transparent), radial-gradient(800px 400px at 90% 10%, rgba(255,255,255,0.06), transparent)";
  if (c.includes("produce"))
    return "radial-gradient(1000px 600px at 10% -10%, rgba(160,255,200,0.10), transparent), radial-gradient(800px 400px at 85% 15%, rgba(120,200,160,0.08), transparent)";
  if (c.includes("meat"))
    return "radial-gradient(1000px 600px at 10% -10%, rgba(255,150,150,0.10), transparent), radial-gradient(800px 400px at 85% 15%, rgba(255,90,90,0.08), transparent)";
  if (c.includes("household"))
    return "radial-gradient(1000px 600px at 10% -10%, rgba(200,200,200,0.08), transparent), radial-gradient(800px 400px at 85% 15%, rgba(255,255,255,0.05), transparent)";
  if (c.includes("dry"))
    return "radial-gradient(1000px 600px at 12% -12%, rgba(255,230,170,0.10), transparent), radial-gradient(800px 400px at 82% 12%, rgba(255,210,120,0.08), transparent)";
  if (c.includes("canned"))
    return "radial-gradient(1000px 600px at 12% -12%, rgba(200,240,255,0.10), transparent), radial-gradient(800px 400px at 82% 12%, rgba(120,200,255,0.08), transparent)";
  return "radial-gradient(1000px 600px at 20% -10%, rgba(255,255,255,0.07), transparent), radial-gradient(800px 400px at 90% 10%, rgba(255,255,255,0.05), transparent)";
}

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = useMemo(() => {
    if (sortBy === "name") return [...itemsData].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "category") return [...itemsData].sort((a, b) => a.category.localeCompare(b.category));
    return itemsData;
  }, [sortBy]);

  const grouped = useMemo(() => {
    if (sortBy !== "group") return null;
    const groups = itemsData.reduce((acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    }, {});
    return Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .map((cat) => ({
        category: cat,
        items: groups[cat].sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }, [sortBy]);

  const btn = "rounded-full border px-4 py-2 text-xs md:text-sm tracking-wide uppercase transition";
  const active = "bg-zinc-100 text-zinc-900 border-zinc-100";
  const inactive = "bg-transparent text-zinc-200 border-zinc-700 hover:border-zinc-500";

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-6 md:py-8">
        <div className="flex flex-wrap gap-2">
          <button className={`${btn} ${sortBy === "name" ? active : inactive}`} onClick={() => setSortBy("name")}>
            Sort by Name
          </button>
          <button className={`${btn} ${sortBy === "category" ? active : inactive}`} onClick={() => setSortBy("category")}>
            Sort by Category
          </button>
          <button className={`${btn} ${sortBy === "group" ? active : inactive}`} onClick={() => setSortBy("group")}>
            Group by Category
          </button>
        </div>
      </section>

      {sortBy === "group" ? (
        <section className="px-0">
          <div className="snap-y snap-mandatory">
            {grouped.map((g, idx) => (
              <section key={g.category} className="relative min-h-[92vh] snap-start flex items-center overflow-hidden">
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    backgroundImage: bgFor(g.category),
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 -z-10 bg-zinc-950/55 backdrop-blur-[1px]" />
                <div className="mx-auto max-w-4xl px-6 w-full">
                  <div className="mb-6 md:mb-8">
                    <div className="text-sm text-zinc-500 uppercase tracking-[0.3em]">Chapter {idx + 1}</div>
                    <h2 className={`${display.className} text-4xl md:text-6xl font-extrabold tracking-tight capitalize leading-[0.95] mt-2`}>
                      {g.category}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {g.items.map((it) => (
                      <Item key={it.id} name={it.name} quantity={it.quantity} category={it.category} />
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <ul className="space-y-2">
            {sortedItems.map((it) => (
              <Item key={it.id} name={it.name} quantity={it.quantity} category={it.category} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
