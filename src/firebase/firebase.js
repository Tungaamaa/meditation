import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyA8XjfmwEKCFtoLICDFgYp9quoTCYmILzM",
//   authDomain: "reactproject-99509.firebaseapp.com",
//   projectId: "reactproject-99509",
//   storageBucket: "reactproject-99509.appspot.com",
//   messagingSenderId: "858353004423",
//   appId: "1:858353004423:web:361e2ffba657b304b52d22",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
 };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();

const database = getFirestore(app);
const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const commentCollection = collection(database, "comments");
const subscribeCollection = collection(database, "subscribe");

export {
  auth,
  usersCollection,
  blogsCollection,
  storage,
  commentCollection,
  subscribeCollection,
};
