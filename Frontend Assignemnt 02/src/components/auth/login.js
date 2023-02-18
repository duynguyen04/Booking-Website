import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/store";

const Login = () => {
  const dispatch = useDispatch();
  //   const username = useSelector((state) => state.username);
  const navigate = useNavigate();
  // const [status, setstatus] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email: userRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(authAction.login(data));
          navigate("/");
        } else {
          // setstatus(false);
          alert("sai tai khoan hoac mat khau");
        }
      });
  };
  // console.log(status);
  return (
    <div>
      <Navbar />
      <div className="Signup">
        <h1>Login</h1>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
