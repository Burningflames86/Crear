import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase.config";
import AllPosts from "@/Components/AllPosts";
import TagSelector from "@/Components/TagSelector";
import Banner from "@/Components/Banner";
import NavBar from "@/Components/NavBar";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
}

export default async function Posts() {
  const docRef = collection(db, "Post");
  const docSnap = await getDocs(query(docRef, orderBy("points")));
  let obj: object[] = [];

  docSnap.forEach((doc) => {
    obj.push({ ...doc.data(), id: doc.id });
  });

  return (
    <>
    <div className="flex gap-x-10">
      
      <TagSelector />
      <div>
        <NavBar />
      {obj.reverse().map((element: any) => (
       <div key={element.id} className="grid items-center justify-center my-3">
       <AllPosts caption={element.caption} media={element.media} mediaURL={element.mediaURL} id={element.id} createdBy={element.createdBy} tags={element.tags} canOpen={true}/>
        </div>
      ))}
      </div>
      <Banner />
    </div>
    </>
  );
}
