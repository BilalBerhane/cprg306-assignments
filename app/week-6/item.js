export default function Item({ item }) {
  const { name, quantity, category } = item;
  return (
    <li className="bg-[#1e293b] text-white p-3 shadow">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">Buy {quantity} in {category}</p>
    </li>
  );
}