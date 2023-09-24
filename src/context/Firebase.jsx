import { createContext, useContext, useState, useEffect } from "react";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXh7z1BMwE3ilu_4K4jsz-eag0c4jGQLY",
  authDomain: "bharat-one-care-8d8bf.firebaseapp.com",
  projectId: "bharat-one-care-8d8bf",
  storageBucket: "bharat-one-care-8d8bf.appspot.com",
  messagingSenderId: "618523547605",
  appId: "1:618523547605:web:a608764e8eed1af0a48f5c",
  measurementId: "G-XJKFQT1WQZ",
  databaseURL: "https://bharat-one-care-8d8bf-default-rtdb.firebaseio.com",
};


const firebaseApp = initializeApp(firebaseConfig);
export const app = firebaseApp

const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);


  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;
  // const putData = (key, data) => set(ref(database, key), data);

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
