import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Food = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFood")
      .then((res) => setFoods(res.data));
  }, []);
  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };

  const handleFavourite = (id) => {
    axios
    .get(`http://localhost:5000/allFood/${id}`)
    .then((res) => console.log(res.data));
  };

  return (
    <div>
      {foods.map((food) => (
        <div key={food._id}>
          <img src={food.RecipeImage} alt="recipe image" />
          <h2>name: {food.name}</h2>
          <p>author: {food.author}</p>
          <p>method: {food.method}</p>
          <p>category: {food.category}</p>
          <p>ingredients: {food.ingredients}</p>
          <p>recipeName: {food.recipeName}</p>
          <button onClick={() => handleFavourite(food._id)}>
            add Favourite
          </button>
          <button onClick={() => handleDetails(food._id)}>Details</button>
        </div>
      ))}
    </div>
  );
};

export default Food;
