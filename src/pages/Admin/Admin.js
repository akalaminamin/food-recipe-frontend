import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin", admin)
      .then((res) => console.log(res.data));
  };
  return (
    <div className="container my-5">
      <h2 className="font-inter py-3 text-2xl text-gray-800 ">Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 space-x-3">
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            className="search-input col-span-10"
            onChange={handleChange}
          />
          <button type="submit" className="btn col-span-2">
            Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
