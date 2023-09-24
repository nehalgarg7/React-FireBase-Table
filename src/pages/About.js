import React, {useState} from 'react';
import Header from '../components/Header';
import "../css/About.css";

function About() {

  return (
    <>
    <Header></Header>
    <div style={{marginTop: "150px"}}>
        <h2>
        This is an assignment given by the 
            <br />
            <h1 style={{marginTop: "4px"}}>Bharat One Care</h1>
            {/* <img src='logo.png' alt="BharatOne Logo" /> */}
        </h2>

        
        <div className="user-details">
          <table>
            <thead>
              <td colSpan="2"> My Details </td>
            </thead>
            <tr>
              <td><strong>Name</strong></td>
              <td>Nehal Garg</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td><a href='mailto:nehalgarg37@gmail.com'>nehalgarg37@gmail.com</a></td>
            </tr>
            <tr>
              <td><strong>Phone No </strong></td>
              <td>7759800660,<br></br>
              8094189739</td>
            </tr>
          </table>
        </div>
    </div>
    </>
  )
}

export default About