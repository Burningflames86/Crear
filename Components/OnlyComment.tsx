import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.config";

import Voter from "./Voter";

import Link from "next/link";

export default async function OnlyComment(props: any) {
  const docRef = doc(db, "Users", props.createdBy);
  const docSnap = await getDoc(docRef);
  const userData: any = docSnap.data();
  return (
    <>
      <div
        className={`max-w-[49rem] mx-auto px-3 py-2 rounded-lg my-3 ${
          userData?.role === "Maker"
            ? "bg-black text-white shadow-none"
            : "bg-white border-2 border-black text-black shadow-md shadow-rose-700"
        }`}
      >
        <div className="flex flex-row-reverse items-end justify-end text-xs gap-3">
          <Link
            href={`/users/${props.createdBy}`}
            className={`hover:underline ${
              userData?.role === "Maker"
                ? "font-normal text-base"
                : "font-bold text-lg"
            }`}
          >
            <div className={`flex ${userData?.role == "Maker" ? "items-end" : "items-baseline" }  gap-1`}>
              {" "}
              <span>{userData?.name}</span>{" "}
              {userData?.premium == true && (
                <img
                  className="h-7 w-7 border-2 rounded-full border-orange-600 shadow-orange-600 shadow-md"
                  src="https://media.discordapp.net/attachments/1098638167827030016/1125017197706752111/20230702_162434_0000-removebg-preview.png?width=586&height=586"
                  alt=""
                />
              )}{" "}
              {userData?.role == "Recruiter" && (
                <img
                  className="h-5 w-5"
                  src="https://media.discordapp.net/attachments/1098638167827030016/1124755728830316696/crop.png?width=526&height=586"
                  alt=""
                />
              )}{" "}
            </div>
          </Link>
          <div className="h-7 w-7 rounded-full">
            <img className="rounded-full h-full w-full" src={userData?.pfp} />
          </div>
        </div>
        <div
          className={`${
            userData?.role === "Maker" ? "font-normal" : "font-semibold"
          }`}
        >
          {props.content}
        </div>
        {userData?.role === "Maker" && (
          <Voter
            role={userData?.role}
            id={props.postID}
            cID={props.cID}
            need="Comments"
          />
        )}
      </div>
    </>
  );
}
