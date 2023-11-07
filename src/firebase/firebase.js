import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA8XjfmwEKCFtoLICDFgYp9quoTCYmILzM",
  authDomain: "reactproject-99509.firebaseapp.com",
  projectId: "reactproject-99509",
  storageBucket: "reactproject-99509.appspot.com",
  messagingSenderId: "858353004423",
  appId: "1:858353004423:web:361e2ffba657b304b52d22"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const database = getFirestore(app);
const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const storage = getStorage();
const commentCollection = collection(database, "comments");
const subscribeCollection = collection(database, "subscribe");

export {auth, usersCollection, blogsCollection, storage, commentCollection, subscribeCollection};

