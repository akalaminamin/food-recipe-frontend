import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [foods, setFoods] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFood/")
      .then((res) => setFoods(res.data));
  }, [isDelete]);

  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/allFood/${id}`)
      .then((res) => {
        if(res.data.acknowledged){
          alert("delete successfull");
          setDelete(true)
        }else{
          setDelete(false)
        }
      });
  };
  return (
    <div className="container my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {foods.map((food) => (
          <div key={food._id} className="shadow-md p-2 bg-white rounded-sm">
            <div className="overflow-hidden relative group cursor-pointer">
              <img
                className="cursor-pointer transition-all ease-in duration-200 hover:scale-110"
                src={food.RecipeImage}
                alt="product"
              />
            </div>
            <h2 className="uppercase my-2 font-semibold text-md  font-openSans">
              {food.recipeName}
            </h2>
            <div className="flex justify-between space-x-2">
            <button
              className="py-1 w-full rounded-sm uppercase bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => handleDetails(food._id)}
            >
              Details
            </button>
            <button
              className="py-1 w-full rounded-sm uppercase bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => handleDelete(food._id)}
            >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
