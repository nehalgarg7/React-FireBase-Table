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
  apiKey: "AIzaSyD277phVJIr1bPTqu0KgDdMj1wmsCGGdr0",
  authDomain: "table-ce3d8.firebaseapp.com",
  projectId: "table-ce3d8",
  storageBucket: "table-ce3d8.appspot.com",
  messagingSenderId: "992779164548",
  appId: "1:992779164548:web:5ec1456b330ab04c029bd1",
  databaseURL: "https://table-ce3d8-default-rtdb.firebaseio.com",
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
