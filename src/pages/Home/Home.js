import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { FacebookShareButton, FacebookIcon } from "react-share";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
const Home = () => {
  const [foods, setFoods] = useState([]);
  const [favouritFoods, setFavouriteFood] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    axios
      .get("https://warm-coast-40997.herokuapp.com/allFood")
      .then((res) => setFoods(res.data));
  }, []);
  let newArray = [];
  useEffect(() => {
    axios
      .get("https://warm-coast-40997.herokuapp.com/favourite")
      .then((res) => {
        res.data.forEach((favourite) => {
          console.log(favourite.userEmail);
          newArray.push(favourite.recipeName);
        });
        setFavouriteFood(newArray);
      });
  }, []);
  
  console.log(favouritFoods);
  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };

  const handleFavourite = (food) => {
    if (favouritFoods.length > 0) {
      if (favouritFoods.includes(food?.recipeName)) {
        Swal.fire("Already added", "Already Favourite Added", "warning");
        return;
      } else {
        food.status = "favourite";
        food.userEmail = currentUser?.email;
        delete food._id;
        axios
          .post(`https://warm-coast-40997.herokuapp.com/favourite`, food)
          .then((res) => {
            console.log(res.data);
            if (res.data.acknowledged) {
              Swal.fire("Favourite!", "Added Favourite Success", "success");
              navigate("/favourite");
            }
          });
      }
    }
  };
  return (
    <div className="container py-10 bg-gray-50">
      <div className="inline-block hero-wrapper">
        <img
          className="w-11/12 my-4 rounded-lg"
          src="https://recipe-book-51ad3.web.app/static/media/banner.a2ea514c7dbc832f056b.jpg"
          alt="hero area"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {!foods.length ? (
          <Loader />
        ) : (
          foods.map((food) => (
            <>
              <div key={food._id} className="shadow-md p-2 bg-white rounded-sm">
                <div className="overflow-hidden relative group cursor-pointer">
                  <img
                    className="image-style"
                    src={food.RecipeImage}
                    alt="product"
                  />
                  <span className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 text-2xl text-indigo-700 p-2 transition-all ease-in-out duration-300">
                    <span
                      className="absolute top-4 right-5"
                      onClick={() => handleFavourite(food)}
                    >
                      <AiFillHeart />
                    </span>
                  </span>
                  <span className="absolute top-14 right-4">
                    <FacebookShareButton
                      url={`https://recipeapp-86c94.web.app/food/details/${food._id}`}
                      quote={food.recipeName}
                    >
                      <FacebookIcon size={30} />
                    </FacebookShareButton>
                  </span>
                </div>
                <h2 className="uppercase my-2 font-semibold  font-openSans">
                  {food.recipeName}
                </h2>
                <p className="my-2 font-openSans">Category: {food.category}</p>
                <button
                  className="py-1 w-full text-md inline-block rounded-md uppercase bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => handleDetails(food._id)}
                >
                  Details
                </button>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
