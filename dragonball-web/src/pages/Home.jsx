import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CharacterGrid from "../components/CharacterGrid";
import JsonViewer from "../components/JsonViewer";
import LiveActivity from "../components/LiveActivity";
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [characters, setCharacters] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (name.trim()) {
          params.append("name", name.trim());
        }

        if (gender) {
          params.append("gender", gender);
        }

        if (status) {
          params.append("status", status);
        }

        if (species) {
          params.append("species", species);
        }

        params.append("page", page);
        params.append("limit", limit);

        const response = await fetch(
          `${API_URL}/api/v1/characters?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }

        const data = await response.json();

        setCharacters(data.items);
        setApiResponse(data);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
        setApiResponse(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [name, gender, status, species, page, limit]);

  function handleFilterChange(setter) {
    return (event) => {
      setter(event.target.value);
      setPage(1);
    };
  }

  function clearFilters() {
    setName("");
    setGender("");
    setStatus("");
    setSpecies("");
    setPage(1);
  }

  

  const totalPages = apiResponse?.pages ?? 0;

  return (
    <>
      <header className="hero">
        <Navbar/>

        <div className="hero-content">
          <p className="eyebrow">THE DRAGON BALL UNIVERSE</p>

          <h1>
            Explore the
            <br />
            Dragon Ball universe.
          </h1>

          <p className="hero-description">
            Discover characters through a modern REST API.
            Search, filter, paginate and inspect the actual
            JSON response.
          </p>
        </div>
      </header>

      <main className="content">
        <section className="explorer">
          <div className="section-header">
            <div>
              <p className="section-label">API EXPLORER</p>
              <h2>Find a character</h2>
            </div>

            {apiResponse && (
              <span className="character-count">
                {apiResponse.total} total characters
              </span>
            )}
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search character..."
              value={name}
              onChange={handleFilterChange(setName)}
              className="search-input"
            />

            <select
              value={gender}
              onChange={handleFilterChange(setGender)}
            >
              <option value="">All genders</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="UNKNOWN">Unknown</option>
            </select>

            <select
              value={status}
              onChange={handleFilterChange(setStatus)}
            >
              <option value="">All statuses</option>
              <option value="ALIVE">Alive</option>
              <option value="DEAD">Dead</option>
              <option value="UNKNOWN">Unknown</option>
            </select>

            <select
              value={species}
              onChange={handleFilterChange(setSpecies)}
            >
              <option value="">All species</option>
              <option value="SAIYAN">Saiyan</option>
              <option value="HALF_SAIYAN">Half Saiyan</option>
              <option value="HUMAN">Human</option>
              <option value="NAMEKIAN">Namekian</option>
              <option value="FROST_DEMON">Frost Demon</option>
              <option value="BIO_ANDROID">Bio Android</option>
              <option value="MAJIN">Majin</option>
              <option value="GOD_OF_DESTRUCTION">
                God of Destruction
              </option>
              <option value="ANDROID">Android</option>
              <option value="ANGEL">Angel</option>
              <option value="KAI">Kai</option>
              <option value="OTHER">Other</option>
            </select>

            <button
              type="button"
              className="clear-button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </section>

        <section id="characters">
          <div className="section-header">
            <div>
              <p className="section-label">CHARACTERS</p>
              <h2>Meet the warriors</h2>
            </div>
          </div>

          {loading && (
            <div className="state-message">
              Loading characters...
            </div>
          )}

          {error && (
            <div className="state-message error">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <CharacterGrid characters={characters} />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((current) => current - 1)}
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
<LiveActivity />

<JsonViewer
  data={apiResponse}
  endpoint="GET /api/v1/characters"
/>
      </main>
    </>
  );
}

export default Home;