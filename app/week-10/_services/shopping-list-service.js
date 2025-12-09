import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId) {
  const itemsColRef = collection(db, "users", userId, "items");
  const q = query(itemsColRef);

  const snapshot = await getDocs(q);
  const items = [];

  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
}

export async function addItem(userId, item) {
  const itemsColRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsColRef, {
    name: item.name,
    quantity: item.quantity,
    category: item.category,
  });

  return docRef.id;
}