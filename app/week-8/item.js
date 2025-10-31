export default function Item({ item, onSelect }) {
const { name, quantity, category } = item;
return (
    <li 
    onClick={()=> onSelect(item)} 
    className="bg-slate-700 hover:bg-blue-300 text-white p-3 shadow rounded-md transition-all duration-200 ease-out hover:scale-105 hover:-translate-5 hover:shadow-lg">
    <h2 className="text-2xl font-bold">{name}</h2>
    <p className="text-sm">Buy {quantity} in {category}</p>
    </li>
);
}
