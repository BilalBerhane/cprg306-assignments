import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="mb-6 flex items-center justify-between border-b pb-3">
      <Link href="/" className="font-semibold">STEER Starter</Link>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/my" className="hover:underline">My Rides</Link>
      </div>
    </nav>
  );
}
