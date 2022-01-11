import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { FacebookShareButton, FacebookIcon } from "react-share";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/allFood").then((res) => {
      setFoods(res.data);
      setSearchText(res.data);
    });
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    const matchedFoods = foods.filter((food) =>
      food?.recipeName?.toLowerCase().includes(value.toLowerCase())
    );
    setSearchText(matchedFoods);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const matchedFoods = foods.filter((food) =>
      food?.category?.toLowerCase().includes(value.toLowerCase() || searchText)
    );
    setSearchText(matchedFoods);
    if (!matchedFoods.length) {
      setSearchText(foods);
    }
  };

  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };

  const handleFavourite = (food) => {
    food.status = "favourite";
    food.userEmail = currentUser?.email;
    console.log(food);
    axios.post(`http://localhost:5000/favourite`, food).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        alert("add favourite item in favourite page");
        navigate("/favourite");
      }
    });
  };
  return (
    <div className="container my-5">
      <div className="text-center">
        <h2 className="font-inter py-3 text-2xl text-gray-800 ">
          Search Your Favourite Food
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-8 space-x-3">
          <input
            type="text"
            placeholder="Search Your Product"
            className="search-input col-span-6"
            onChange={handleFilter}
          />
          <select
            name="category"
            className="search-input col-span-2"
            onChange={handleChange}
            required
          >
            <option value="select">Select</option>
            <option value="vagan">vagan</option>
            <option value="diet">diet</option>
            <option value="dessert">dessert</option>
            <option value="cookies">cookies</option>
            <option value="fastfood">fastfood</option>
            <option value="drinks">drinks</option>
            <option value="Meat">Meat</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {searchText.map((food) => (
          <div key={food._id} className="shadow-md p-2 bg-white rounded-sm">
            <div className="overflow-hidden relative group cursor-pointer">
              <img
                className="transition-all ease-in duration-200 hover:scale-110"
                src={food.RecipeImage}
                alt="product"
              />
              <span
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 text-2xl text-indigo-700 p-2 transition-all ease-in-out duration-300"
                onClick={() => handleFavourite(food)}
              >
                <span className="absolute top-14 right-4">
                  <FacebookShareButton
                    url={`https://recipe-book-51ad3.web.app/food/details/${food._id}`}
                    quote={food.recipeName}
                  >
                    <FacebookIcon size={30} />
                  </FacebookShareButton>
                </span>
                <span className="absolute top-4 right-5">
                  <AiFillHeart />
                </span>
              </span>
            </div>
            <h2 className="uppercase my-2 font-semibold text-md  font-openSans">
              {food.recipeName}
            </h2>
            <p className="my-2 font-openSans">Category: {food.category}</p>
            <button className="btn" onClick={() => handleDetails(food._id)}>
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
