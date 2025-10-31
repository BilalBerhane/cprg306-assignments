import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-500 flex flex-col items-center p-15">
      <h1 className="text-5xl font-bold text-yellow-400 mb-15">
        Shopping List
      </h1>

      <div className="w-full max-w-lg">
        <ItemList />
      </div>
    </main>
  );
}


