import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
const Profile = () => {
  const [foods, setFoods] = useState([]);
  const [isDelete, setDelete] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("https://warm-coast-40997.herokuapp.com/allFood/").then((res) => {
      const matchData = res.data;
      setFoods(matchData);
    });
  }, [isDelete]);

  const handleUpdate = (id) => {
    navigate(`/addRecipe/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://warm-coast-40997.herokuapp.com/allFood/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Food Deleted Success", "success");
          setDelete(true);
        } else {
          setDelete(false);
        }
      });
  };
  return (
    <div className="container my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {!foods.length ? (
          <Loader />
        ) : (
          foods.map((food) => (
            <div key={food._id} className="shadow-md p-2 bg-white rounded-sm">
              <div className="overflow-hidden relative group cursor-pointer">
                <img
                  className="image-style"
                  src={food.RecipeImage}
                  alt="product"
                />
              </div>
              <h2 className="uppercase my-2 font-semibold text-md  font-openSans">
                {food.recipeName}
              </h2>
              <div className="flex justify-between space-x-2">
                {food.userEmail === currentUser.email ? (
                  <>
                    <button
                      className="py-1 w-full rounded-sm uppercase bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => handleUpdate(food._id)}
                    >
                      Update
                    </button>
                    <button
                      className="py-1 w-full rounded-sm uppercase bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="py-1 w-full rounded-sm uppercase bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => handleUpdate(food._id)}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
