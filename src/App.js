import "./styled/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import NavBar from "./Shared/NavBar";
import Login from "./pages/Login/Login";
import Favourite from "./pages/Favourite/Favourite";
import Profile from "./pages/Profile/Profile";
import Food from "./pages/Food/Food";
import Admin from "./pages/Admin/Admin";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import { AuthProvider } from "./contexts/AuthProvider/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food" element={<Food />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/addRecipe"
              element={
                <PrivateRoute>
                  <AddRecipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/addRecipe/:id"
              element={
                <PrivateRoute>
                  <AddRecipe />
                </PrivateRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/food/:id"
              element={
                <PrivateRoute>
                  <FoodDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/favourite"
              element={
                <PrivateRoute>
                  <Favourite />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
