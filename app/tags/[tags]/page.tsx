import { query, where, collection, getDocs, orderBy } from "firebase/firestore";  
import { db } from "@/firebase.config";
import AllPosts from "@/Components/AllPosts";
import TagSelector from "@/Components/TagSelector";
import Banner from "@/Components/Banner";
import NavBar from "@/Components/NavBar";
 

 
export function metadata(){
  

  return {
    title: "Posts",
  }
}

export default async function Tags({params}: any) {

    const postref = collection(db, "Post")
    const q = query(postref, where('tags', 'array-contains', params.tags), orderBy("points"));
    const querySnapshot = await getDocs(q);

    const posts: object[] = [];

    querySnapshot.forEach((doc) => {
        posts.push({...doc.data(), id:doc.id});
      });


  return (
    <>
    <div className="flex gap-10">
    <TagSelector ontag={params.tags} />
    <div>
    <NavBar />

    {posts.reverse().map((element: any) => (
        <div key={element.id} className="grid items-center justify-center my-3">
        <AllPosts caption={element.caption} media={element.media} mediaURL={element.mediaURL} id={element.id} createdBy={element.createdBy} tags={element.tags} canOpen={true}/>
        </div>
       ))}
    </div>
    <Banner />
    </div>
    </>
  )
}
