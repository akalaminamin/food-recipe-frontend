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
    <div>
      <h2>name: {food.name}</h2>
      <h2>category: {food.category}</h2>
      <h2>Recipe Name: {food.recipeName}</h2>
      <h2>Method: {food.method}</h2>
      <h2>Ingredients: {food.ingradients}</h2>
    </div>
  );
};

export default FoodDetails;
