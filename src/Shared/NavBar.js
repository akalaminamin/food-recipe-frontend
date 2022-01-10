import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
const NavBar = () => {
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState([]);
  const { currentUser, logout } = useAuth();
  const handleLogOut = () => {
    logout();
    setShow(!show);
  };

  useEffect(() => {
    axios.get("https://warm-coast-40997.herokuapp.com/admin").then((res) => {
      const userAdmin = res.data.find(
        (admin) => admin?.email === currentUser?.email
      );
      setAdmin(userAdmin);
    });
  }, []);
  console.log(admin);
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
          <Link to="/">
            <h2 className="uppercase font-inter font-bold text-lg">
              Food Recipe
            </h2>
          </Link>
          <nav className="md:ml-auto flex items-center flex-wrap text-base justify-start cursor-pointer flex-col md:flex-row space-y-4 md:space-y-0">
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
              to="/favourite"
              className="nav-link"
              onClick={() => setShow(!show)}
            >
              Favourite
            </Link>
            {!currentUser?.email ? (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setShow(!show)}
                >
                  Login
                </Link>
              </>
            ) : currentUser?.email && admin ? (
              <>
                <Link
                  to="/admin"
                  className="nav-link"
                  onClick={() => setShow(!show)}
                >
                  Admin
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
              </>
            ) : null}
            {currentUser?.email ? (
              <Link to="/login" className="nav-link" onClick={handleLogOut}>
                Logout
              </Link>
            ) : null}
            <Avatar name={"demo"} size="40" round={true} />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
