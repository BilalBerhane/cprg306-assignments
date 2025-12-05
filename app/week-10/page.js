"use client";

import Link from "next/link"; 
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 space-y-4 bg-slate-900">
      {!user ? (
        <button
          onClick={gitHubSignIn}
          className="bg-slate-700 hover:bg-blue-300 text-white p-3 rounded-md shadow"
        >
          Sign in with GitHub
        </button>
      ) : (
        <>
          <p className="text-center text-white">
            Welcome, <strong>{user.displayName}</strong> ({user.email})
          </p>
          <p>
            <img src={user.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full mx-auto" />
          </p>

          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/week-9/shopping-list"
              className="bg-slate-700 hover:bg-blue-300 text-white p-3 rounded-md shadow inline-block"
            >
              Go to Shopping List
            </Link>

            <button
              onClick={firebaseSignOut}
              className="bg-slate-700 hover:bg-blue-300 text-white p-3 rounded-md shadow"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </main>
  );
}
