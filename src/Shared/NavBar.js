import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="sticky top-0 z-50">
      <div className="text-xl pl-4 py-3 bg-white md:hidden block">
        <span onClick={() => setShow(!show)}>
          <FiMenu />
        </span>
      </div>
      <header
        className={`text-gray-600 body-font ${
          !show ? "hidden" : ""
        } bg-white shadow-md border-b h-80 md:h-16 px-3 md:flex items-start !pl-0 md:items-center transition-all origin-left duration-300 ease-in`}
      >
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-start md:items-center">
          <nav className="md:mr-auto flex flex-wrap text-base justify-start cursor-pointer flex-col md:flex-row space-y-4 md:space-y-0">
            <Link
              to="/"
              className="nav-link mt-3 md:mt-0"
              onClick={() => setShow(!show)}
            >
              Home
            </Link>
            <Link
              to="/food"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Food
            </Link>
            <Link
              to="/admin"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Admin
            </Link>
            <Link
              to="/favourite"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Favourite
            </Link>
            <Link
              to="/addRecipe"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Add Recipe
            </Link>
            <Link
              to="/profile"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
