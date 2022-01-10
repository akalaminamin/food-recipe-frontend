import axios from "axios";
import React, { useState } from "react";

const AddRecipe = () => {
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
    status: "not favourite",
    userEmail: "mdbabulmiah9901@gmail.com",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodRecipes({ ...foodRecipes, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/allFood", foodRecipes).then((res) => {
      if (res.data.acknowledged) {
        alert("food added successfull");
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
    console.log(foodRecipes);
  };

  return (
    <div className="container my-5">
      <div className="bg-yellow-500 p-5">
      <h2 className="font-inter py-3 text-2xl text-gray-800 ">Add Your Food</h2>
      <div className="grid grid-cols-6 ">
      <form action="" onSubmit={handleSubmit} className="text-center col-span-6">
        <input
          name="name"
          className="search-input"
          type="text"
          placeholder="name"
          defaultValue={foodRecipes.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="email"
          className="search-input"
          type="email"
          defaultValue={foodRecipes.email}
          placeholder="email"
          onChange={handleChange}
        />
        <br />
        <input
          name="recipeName"
          className="search-input"
          type="text"
          defaultValue={foodRecipes.recipeName}
          placeholder="Recipe Name"
          onChange={handleChange}
        />
        <br />
        <input
          name="cusine"
          className="search-input"
          type="text"
          defaultValue={foodRecipes.cusine}
          placeholder="cusine"
          onChange={handleChange}
        />
        <br />
        <input
          name="author"
          className="search-input"
          type="text"
          defaultValue={foodRecipes.author}
          placeholder="Author"
          onChange={handleChange}
        />
        <br />
        <input
          name="RecipeImage"
          className="search-input"
          type="text"
          defaultValue={foodRecipes.RecipeImage}
          placeholder="Enter Image url"
          onChange={handleChange}
        />
        <br />
        <select
          name="category"
          className="search-input"
          onChange={handleChange}
          defaultChecked={foodRecipes.category}
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
          defaultValue={foodRecipes.method}
          name="method"
          className="search-input"
          cols="30"
          rows="5"
          placeholder="write your method"
          onChange={handleChange}
        ></textarea>
        <br />
        <textarea
          defaultValue={foodRecipes.ingredients}
          name="ingredients"
          className="search-input"
          cols="30"
          rows="5"
          placeholder="write your ingredients"
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit" className="btn">Send</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default AddRecipe;
