"use client";

import { useAuth } from "@/AuthContext";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { signInWithGoogle, currentUser, isLoading }: any = useAuth();

  const router = useRouter();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signInWithGoogle();
      const q = query(
        collection(db, "Users"),
        where("uid", "==", res.user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await setDoc(doc(db, "Users", res.user.uid), {
          name: res.user.displayName,
          role: "Maker",
          mail: res.user.email,
          pfp: res.user.photoURL,
          linkedin: "",
          totalUpvotes: 0,
          desc: "",
          uid: res.user.uid,
          upvotedPost: [],
          downvotedPost: [],
          investedIn: [],
          premium: false,
        });
      }
      router.push("/posts");
    } catch (error: any) {
      alert(error.message);
    }
  };

 

  return (
    <div className="grid grid-flow-row place-content-center mt-4">
      {!isLoading && !currentUser ? (
        <button
          onClick={loginHandler}
          className="h-28 w-28 rounded-full bg-white text-black text-3xl font-bold transition-all duration-75 ease-out hover:bg-black hover:text-white hover:scale-125 border-2 hover:border-[4px] border-white"
        >
          Login
        </button>
      ) : (
        <Link
          className="h-28 grid place-items-center w-28 text-center rounded-full bg-white text-black text-3xl font-bold transition-all duration-75 ease-out hover:bg-black hover:text-white hover:scale-125 border-2 hover:border-[4px] border-white"
          href="/posts"
        >
          <div>
          Get In</div>
        </Link>
      )}
    </div>
  );
}
