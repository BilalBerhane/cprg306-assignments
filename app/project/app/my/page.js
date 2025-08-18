"use client";

import events from "@/data/events.json";
import { useEffect, useState } from "react";
import Link from "next/link";

function loadMy() {
  try { return JSON.parse(localStorage.getItem("my") || '{"created":[],"joined":[]}'); }
  catch { return { created: [], joined: [] }; }
}
function loadRides(eventId) {
  try { return JSON.parse(localStorage.getItem(`rides:${eventId}`) || "[]"); }
  catch { return []; }
}

export default function MyRidesPage() {
  const [my, setMy] = useState({ created: [], joined: [] });

  useEffect(() => { setMy(loadMy()); }, []);

  function renderList(list) {
    if (!list || list.length === 0) return <p className="text-sm text-gray-700">Nothing here yet.</p>;
    return (
      <ul className="space-y-2">
        {list.map((item, idx) => {
          const ev = events.find(e => e.id === item.eventId);
          const rides = loadRides(item.eventId);
          const ride = rides.find(r => r.id === item.rideId);
          if (!ev || !ride) return null;
          return (
            <li key={idx} className="rounded border p-2 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-gray-700">
                    Driver: {ride.driverName} · {ride.time} · Seats {ride.seatsLeft}/{ride.seatsTotal}
                  </div>
                </div>
                <Link href={`/events/${ev.id}`} className="underline">View</Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold">My Rides</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded border p-3">
          <h2 className="font-medium">Created</h2>
          {renderList(my.created)}
        </div>
        <div className="rounded border p-3">
          <h2 className="font-medium">Joined</h2>
          {renderList(my.joined)}
        </div>
      </div>
    </>
  );
}
