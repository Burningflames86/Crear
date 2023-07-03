import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";
import AllPosts from "@/Components/AllPosts";
import Link from "next/link";
import TagSelector from "@/Components/TagSelector";
import Banner from "@/Components/Banner";
import NavBar from "@/Components/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User',
}


export default async function Posts({params}: any) {
  const docRef = doc(db, "Users", params.users);
  const docSnap = await getDoc(docRef);

  const userRef = collection(db, "Post");
  const userSnap = await getDocs(query(userRef, where("createdBy", "==", params.users)));
  const posts: object[] = [];

    userSnap.forEach((doc) => {
        posts.push({...doc.data(), id:doc.id});
      });

  return (
    <>
    <div className="flex gap-10 mt-3">
    <TagSelector />
    <div>
    <NavBar />
      
      <div className="flex text-5xl font-bold items-end gap-3">
      <img className="h-32 w-32 rounded-full border-2 border-white shadow-lg shadow-[#675379e3]" src={docSnap.data()!.pfp} alt="" />
      <div className="flex items-end gap-3">
      <div>{docSnap.data()!.name}</div>
      {docSnap.data()!.premium == true && <img className="h-10 w-10 border-2 rounded-full border-orange-600 shadow-orange-600 shadow-md" src="https://media.discordapp.net/attachments/1098638167827030016/1125017197706752111/20230702_162434_0000-removebg-preview.png?width=586&height=586" alt="" />}
      {docSnap.data()!.role == "Recruiter" && <img className="h-10 w-10" src="https://media.discordapp.net/attachments/1098638167827030016/1124755728830316696/crop.png?width=526&height=586" alt="" />}
      </div>
      </div>
      <div className="text-xl my-3">{docSnap.data()!.desc}</div>
      <a target="_blank" href={docSnap.data()!.linkedin}> <div> LinkedIn</div></a>
      <span>Invested In: </span>
      {docSnap.data()!.investedIn.map((item:any, i:any) => (
        <Link href={`/tags/${item}`} key={i}> #{item} </Link>
      ))}
     <div> Mail at: {docSnap.data()!.mail}</div>
     {posts.length > 0 ?posts.reverse().map((element: any) => (
        <div  key={element.id} className="grid items-center justify-center my-3">
        <AllPosts caption={element.caption} media={element.media} mediaURL={element.mediaURL} id={element.id} createdBy={element.createdBy} tags={element.tags} canOpen={true}/>
        </div>
       )) : <div className="w-[48rem] mt-10 font-bold text-xl text-center top-0">
      Haven&apos;t Posted Anything Yet!
     </div> }
    </div>
    <Banner />
    </div>
    </>
  );
}
