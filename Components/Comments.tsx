import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase.config";
import OnlyComment from "./OnlyComment";

export default async function Comments(props: any) {
  const docRef = collection(db, "Post", props.postID, "Comments");
  const docSnap: any = await getDocs(query(docRef, orderBy("points")));

  return (
    <>
      {docSnap.docs[0]?.data ? (
        docSnap.docs
          .reverse()
          .map((item: any) => (
            <OnlyComment
              key={item.id}
              postID={props.postID}
              cID={item.id}
              content={item.data().content}
              createdBy={item.data().createdBy}
            />
          ))
      ) : (
        <div>No Comments</div>
      )}
    </>
  );
}
