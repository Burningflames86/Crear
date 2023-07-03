
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';

export default async function UserCover(props:any) {

    const docRef = query(
        collection(db, "Post"),
        where("createdBy", "==", props.uid),
        orderBy("points")
      );

    const doc = await getDocs(docRef);
    console.log(doc.docs[0].data());

  return (
    <div>UserCover</div>
  )
}
