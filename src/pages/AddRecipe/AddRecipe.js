import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const AddRecipe = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodRecipes, setFoodRecipes] = useState({
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
            Swal.fire("Update!", "Food Update Success", "success");
            navigate("/")
          }
        });
    } else {
      foodRecipes.userEmail = currentUser?.email;
      axios
        .post("https://warm-coast-40997.herokuapp.com/allFood", foodRecipes)
        .then((res) => {
          if (res.data.acknowledged) {
            Swal.fire("Added!", "Food added successfull", "success");
            navigate("/")
          }
        });
      setFoodRecipes({
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
  console.log(foodRecipes)
  return (
    <div className="container my-5">
      <div className="bg-indigo-800 mx-auto w-12/12 md:w-8/12 p-5 rounded-md">
        <h2 className="font-inter py-3 text-2xl font-bold text-white ">
          {id ? "Update Your Food" : "Add Your Food"}
        </h2>
        <div className="grid grid-cols-6 ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="text-center col-span-6"
          >
            <input
              name="recipeName"
              className="search-input"
              type="text"
              required
              defaultValue={id ? foodRecipes.recipeName : ""}
              placeholder="Recipe Name"
              onChange={handleChange}
            />
            <input
              name="cusine"
              className="search-input"
              type="text"
              required
              defaultValue={id ? foodRecipes.cusine : ""}
              placeholder="cusine"
              onChange={handleChange}
            />
            <input
              name="author"
              className="search-input"
              type="text"
              required
              defaultValue={id ? foodRecipes.author : ""}
              placeholder="Author"
              onChange={handleChange}
            />
            <input
              name="RecipeImage"
              className="search-input"
              type="text"
              required
              defaultValue={id ? foodRecipes.RecipeImage : ""}
              placeholder="Enter Image url"
              onChange={handleChange}
            />
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
            <textarea
              defaultValue={id ? foodRecipes.method : ""}
              name="method"
              className="search-input"
              cols="30"
              rows="5"
              required
              placeholder="write your method"
              onChange={handleChange}
            ></textarea>
            <textarea
              defaultValue={id ? foodRecipes.ingredients : ""}
              name="ingredients"
              className="search-input"
              cols="30"
              required
              rows="5"
              placeholder="write your ingredients"
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="btn bg-indigo-900">
              {id ? "Update Food" : "Add Food"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
