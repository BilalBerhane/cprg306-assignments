import ItemList from "./item-list";
import { Bebas_Neue } from "next/font/google";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <h1 className={`${display.className} text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight`}>
            Shopping list
            <span className="block text-zinc-400 text-lg md:text-xl font-normal mt-4">
              Minimal, high-contrast sections with big type
            </span>
          </h1>
        </div>
      </section>
      <ItemList />
    </main>
  );
}
