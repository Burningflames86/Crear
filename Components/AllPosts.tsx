import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.config";
import Commenter from "./Commenter";
import Comments from "./Comments";
import Voter from "./Voter";
import Link from "next/link";

export default async function AllPosts(props: any) {
  const docRef: any = doc(db, "Users", props.createdBy);
  const user: any = await getDoc(docRef);
  const pfp = user.data()?.pfp;

  return (
    <div className="bg-[#0e0e0e] max-w-[60rem] -ml-4">
    <div className="flex flex-row-reverse justify-end gap-3 items-end px-2">
      <Link href={`/users/${user.data()?.uid}`} className="text-sm flex items-end gap-1 hover:underline"><span>{user.data()?.name}</span> {user.data()?.premium == true && <img className="h-7 w-7 border-2 rounded-full border-orange-600 shadow-orange-600 shadow-md" src="https://media.discordapp.net/attachments/1098638167827030016/1125017197706752111/20230702_162434_0000-removebg-preview.png?width=586&height=586" alt="" />} </Link>
      <Link href={`/users/${user.data()?.uid}`}>{pfp && <img src={pfp} className="w-10 h-10 rounded-full" alt="RIYAL CAN CONFIRM" />}</Link>
      </div>
      <div className="mt-3 px-2">{props.tags.map((item: string, i:number) => (
        <Link className="bg-blue-400 rounded-lg p-1 text-base" href={`/tags/${item}`} key={i}>#{item}</Link>
      ))}
      </div>
    <div className="text-xl pt-1 font-medium mx-2 max-w-[45rem]">{props.caption} </div>

      
    
      <div className="px-2">
        {props.media === "video" ? (
          <video width="800" className="rounded-lg" controls src={props.mediaURL}></video>
        ) : (
          <img className="rounded-lg w-[50rem]" style={{aspectRatio: "auto"}} src={props.mediaURL} />
        )}
      </div>
      <div className="flex flex-row-reverse gap-7 mt-2 justify-end px-2">
      <Voter id={props.id} need="Post" />
      {props.canOpen && <Link className="text-xl" href={`/posts/${props.id}`}><i className="fa-regular fa-message hover:text-fuchsia-700"></i></Link>}
      {!props.canOpen && <div className="text-xl"><i className="fa-solid fa-message text-fuchsia-700"></i></div>}
      </div>
      <div>
        {!props.canOpen && <Commenter postID={props.id} />}
        {!props.canOpen && <Comments postID={props.id} />}
      </div>
    </div>
  );
}
