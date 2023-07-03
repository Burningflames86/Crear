"use client";

import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";


export default function LogOut() {
  const { logout }: any = useAuth();

  const router = useRouter();


  const logoutHandler = async (e: any) => {
    e.preventDefault();
    alert("Logged Out Sucessfully")
    await logout();
    router.push("/");
  };


  return <button className="text-3xl hover:text-slate-500" onClick={logoutHandler}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>;
}
