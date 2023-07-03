"use client";
import {
  doc,
  onSnapshot,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase.config";
import { useAuth } from "@/AuthContext";

export default function Voter(props: any) {
  const [points, setPoints] = useState<number>(0);
  const [pointstate, setPointstate] = useState<string>();
  const { currentUser, isLoading }: any = useAuth();

  let q: any;

  if (!isLoading && currentUser) {
    q = query(collection(db, "Users"), where("uid", "==", currentUser.uid));
  }

  useEffect(() => {
    const docRef: any =
      props.need === "Post"
        ? doc(db, "Post", props.id)
        : doc(db, "Post", props.id, props.need, props.cID);
    const unsub = onSnapshot(docRef, (doc: any) => {
      setPoints(doc.data()!.points);
    });

    return () => unsub();
  }, [props.id, props.need, props.cID]);

  useEffect(() => {
    if (!isLoading && currentUser) {
    const unsub = onSnapshot(doc(db, "Users", currentUser.uid), (doc: any) => {
      if (
        doc
          .data()
          .upvotedPost.includes(props.need === "Post" ? props.id : props.cID)
      ) {
        setPointstate("Up");
      } else if (
        doc
          .data()
          .downvotedPost.includes(props.need === "Post" ? props.id : props.cID)
      ) {
        setPointstate("Down");
      } else {
        setPointstate("None");
      }
    });
    return () => unsub();
  }
  }, [currentUser, isLoading, props.cID, props.id, props.need]);

  async function upvoteHandler() {
    const docsnap: any = await getDocs(q);
    const upvotedPost = docsnap.docs[0].data().upvotedPost;
    const downvotedPost = docsnap.docs[0].data().downvotedPost;

    const pointsRef: any =
      props.need === "Post"
        ? doc(db, "Post", props.id)
        : doc(db, "Post", props.id, props.need, props.cID);
    const ongodfrid: any = props.need === "Post" ? props.id : props.cID;


    if (
      !upvotedPost.includes(ongodfrid) &&
      !downvotedPost.includes(ongodfrid)
    ) {
      await updateDoc(pointsRef, {
        points: points + 1,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        downvotedPost: arrayRemove(ongodfrid),
        upvotedPost: arrayUnion(ongodfrid),
      });
    } else if (
      !upvotedPost.includes(ongodfrid) &&
      downvotedPost.includes(ongodfrid)
    ) {
      await updateDoc(pointsRef, {
        points: points + 2,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        downvotedPost: arrayRemove(ongodfrid),
        upvotedPost: arrayUnion(ongodfrid),
      });
    } else {
      await updateDoc(pointsRef, {
        points: points - 1,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        downvotedPost: arrayRemove(ongodfrid),
        upvotedPost: arrayRemove(ongodfrid),
      });
    }
    console.log(pointstate)
  }
  const downvoteHandler = async () => {
    const docsnap: any = await getDocs(q);
    const upvotedPost = docsnap.docs[0].data().upvotedPost;
    const downvotedPost = docsnap.docs[0].data().downvotedPost;

    const pointsRef: any =
      props.need === "Post"
        ? doc(db, "Post", props.id)
        : doc(db, "Post", props.id, props.need, props.cID);
    const ongodfrid: string = props.need === "Post" ? props.id : props.cID;

    if (
      !downvotedPost.includes(ongodfrid) &&
      !upvotedPost.includes(ongodfrid)
    ) {
      await updateDoc(pointsRef, {
        points: points - 1,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        upvotedPost: arrayRemove(ongodfrid),
        downvotedPost: arrayUnion(ongodfrid),
      });
    } else if (
      !downvotedPost.includes(ongodfrid) &&
      upvotedPost.includes(ongodfrid)
    ) {
      await updateDoc(pointsRef, {
        points: points - 2,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        upvotedPost: arrayRemove(ongodfrid),
        downvotedPost: arrayUnion(ongodfrid),
      });
    } else {
      await updateDoc(pointsRef, {
        points: points + 1,
      });

      await updateDoc(doc(db, "Users", docsnap.docs[0].id), {
        downvotedPost: arrayRemove(ongodfrid),
        upvotedPost: arrayRemove(ongodfrid),
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button onClick={upvoteHandler}>
          <svg
            className={`hover:stroke-fuchsia-700 ${pointstate=="Up" ? "fill-fuchsia-700 stroke-fuchsia-700" : "fill-black stroke-white"}`}
            height="24"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m4 14h2 2v3 4c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-5-2h1 3c.385 0 .734-.221.901-.566.166-.347.12-.758-.12-1.059l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10c-.24.301-.286.712-.12 1.059.167.345.516.566.901.566z" />
          </svg>
        </button>
        {pointstate=="Up" && <div className="text-fuchsia-700">{points}</div>}
        {pointstate=="Down" && <div className="text-red-700">{points}</div>}
        {pointstate=="None" && <div className="text-white">{points}</div>}
        <button onClick={downvoteHandler}>
          <svg
            height="24"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            className={`rotate-180 hover:stroke-red-700  ${pointstate=="Down" ? "fill-red-700 stroke-red-700" : "fill-black stroke-white"}`}
          >
            <path d="m4 14h2 2v3 4c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-5-2h1 3c.385 0 .734-.221.901-.566.166-.347.12-.758-.12-1.059l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10c-.24.301-.286.712-.12 1.059.167.345.516.566.901.566z" />
          </svg>
        </button>
      </div>
    </>
  );
}
