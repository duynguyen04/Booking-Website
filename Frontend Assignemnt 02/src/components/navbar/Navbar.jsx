import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/store";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const username = useSelector((state) => state.username);
  console.log("username", username);
  return (
    <div>
      {username && (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <span>{username}</span>
              <button
                className="navButton"
                onClick={() => navigate(`/trans/${username}`)}
              >
                transaction
              </button>
              <button
                className="navButton"
                onClick={() => {
                  dispatch(authAction.logout());
                  // navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {!username && (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <button className="navButton" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
              <button className="navButton" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
