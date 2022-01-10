import React, { useState, useEffect } from "react";
import axios from "axios";
const Food = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFood")
      .then((res) => setFoods(res.data));
  }, []);
  return (
    <div>
      {foods.map((food) => (
        <div key={food._id}>
          <h2>name: {food.name}</h2>
          <p>author: {food.author}</p>
          <p>method: {food.method}</p>
          <p>ingredients: {food.ingredients}</p>
          <p>recipeName: {food.recipeName}</p>
        </div>
      ))}
    </div>
  );
};

export default Food;
