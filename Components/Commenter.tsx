"use client";

import { useState } from "react";
import { useAuth } from "@/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase.config";

export default function Commenter(props: any) {
  const [inputValue, setInputValue] = useState("");
  const { currentUser, isLoading }: any = useAuth();

  const docRef = collection(db, "Post", props.postID, "Comments");

  const handleChange = (event: any) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const NewComment = {
      points: 0,
      content: inputValue,
      createdBy: currentUser?.uid,
    };
    await addDoc(docRef, NewComment);
    console.log("Added");
    location.reload();
  };

  return (
    <>
      {currentUser && !isLoading && (
        <form className="mx-auto my-4 w-[49rem] rounded-lg shadow-sm shadow-[#686868a8] border-[#6868686a] border-[1px]" onSubmit={submitHandler}>
          <label>
            <input
              className="bg-black w-full rounded-lg h-24 outline-none px-3"
              type="text"
              placeholder="Add Your Comment..."
              value={inputValue}
              onChange={handleChange}
            />
            <div className="py-1.5">
              <button className="w-full" type="submit">
                Add
              </button>
            </div>
          </label>
        </form>
      )}
    </>
  );
}
