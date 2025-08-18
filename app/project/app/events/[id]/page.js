import events from "@/data/events.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import RideSection from "@/components/RideSection";

export function generateStaticParams() {
  return events.map(e => ({ id: e.id }));
}

export default function EventPage({ params }) {
  const event = events.find((e) => e.id === params.id);
  if (!event) return notFound();
  const date = new Date(event.date).toLocaleString();

  return (
    <>
      <Link href="/" className="text-sm underline">← Back</Link>
      <h1 className="mt-2 text-xl font-semibold">{event.title}</h1>
      <p className="text-sm text-gray-700">{date} · {event.venue}</p>
      <p className="text-sm text-gray-700">{event.address}</p>
      <p className="mt-2">{event.description}</p>

      <RideSection eventId={event.id} />
    </>
  );
}
