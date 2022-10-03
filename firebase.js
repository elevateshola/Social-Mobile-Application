
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { getStorage } from "firebase/storage"
import {initializeFirestore} from "firebase/firestore"
import { createContext } from "react/cjs/react.production.min";

const firebaseConfig = {
  apiKey: "AIzaSyDyh_hztCwafarG01-yMVSs5i_aAk7sUvE",
  authDomain: "social-2b88a.firebaseapp.com",
  projectId: "social-2b88a",
  storageBucket: "social-2b88a.appspot.com",
  messagingSenderId: "353127863094",
  appId: "1:353127863094:web:ea121a73a6789e66b81997",
  measurementId: "G-5J0D5CZG0N"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true})

export const signIn = (auth, email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
};

export const signUp = (email, password)=>{
    return createUserWithEmailAndPassword(email, password)
}
