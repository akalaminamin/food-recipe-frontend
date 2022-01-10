import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Favourite = () => {
  const [foods, setFoods] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/allFood").then((res) => {
      const favouriteFood = res.data;
      setFoods(favouriteFood);
    });
  }, []);

  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };
  const handleRemoveFavourite = (id) => {
    axios.delete(`http://localhost:5000/allFood/${id}`).then((res) => {
      if (res.data.acknowledged) {
        alert("delete succesfull");
        setDelete(true);
      }
    });
  };
  console.log(foods);
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
          <button onClick={() => handleRemoveFavourite(food._id)}>
            Remove Favourite
          </button>
          <button onClick={() => handleDetails(food._id)}>Details</button>
        </div>
      ))}
    </div>
  );
};

export default Favourite;
