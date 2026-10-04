import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import JsonViewer from "../components/JsonViewer";

const API_URL = import.meta.env.VITE_API_URL;
function Sagas() {
  const [sagas, setSagas] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSagas() {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/sagas`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sagas");
        }

        const data = await response.json();

        setSagas(data);
        setApiResponse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSagas();
  }, []);

  return (
    <>
      <header className="hero">
        <Navbar />

        <div className="hero-content">
          <p className="eyebrow">DRAGON BALL STORYLINES</p>

          <h1>
            Explore the
            <br />
            major sagas.
          </h1>

          <p className="hero-description">
            Browse Dragon Ball sagas and discover the
            characters connected to each storyline.
          </p>
        </div>
      </header>

      <main className="content">
        <section>
          <div className="section-header">
            <div>
              <p className="section-label">SAGAS</p>
              <h2>Story arcs</h2>
            </div>

            <span className="character-count">
              {sagas.length} sagas
            </span>
          </div>

          {loading && (
            <div className="state-message">
              Loading sagas...
            </div>
          )}

          {error && (
            <div className="state-message error">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="saga-grid">
              {sagas.map((saga) => (
                <Link
                  key={saga.id}
                  to={`/sagas/${saga.id}`}
                  className="saga-card-link"
                >
                  <article className="saga-card">
                    <div className="saga-image-wrapper">
                      <img
  src={`${API_URL}${saga.image}`}
  alt={saga.name}

                        className="saga-image"
                      />
                    </div>

                    <div className="saga-info">
                      <span>#{saga.id}</span>

                      <h2>{saga.name}</h2>

                      <p>
                        {saga.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        <JsonViewer
          data={apiResponse}
          endpoint="GET /api/v1/sagas"
        />
      </main>
    </>
  );
}

export default Sagas;