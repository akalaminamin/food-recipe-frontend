import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState([]);
  useEffect(() => {
    axios
      .get(`https://warm-coast-40997.herokuapp.com/allFood/${id}`)
      .then((res) => setFood(res.data));
  }, []);
  return (
    <div className="container my-5">
      <div className="mx-auto md:w-7/12 w-12/12">
      <div className="flex justify-center px-5 py-8 shadow-xl">
        <img className="w-40 mr-5" src={food.RecipeImage} alt="food" />
        <div className="space-y-2">
          <h2 className="text-2xl font-inter font-bold">Food Name: {food.recipeName}</h2>
          <h4 className="text-xl font-openSans">Category: {food.category}</h4>
          <p className="text-xl font-openSans">Method: {food.method}</p>
          <p className="text-xl font-openSans">Ingradients: {food.ingredients}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FoodDetails;
