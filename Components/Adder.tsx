"use client";

import { useRef, useState } from "react";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { serverTimestamp, addDoc, collection, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { storage } from "@/firebase.config";
import { useAuth } from "@/AuthContext";
import { db } from "@/firebase.config";

export default function Adder() {
  const [tagState, setTagstate] = useState<String>("");
  const [capState, setCapstate] = useState<any>("");
  const [imgState, setImgState] = useState<any>("");
  const [loadState, setLoadState] = useState<number>(0)

  const { currentUser }: any = useAuth();



  const submitHandler = (e : any) => {
    e.preventDefault();
    if(capState.trim().length > 70){
      alert("Caption exceeds character limit");
      return;
    }else if(capState.trim().length == 0){
      alert("Please enter caption");
      return;
    }
    else if(tagState.length === 0){
      alert("Please Select Media");
      return;
    }
    const file = imgState;
    if (!file) {
        alert('Please Select Your File')
      return;
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLoadState(progress);
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const docData = {
            createdAt: serverTimestamp(),
            caption: capState.trim(),
            createdBy: currentUser.uid,
            media: file.type.includes("image") ? "image" : "video",
            mediaURL: downloadURL,
            points: 0,
            tags: [tagState],
        };
        console.log(docData.media);
        const docRef = collection(db, "Post");
        const snap = await addDoc(docRef, docData);
        const userRef = doc(db, "Users", currentUser.uid);
        await updateDoc(userRef, {
          investedIn: arrayUnion(tagState)
        })
        console.log(snap.id);
        location.reload();
      }
    );
  }

  return (
    <div className="">
      <div className="text-center font-semibold text-xl mb-3">Add Your Work</div>
      <form
        onSubmit={submitHandler}
      >
        <div className="flex gap-4 my-3">
          <button
            onClick={(e: any) => {
              e.preventDefault();
              setTagstate("videography");
            }}
            className={`${tagState === "videography" ? "text-black bg-white font-semibold border-2 border-black" : "text-white bg-black"} px-2 py-1 transition-all duration-75 ease-in-out rounded-md`}
          >
            VideoGraphy{" "}
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              setTagstate("illustrator");
            }}
            className={`${tagState === "illustrator" ? "text-black bg-white font-semibold border-2 border-black" : "text-white bg-black"} px-2 py-1 transition-all duration-75 ease-in-out rounded-md`}
          >
            Illustrator{" "}
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              setTagstate("painting");
            }}
            className={`${tagState === "painting" ? "text-black bg-white font-semibold border-2 border-black" : "text-white bg-black"}  px-2 py-1 transition-all duration-75 ease-in-out rounded-md`}
          >
            Painting{" "}
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              setTagstate("photography");
            }}
            className={`${tagState === "photography" ? "text-black bg-white font-semibold border-2 border-black" : "text-white bg-black"}  px-2 py-1 transition-all duration-75 ease-in-out rounded-md`}
          >
            PhotoGraphy{" "}
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              setTagstate("dancing");
            }}
            className={`${tagState === "dancing" ? "text-black bg-white font-semibold border-2 border-black" : "text-white bg-black"} px-2 py-1 transition-all duration-75 ease-in-out rounded-md`}
          >
            Dancing{" "}
          </button>
        </div>
        <div className="my-3">
          <input
            className="bg-black pl-2 w-full rounded-md h-10"
            placeholder="Add Your Caption"
            type="text"
            onChange={(e: any) => {
              e.preventDefault();
              setCapstate(e.target.value);
            
            }}
            value={capState}
          />
          <div className={`${capState.trim().length <= 70 ? "text-white" : "text-red-700"} mt-1`}>Remaining Characters: {capState.trim().length <=70 ? 70 - capState.trim().length : 0}</div>
        </div>
        <input 
          className="file:rounded-lg file:border-2 file:border-black file:font-semibold border-white border-[1px] px-1 py-1 rounded-lg"
          type="file"
          accept="image/*, video/*"
          onChange={(e: any) => {
            e.preventDefault();
            setImgState(e.target.files[0]);
          }}
        />
        <button  type="submit" className="text-black bg-white font-semibold border-2 border-black px-3 py-1 rounded-3xl mt-3 text-center mb-3 w-full"><div>Submit</div></button>
        {loadState > 0 && <div className="text-center my-3">Uploaded Data - {loadState}%</div> }
      </form>
    </div>
  );
}
