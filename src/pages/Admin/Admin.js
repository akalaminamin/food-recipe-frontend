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
    <div>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter admin email"
          onChange={handleChange}
        />
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default Admin;
