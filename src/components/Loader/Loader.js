import React from "react";
import loader from "../../Images/loader.gif";
const Loader = () => {
  return (
    <div className="loader flex items-center justify-center">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
