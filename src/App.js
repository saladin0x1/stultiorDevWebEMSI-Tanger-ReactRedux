import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaHome } from "react-icons/fa"; // Icons for Login, Register, and Home

import "bootstrap/dist/css/bootstrap.min.css";  // Bootstrap
import "./App.css";  // Custom CSS file for custom styles

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar navbar-expand navbar-dark">
        {/* Brand Name (Dumber) */}
        <Link to={"/"} className="navbar-brand">
          Dumber
        </Link>
        {/* Navbar Links Section */}
        <div className="navbar-nav mr-auto">
          {/* Home link with icon */}
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <FaHome /> Home
            </Link>
          </li>

          {/* Show these links if the user has moderator role */}
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {/* Show these links if the user has admin role */}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {/* Show this link if the user is logged in */}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {/* If user is logged in, display Profile and Logout options */}
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          // If user is not logged in, show Login and Sign Up options as icons
          <div className="navbar-nav ml-auto">
            {/* Login icon for Login link */}
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <FaSignInAlt /> Login
              </Link>
            </li>

            {/* Sign Up icon for Register link */}
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <FaUserPlus /> Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      {/* Routes for different components */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
