import Link from "next/link";
import React from "react";
import RealMe from "./RealMe";

export default function NavBar() {
  return (
    <div className="flex justify-between px-3 items-baseline border-b-[1px] border-white pt-2 mb-3 sticky top-0 -ml-[0.9rem] bg-black shadow-white z-50 shadow-md transition-all ease-out duration-75 ">
      {" "}
      <span className="h-10 w-10 border-2 invisible"> <RealMe/> </span>
      <Link href={"/posts"} className="flex justify-center items-baseline gap-1">
        <img
          className="w-9 h-10"
          src="https://media.discordapp.net/attachments/1098638167827030016/1124755728830316696/crop.png?width=530&height=580"
          alt=""
        />
        <h1 className="text-center font-bold text-2xl">rear</h1>
      </Link>
      <span className="h-10 w-10"> <RealMe/> </span>
    </div>
  );
}
