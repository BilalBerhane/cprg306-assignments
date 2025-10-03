import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center p-8">
      <h1 className="text-5xl fort-bold text-orange-900">
        Shopping List
      </h1>
      <div className="w-full max-w-lg">
        <ItemList />
      </div>
    </main>
  );
}