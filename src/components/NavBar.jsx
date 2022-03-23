import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../redux/slices/modeSlice";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.value);

  const handleClick = () => {
    dispatch(switchMode());
  };

  return (
    <div className={`nav-container-${mode}`}>
      <div className="nav-logo">
        <h1>Weather App</h1>
      </div>
      <div className="nav-links">
        <Link to="./" className={`nav-link-${mode}`}>
          Home
        </Link>
        <Link to="/favorites" className={`nav-link-${mode}`}>
          Favorites
        </Link>
        <div className={`nav-link-${mode}`} onClick={handleClick}>
          {mode === "light" ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
