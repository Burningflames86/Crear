"use client"

import { useAuth } from "@/AuthContext";
import Link from "next/link";

export default function RealMe() {
    const {isLoading, currentUser}:any = useAuth();
  return (
    <>
        {!isLoading && currentUser && 
            <Link href="/myself" > <img className="border-fuchsia-600 border-2 shadow-md shadow-fuchsia-700 rounded-full" src={currentUser.photoURL} alt="" /></Link>
        }
    </>
  )
}
