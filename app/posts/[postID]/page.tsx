import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.config";
import AllPosts from "@/Components/AllPosts";
import TagSelector from "@/Components/TagSelector";
import Banner from "@/Components/Banner";
import NavBar from "@/Components/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Post',
}


export default async function Posts({params}: any) {
  const docRef = doc(db, "Post", params.postID);
  const docSnap = await getDoc(docRef);




  return (
    <>
    <div className="flex gap-10">
        <TagSelector />
        <div>
        <NavBar />

        <AllPosts caption={docSnap.data()!.caption} media={docSnap.data()!.media} mediaURL={docSnap.data()!.mediaURL} id={docSnap.id} createdBy={docSnap.data()!.createdBy} tags={docSnap.data()!.tags} canOpen={false}/>
        </div><Banner />
    </div>
    </>
  );
}
