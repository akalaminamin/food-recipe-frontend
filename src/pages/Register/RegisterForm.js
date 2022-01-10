import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // do validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/")
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }

  return (
    <form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        className="search-input"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> <br />

      <input
        type="text"
        required
        placeholder="Enter email"
        className="search-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> <br />

      <input
        type="password"
        required
        placeholder="Enter password"
        className="search-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br />

      <input
        type="password"
        required
        placeholder="Confirm password"
        className="search-input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /> <br />

      <button disabled={loading} type="submit" className="btn">
        Register
      </button>

      {error && <p className="text-red-900 bg-red-200/50 p-3 rounded-sm my-2 block">{error}</p>}

      <div className="login-text">
        Already have an account? <Link to="/login" className="text-gray-900 font-semibold underline underline-offset-1">Login</Link>
      </div>
    </form>
  );
}
