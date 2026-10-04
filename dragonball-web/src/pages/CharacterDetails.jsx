import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import JsonViewer from "../components/JsonViewer";

const API_URL = import.meta.env.VITE_API_URL;

function CharacterDetails() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        setError(null);
        setCharacter(null);

        const response = await fetch(
          `${API_URL}/api/v1/characters/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Character not found");
          }

          throw new Error("Failed to fetch character");
        }

        const data = await response.json();

        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCharacter();
    } else {
      setError("Invalid character ID");
      setLoading(false);
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
              Loading character...
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !character) {
    return (
      <>
        <header className="hero detail-header">
          <Navbar />
        </header>

        <main className="detail-page">
          <div className="detail-container">
            <Link to="/" className="back-link">
              ← Back to characters
            </Link>

            <div className="state-message error">
              {error || "Character not found"}
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
          <Link to="/" className="back-link">
            ← Back to characters
          </Link>

          <section className="character-detail">
            <div className="detail-image-wrapper">
              <img
  src={`${API_URL}${character.image}`}
  alt={character.name}

                className="detail-image"
              />
            </div>

            <div className="detail-info">
              <p className="section-label">
                CHARACTER #{character.id}
              </p>

              <h1>{character.name}</h1>

              <div className="detail-tags">
                <span>{character.status}</span>
                <span>{character.gender}</span>
                <span>{character.species}</span>
              </div>

              <div className="detail-fields">
                <div>
                  <span>ID</span>
                  <strong>{character.id}</strong>
                </div>

                <div>
                  <span>Name</span>
                  <strong>{character.name}</strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>{character.gender}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{character.status}</strong>
                </div>

                <div>
                  <span>Species</span>
                  <strong>{character.species}</strong>
                </div>

                <div>
                  <span>Created</span>
                  <strong>
                    {new Date(
                      character.created_at
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <JsonViewer
            data={character}
            endpoint={`GET /api/v1/characters/${character.id}`}
          />
        </div>
      </main>
    </>
  );
}

export default CharacterDetails;