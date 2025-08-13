import Shoppinglist from "./shoppinglist";

export default function Page() {
  const items = [
    { name: "milk, 4 L 🥛", quantity: 1, category: "dairy" },
    { name: "bread 🍞", quantity: 2, category: "bakery" },
    { name: "eggs, dozen 🥚", quantity: 2, category: "dairy" },
    { name: "bananas 🍌", quantity: 6, category: "produce" },
    { name: "broccoli 🥦", quantity: 3, category: "produce" },
    { name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "meat" },
    { name: "pasta sauce 🍝", quantity: 3, category: "canned goods" },
    { name: "spaghetti, 454 g 🍝", quantity: 2, category: "dry goods" },
    { name: "toilet paper, 12 pack 🧻", quantity: 1, category: "household" },
    { name: "paper towels, 6 pack", quantity: 1, category: "household" },
    { name: "dish soap 🍽️", quantity: 1, category: "household" },
    { name: "hand soap 🧼", quantity: 4, category: "household" },
  ];

  return (
    <main>
      <h1>Shopping List</h1>
      {items.map((it, i) => (
        <Shoppinglist
          key={i}
          name={it.name}
          quantity={it.quantity}
          category={it.category}
        />
      ))}
    </main>
  );
}
