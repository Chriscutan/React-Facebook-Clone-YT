import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGVgZUCncqykhVR4Z_lIkVFSLd_hFQyg0",
  authDomain: "react-facebook-clone-904dd.firebaseapp.com",
  projectId: "react-facebook-clone-904dd",
  storageBucket: "react-facebook-clone-904dd.appspot.com",
  messagingSenderId: "153985860916",
  appId: "1:153985860916:web:dcbfbd1ac34e5a02541161",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
