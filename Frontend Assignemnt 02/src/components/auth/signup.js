import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  // const [status, setstatus] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userRef.current.value);

    fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({
        username: userRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          // setstatus(true);
          navigate("/login");
        } else {
          // setstatus(false);
          alert("username da ton tai");
        }
      });
  };
  // console.log(status);
  return (
    <div>
      <Navbar />
      <div className="Signup">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler} className="form_ault">
          <div className="fromInput">
            <input
              type="text"
              name="username"
              id="username"
              ref={userRef}
            ></input>
          </div>
          <div className="fromInput">
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            ></input>
          </div>
          <button type="submit" className="btnsign">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
