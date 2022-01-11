import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
const AddRecipe = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodRecipes, setFoodRecipes] = useState({
    name: "",
    email: "",
    recipeName: "",
    cusine: "",
    category: "",
    author: "",
    method: "",
    ingredients: "",
    RecipeImage: "",
  });
  useEffect(() => {
    axios
      .get(`https://warm-coast-40997.herokuapp.com/allFood/${id}`)
      .then((res) => {
        setFoodRecipes(res.data);
      });
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodRecipes({ ...foodRecipes, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(
          `https://warm-coast-40997.herokuapp.com/allFood/addRecipe/${id}`,
          foodRecipes
        )
        .then((res) => {
          if (res.data.acknowledged) {
            alert("Food update successfull");
          }
        });
    } else {
      foodRecipes.userEmail = currentUser?.email;
      axios
        .post("https://warm-coast-40997.herokuapp.com/allFood", foodRecipes)
        .then((res) => {
          if (res.data.acknowledged) {
            alert("food added successfull");
            navigate("/")
          }
        });
      setFoodRecipes({
        name: "",
        email: "",
        recipeName: "",
        cusine: "",
        category: "",
        author: "",
        method: "",
        ingredients: "",
        RecipeImage: "",
      });
    }
  };
  return (
    <div className="container my-5">
      <div className="bg-yellow-500 p-5">
        <h2 className="font-inter py-3 text-2xl text-gray-800 ">
          {id ? "Update Your Food" : "Add Your Food"}
        </h2>
        <div className="grid grid-cols-6 ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="text-center col-span-6"
          >
            <input
              name="name"
              className="search-input"
              type="text"
              placeholder="name"
              defaultValue={id ? foodRecipes.name : ""}
              onChange={handleChange}
            />
            <br />
            <input
              name="email"
              className="search-input"
              type="email"
              defaultValue={id ? foodRecipes.email : ""}
              placeholder="email"
              onChange={handleChange}
            />
            <br />
            <input
              name="recipeName"
              className="search-input"
              type="text"
              defaultValue={id ? foodRecipes.recipeName : ""}
              placeholder="Recipe Name"
              onChange={handleChange}
            />
            <br />
            <input
              name="cusine"
              className="search-input"
              type="text"
              defaultValue={id ? foodRecipes.cusine : ""}
              placeholder="cusine"
              onChange={handleChange}
            />
            <br />
            <input
              name="author"
              className="search-input"
              type="text"
              defaultValue={id ? foodRecipes.author : ""}
              placeholder="Author"
              onChange={handleChange}
            />
            <br />
            <input
              name="RecipeImage"
              className="search-input"
              type="text"
              defaultValue={id ? foodRecipes.RecipeImage : ""}
              placeholder="Enter Image url"
              onChange={handleChange}
            />
            <br />
            <select
              name="category"
              className="search-input"
              onChange={handleChange}
              defaultChecked={id ? foodRecipes.category : ""}
              required
            >
              <option>Select</option>
              <option value="vagan">vagan</option>
              <option value="diet">diet</option>
              <option value="dessert">dessert</option>
              <option value="cookies">cookies</option>
              <option value="fastfood">fastfood</option>
              <option value="drinks">drinks</option>
              <option value="Meat">Meat</option>
            </select>
            <br />
            <textarea
              defaultValue={id ? foodRecipes.method : ""}
              name="method"
              className="search-input"
              cols="30"
              rows="5"
              placeholder="write your method"
              onChange={handleChange}
            ></textarea>
            <br />
            <textarea
              defaultValue={id ? foodRecipes.ingredients : ""}
              name="ingredients"
              className="search-input"
              cols="30"
              rows="5"
              placeholder="write your ingredients"
              onChange={handleChange}
            ></textarea>
            <br />
            <button type="submit" className="btn">
              {id ? "Update Food" : "Add Food"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
