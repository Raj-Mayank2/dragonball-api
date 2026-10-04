import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem(
        "access_token"
      );

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        const data = await response.json();

        setUser(data);
      } catch {
        setError("Failed to load profile");
      }
    }

    fetchProfile();
  }, [navigate]);

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">
          ← Back to characters
        </Link>

        <div className="auth-card">
          <p className="section-label">
            AUTHENTICATED USER
          </p>

          <h1>Profile.</h1>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          {user && (
            <div className="detail-fields">
              <div>
                <span>ID</span>
                <strong>{user.id}</strong>
              </div>

              <div>
                <span>Username</span>
                <strong>{user.username}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>
            </div>
          )}

          <button
            type="button"
            className="auth-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;