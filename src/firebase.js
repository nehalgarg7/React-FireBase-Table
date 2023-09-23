import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD277phVJIr1bPTqu0KgDdMj1wmsCGGdr0",
  authDomain: "table-ce3d8.firebaseapp.com",
  projectId: "table-ce3d8",
  storageBucket: "table-ce3d8.appspot.com",
  messagingSenderId: "992779164548",
  appId: "1:992779164548:web:5ec1456b330ab04c029bd1",
  databaseURL : "https://table-ce3d8-default-rtdb.firebaseio.com"
};


export const app = initializeApp(firebaseConfig);