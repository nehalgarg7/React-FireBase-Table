import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

function Signup() {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup");
    await firebase
      .signupUserWithEmailAndPassword(email, password)
      .then(() => {
        toast("Successfully Registered");
      })
      .catch((err) => {
        toast("Invalid Credentials");
      });
    navigate("/login");
    console.log("Successful");
  };

  return (
    <div className="signupbody">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1 id="heading">Register</h1>
          <div className="input-box">
            <input
              type="email"
              className="text"
              placeholder="Email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <div id="userId">
              <box-icon type="solid" name="user" id="userId"></box-icon>
            </div>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <box-icon type="solid" name="lock-alt"></box-icon>
          </div>

          <button type="submit" class="btn">
            Create an account
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/login" id="link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
