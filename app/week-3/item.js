export default function Item({ item }) {
  const { name, quantity, category } = item;
  return (
    <li className="bg-[#4b810485] text-white p-4 rounded-md shadow mb-4">
      <h2 className="text-3xl font-bold">{name}</h2>
      <p className="text-sm">Buy {quantity} in {category}</p>
    </li>
  );
}