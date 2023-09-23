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

//DataBase Conn
//const db = getDatabase(app);

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <ToastContainer position='top-center' />
     <Routes>
      <Route exact path = "/" element = {<Home></Home>}></Route>
      <Route path = "/add" element = {<AddEdit></AddEdit>}></Route>
      <Route path='/update/:id' element = {<AddEdit></AddEdit>}></Route>
      <Route path='/view/:id' element = {<View></View>}></Route>
      <Route path='/about' element = {<About></About>}></Route>
     </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
