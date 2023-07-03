"use client";

import { useAuth } from "@/AuthContext";
import { useState, useEffect, useRef } from "react";
import {
  onSnapshot,
  doc,
  collection,
  where,
  query,
  orderBy,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import TagSelector from "@/Components/TagSelector";
import Banner from "@/Components/Banner";
import Link from "next/link";
import Adder from "@/Components/Adder";
import Voter from "@/Components/Voter";
import NavBar from "@/Components/NavBar";
import LogOut from "@/Components/LogOut";



export default function Page() {
  const [postData, setPostData] = useState<any>([]);
  const [userData, setuserData] = useState<any>({});
  const { currentUser, isLoading }: any = useAuth();
  const [descstate, setDescState] = useState<any>("");
  const [linkstate, setLinkState] = useState<any>("");
  const addRef = useRef<any>();


  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && currentUser) {
        const docRef = query(
          collection(db, "Post"),
          where("createdBy", "==", currentUser.uid),
          orderBy("points")
        );
        let data: any = [];
        const docSnap = await getDocs(docRef);
        docSnap.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        setPostData(data);
        console.log("Hello");
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup logic");
    };
  }, [isLoading, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && currentUser) {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setuserData(docSnap.data());
        console.log("Hello");
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup logic");
    };
  }, [isLoading, currentUser]);

  const descHandler = async (e: any) => {
    e.preventDefault();
    if (descstate.trim().length < 5) {
      alert("Description too small");
      return;
    } else if (descstate.trim().length > 50) {
      alert("Description too Large");
      return;
    }
    const docRef = doc(db, "Users", currentUser.uid);
    await updateDoc(docRef, {
      desc: descstate.trim(),
    });
    location.reload();
  };

  const handleDiscChange = async (event: any) => {
    event.preventDefault();
    setDescState(event.target.value);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    setLinkState(event.target.value);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company|groups|edu)\/([\w-]{1,50})\/?$/i;
    if (linkedInRegex.test(linkstate)) {
      const docRef = doc(db, "Users", currentUser.uid);
      await updateDoc(docRef, {
        linkedin: linkstate,
      });
      location.reload();
    } else {
      alert("Invalid Link");
    }
  };

  // console.log(userData.investedIn)

  return (
    <>
    {!isLoading && currentUser && <div>
      <div className="flex gap-10">
        <TagSelector />
        <div className="w-[60rem] -ml-4">
        <NavBar />

          <div className="flex text-5xl font-bold items-end gap-3">
            <img
              className="h-32 w-32 rounded-full border-2 border-white shadow-lg shadow-[#675379e3]"
              src={userData.pfp}
              alt=""
            />
            <div>{userData.name}</div>
          </div>
          <div className="text-3xl my-3">{userData.desc}</div>
          {!userData.desc && (
            <div className="my-3">
              <span className="text-sm">
                Enter your description and press enter:{" "}
              </span>
              <form onSubmit={descHandler}>
                <input
                  className="bg-black border-white border-[1px] rounded-md pl-3 w-80"
                  value={descstate}
                  onChange={handleDiscChange}
                />
              </form>
            </div>
          )}

          {userData.linkedin ? (
            <a target="_blank" href={userData.linkedin}>
              {" "}
              <div> LinkedIn</div>
            </a>
          ) : (
            <div className="my-3">
              <span className="text-sm">
                Paste your LinkedIn profile here and press enter:{" "}
              </span>
              <form onSubmit={submitHandler}>
                <input
                  className="bg-black border-white border-[1px] rounded-md pl-3"
                  value={linkstate}
                  onChange={handleChange}
                />
              </form>
            </div>
          )}
          <span>Invested In: </span>

          {userData &&
            userData.investedIn &&
            userData.investedIn.length > 0 &&
            userData.investedIn.map((item: any, i: any) => (
              <Link href={`/tags/${item}`} key={i}>
                #{item}{" "}
              </Link>
            ))}

          {userData &&
            userData.investedIn &&
            userData.investedIn.length === 0 && <span>Nothing</span>}

          <div> Mail at: {userData.mail}</div>

          <div className="flex justify-center my-3"> 
            <button onClick={() => {addRef.current.style.display="block"; console.log("ASD")}} className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-black text-3xl font-bold transition-all duration-75 ease-out hover:bg-black hover:text-white hover:scale-125 border-2 border-white hovertext-4xl ">
              +
            </button>
            </div>

            <div className="flex justify-end mx-3">
              <LogOut />
            </div>

          {postData ? (
            postData.reverse().map((item: any) => (
              <div className="bg-[#0e0e0e] mt-3" key={item.id}>
                <div className="flex flex-row-reverse justify-end gap-3 items-end px-2">
                  <Link
                    href={`/users/${userData.uid}`}
                    className="text-sm hover:underline"
                  >
                    {userData.name}
                  </Link>
                  <Link href={`/users/${userData.uid}`}>
                    {userData.pfp && (
                      <img
                        src={userData.pfp}
                        className="w-10 h-10 rounded-full"
                        alt="RIYAL CAN CONFIRM"
                      />
                    )}
                  </Link>
                </div>
                <div className="mt-3 px-2">
                  {item.tags.map((element: any, i: any) => (
                    <Link
                      className="bg-blue-400 rounded-lg p-1 text-base"
                      href={`/tags/${element}`}
                      key={i}
                    >
                      #{element}
                    </Link>
                  ))}
                </div>
                <div className="text-xl pt-1 font-medium mx-2 max-w-[50rem]">
                  {item.caption}
                </div>

                <div className="px-2">
                  {item.media === "video" ? (
                    <video
                      width="800"
                      className="rounded-lg"
                      controls
                      src={item.mediaURL}
                    ></video>
                  ) : (
                    <img
                      className="rounded-lg w-[50rem]"
                      style={{ aspectRatio: "auto" }}
                      src={item.mediaURL}
                    />
                  )}
                </div>
                <div className="flex flex-row-reverse gap-7 mt-2 justify-end px-2">
                  <Voter id={item.id} need="Post" />

                  <Link className="text-xl" href={`/posts/${item.id}`}>
                    <i className="fa-regular fa-message hover:text-fuchsia-700"></i>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-[48rem] mt-10 font-bold text-xl text-center top-0">
              You Haven&apos;t Posted Anything Yet!
            </div>
          )}
         
        </div>
        <Banner />
      </div>
      <div style={{display: "none"}} ref={addRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#282626] px-4 rounded-lg">
        <div className="text-right mt-1 text-xl"><button onClick={() => {addRef.current.style.display="none"}} className="text-right"><i className="fa-solid fa-xmark"></i></button></div>
        <Adder />
      </div>
    </div>}
    </>
  );
}
