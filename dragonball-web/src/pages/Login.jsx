import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const body = new URLSearchParams();

      body.append("username", form.username);
      body.append("password", form.password);

      const response = await fetch(
        `${API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Invalid username or password"
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">
          ← Back to Dragon Ball API
        </Link>

        <div className="auth-card">
          <p className="section-label">WELCOME BACK</p>

          <h1>Sign in.</h1>

          <p className="auth-description">
            Authenticate with the Dragon Ball API.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Username

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="goku"
                required
              />
            </label>

            <label>
              Password

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </label>

            {error && (
              <p className="auth-error">{error}</p>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;