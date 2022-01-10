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
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodRecipes({ ...foodRecipes, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/allFood", foodRecipes)
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          defaultValue={foodRecipes.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="email"
          type="email"
          defaultValue={foodRecipes.email}
          placeholder="email"
          onChange={handleChange}
        />
        <br />
        <input
          name="recipeName"
          type="text"
          defaultValue={foodRecipes.recipeName}
          placeholder="Recipe Name"
          onChange={handleChange}
        />
        <br />
        <input
          name="cusine"
          type="text"
          defaultValue={foodRecipes.cusine}
          placeholder="cusine"
          onChange={handleChange}
        />
        <br />
        <input
          name="author"
          type="text"
          defaultValue={foodRecipes.author}
          placeholder="Author"
          onChange={handleChange}
        />
        <br />
        <input
          name="RecipeImage"
          type="text"
          defaultValue={foodRecipes.RecipeImage}
          placeholder="Enter Image url"
          onChange={handleChange}
        />
        <br />
        <select
          name="category"
          className="form-select mb-4"
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
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <br />
        <textarea
          defaultValue={foodRecipes.ingredients}
          name="ingredients"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default AddRecipe;
