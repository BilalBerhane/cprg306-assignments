"use client";

import { useUserAuth } from "../_utils/auth-context";
export default function page() {
    const { user } = useUserAuth();
    if (!user) {
        return(
            
            <div className ="min-h-screen flex justify-center items-center bg-slate-800">
                <p className="text-center font-bold text-[#982939]">
                    This page is only accessible by logged in users </p>
            </div>
        )
    }
    return (
        <div className ="min-h-screen flex flex-col justify-center items-center bg-slate-800">
            <p className="text-center text-[#982939] mb-8 text-xl">
            Welcome, <strong>{user.displayName}</strong> ({user.email})
            </p>
            <p>
            <img src={user.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full " />
            </p>
        </div>
    );
}
