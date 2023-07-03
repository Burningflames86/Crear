import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD0Pu_kpdzPjdR9LrucCe3PPokhayv5hNU",
  authDomain: "decagon-b0ad9.firebaseapp.com",
  projectId: "decagon-b0ad9",
  storageBucket: "decagon-b0ad9.appspot.com",
  messagingSenderId: "571158038874",
  appId: "1:571158038874:web:0176d785a03094ecba0b63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export {db};