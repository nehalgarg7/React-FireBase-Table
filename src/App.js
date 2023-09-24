import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { getDatabase, ref, set } from 'firebase/database';
// import { app } from "./firebase";
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Error from "./pages/Error";
// import { useFirebase } from "../context/Firebase.jsx";

//DataBase Conn
//const db = getDatabase(app);
var uid = "";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    console.log("Main" + uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function App() {
  // const firebase = useFirebase();
  return (

    <div className="App">
      <ToastContainer position='top-center' />
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/add" element={<AddEdit></AddEdit>}></Route>
        <Route path={`/update/:uid/:id`} element={<AddEdit></AddEdit>}></Route>
        <Route path={`/view/:uid/:id`} element={<View></View>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path="/*" element={
          <Error></Error>
        }></Route>
      </Routes>
    </div>

  );
}

export default App;
