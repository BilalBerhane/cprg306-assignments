import events from "@/data/events.json";
import Link from "next/link";

function fmt(d) { return new Date(d).toLocaleString(); }

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">Events</h1>
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.id} className="rounded border p-3">
            <h2 className="text-lg font-medium">
              <Link href={`/events/${e.id}`} className="hover:underline">{e.title}</Link>
            </h2>
            <p className="text-sm text-gray-700">{fmt(e.date)} · {e.venue}</p>
            <p className="text-sm text-gray-700">{e.address}</p>
            <p className="mt-1 text-sm">{e.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
