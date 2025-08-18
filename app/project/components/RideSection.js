"use client";

import { useEffect, useState } from "react";

function keyRides(eventId) { return `rides:${eventId}`; }
function loadRides(eventId) {
  try { return JSON.parse(localStorage.getItem(keyRides(eventId)) || "[]"); }
  catch { return []; }
}
function saveRides(eventId, rides) {
  localStorage.setItem(keyRides(eventId), JSON.stringify(rides));
}
function loadMy() {
  try { return JSON.parse(localStorage.getItem("my") || '{"created":[],"joined":[]}'); }
  catch { return { created: [], joined: [] }; }
}
function saveMy(my) { localStorage.setItem("my", JSON.stringify(my)); }
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

export default function RideSection({ eventId }) {
  const [rides, setRides] = useState([]);
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => { setRides(loadRides(eventId)); }, [eventId]);

  function addRide(e) {
    e.preventDefault();
    if (!name || !time || seats < 1 || seats > 6) return;
    const ride = { id: uid(), driverName: name.trim(), seatsTotal: seats, seatsLeft: seats, time: time.trim(), notes: notes.trim(), createdAt: Date.now() };
    const next = [ride, ...rides];
    setRides(next); saveRides(eventId, next);

    const my = loadMy(); my.created.push({ eventId, rideId: ride.id }); saveMy(my);

    setName(""); setSeats(1); setTime(""); setNotes("");
  }

  function joinRide(rideId) {
    const next = rides.map(r => r.id === rideId && r.seatsLeft > 0 ? { ...r, seatsLeft: r.seatsLeft - 1 } : r);
    setRides(next); saveRides(eventId, next);

    const changed = next.find(r => r.id === rideId);
    if (changed && changed.seatsLeft >= 0) { const my = loadMy(); my.joined.push({ eventId, rideId }); saveMy(my); }
  }

  return (
    <div className="mt-6 space-y-4">
      <form onSubmit={addRide} className="rounded border p-3 space-y-3">
        <h3 className="font-medium">Add a ride</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="block">Your name</span>
            <input className="mt-1 w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="block">Seats (1–6)</span>
            <input type="number" min={1} max={6} className="mt-1 w-full rounded border p-2"
                   value={seats} onChange={(e) => setSeats(parseInt(e.target.value || "1", 10))} required />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="block">Meeting time</span>
            <input className="mt-1 w-full rounded border p-2" placeholder="e.g., 5:30 PM at the main doors"
                   value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="block">Notes (optional)</span>
            <textarea className="mt-1 w-full rounded border p-2" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>
        <button className="rounded border px-3 py-2 text-sm">Post ride</button>
      </form>

      <div className="rounded border p-3">
        <h3 className="font-medium">Rides</h3>
        {rides.length === 0 ? (
          <p className="text-sm text-gray-700">No rides yet. Be the first to post one.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {rides.map((r) => (
              <li key={r.id} className="rounded border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.driverName}</div>
                    <div className="text-sm text-gray-700">{r.time} · Seats: {r.seatsLeft}/{r.seatsTotal}</div>
                    {r.notes && <div className="mt-1 text-sm">{r.notes}</div>}
                  </div>
                  <button className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                          disabled={r.seatsLeft <= 0} onClick={() => joinRide(r.id)}>
                    {r.seatsLeft > 0 ? "Join" : "Full"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
