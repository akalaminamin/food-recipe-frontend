import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter email "
        required
        className="search-input "
        value={email}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        className="search-input"
        autoComplete="off"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="btn" disabled={loading}>
        Login
      </button>
      {error && (
        <p className="text-red-900 bg-red-200/50 p-3 rounded-sm my-2 block">
          {error}
        </p>
      )}
      <div className="login-text">
        Don't have an account?
        <Link
          to="/register"
          className="text-gray-900 font-semibold underline underline-offset-1"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
