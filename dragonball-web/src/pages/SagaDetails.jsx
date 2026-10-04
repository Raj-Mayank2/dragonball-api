import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import CharacterGrid from "../components/CharacterGrid";
import JsonViewer from "../components/JsonViewer";

const API_URL = import.meta.env.VITE_API_URL;

function SagaDetails() {
  const { id } = useParams();

  const [saga, setSaga] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSaga() {
      try {
        setLoading(true);
        setError(null);

        const [sagaResponse, charactersResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/v1/sagas/${id}`),
            fetch(
              `${API_URL}/api/v1/sagas/${id}/characters`
            ),
          ]);

        if (!sagaResponse.ok) {
          if (sagaResponse.status === 404) {
            throw new Error("Saga not found");
          }

          throw new Error("Failed to fetch saga");
        }

        if (!charactersResponse.ok) {
          throw new Error(
            "Failed to fetch saga characters"
          );
        }

        const sagaData = await sagaResponse.json();
        const characterData = await charactersResponse.json();

        setSaga(sagaData);
        setCharacters(characterData);

        setApiResponse({
          saga: sagaData,
          characters: characterData,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchSaga();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <header className="hero detail-header">
          <Navbar />
        </header>

        <main className="detail-page">
          <div className="detail-container">
            <div className="state-message">
              Loading saga...
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !saga) {
    return (
      <>
        <header className="hero detail-header">
          <Navbar />
        </header>

        <main className="detail-page">
          <div className="detail-container">
            <Link to="/sagas" className="back-link">
              ← Back to sagas
            </Link>

            <div className="state-message error">
              {error || "Saga not found"}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="hero detail-header">
        <Navbar />
      </header>

      <main className="detail-page">
        <div className="detail-container">
          <Link to="/sagas" className="back-link">
            ← Back to sagas
          </Link>

          <section className="saga-detail">
            <div className="saga-detail-image-wrapper">
              <img
                src={saga.image}
                alt={saga.name}
                className="saga-detail-image"
              />
            </div>

            <div className="detail-info">
              <p className="section-label">
                SAGA #{saga.id}
              </p>

              <h1>{saga.name}</h1>

              <p className="saga-description">
                {saga.description}
              </p>

              <div className="detail-fields">
                <div>
                  <span>ID</span>
                  <strong>{saga.id}</strong>
                </div>

                <div>
                  <span>Name</span>
                  <strong>{saga.name}</strong>
                </div>

                <div>
                  <span>Characters</span>
                  <strong>{characters.length}</strong>
                </div>

                <div>
                  <span>Created</span>
                  <strong>
                    {new Date(
                      saga.created_at
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="section-header">
              <div>
                <p className="section-label">CHARACTERS</p>
                <h2>Featured in this saga</h2>
              </div>

              <span className="character-count">
                {characters.length} characters
              </span>
            </div>

            {characters.length > 0 ? (
  <CharacterGrid characters={characters} />
) : (
  <div className="saga-empty">
    <strong>No characters linked yet</strong>
    Characters associated with this saga will appear here.
  </div>
)}
          </section>

          <JsonViewer
            data={apiResponse}
            endpoint={`GET /api/v1/sagas/${saga.id}`}
          />
        </div>
      </main>
    </>
  );
}

export default SagaDetails;