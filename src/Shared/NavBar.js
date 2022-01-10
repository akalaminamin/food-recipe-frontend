import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/food">Food</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/favourite">Favourite</Link>
      <Link to="/addRecipe">Add Recipe</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default NavBar;
