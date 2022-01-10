import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/allFood/${id}`)
      .then((res) => setFood(res.data));
  }, []);
  return (
    <div>
      <h2>{food.name}</h2>
      <h2>{food.category}</h2>
    </div>
  );
};

export default FoodDetails;
