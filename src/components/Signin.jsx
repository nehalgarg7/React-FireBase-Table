import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
import "boxicons";

function Signin() {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .signinUserWithEmailAndPassword(email, password)
      .then(() => {
        toast.success("LoggedIn Successfully");
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
      });
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  return (
    <div class="container signupbody">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register"> Register</Link>
            </p>
          </div>
        </form>
        <hr />
        <button class="btn" onClick={firebase.signinWithGoogle} id="btn-google">
          Signin With Your Google Account
        </button>
      </div>
    </div>
  );
}

export default Signin;
