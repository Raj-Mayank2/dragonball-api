import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setLoggedIn(Boolean(token));
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🐉 Dragon Ball API
      </Link>

      <div className="nav-links">
        <Link to="/">Characters</Link>

        <Link to="/sagas">Sagas</Link>

        <Link to="/docs">API Docs</Link>

        <Link to="/graphql">GraphQL</Link>

        <Link to="/about">About</Link>

        <span className="nav-divider" />

        {loggedIn ? (
          <>
            <Link to="/profile">Profile</Link>

            <button
              type="button"
              className="nav-logout"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>

            <Link
              to="/signup"
              className="nav-signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;