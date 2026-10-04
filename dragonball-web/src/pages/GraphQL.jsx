import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_QUERY = `query {
  character(id: 1) {
    id
    name
    gender
    status
    species
    sagas {
      id
      name
    }
  }
}`;

function GraphQL() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function executeQuery() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("GraphQL request failed");
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="hero">
        <Navbar />

        <div className="hero-content">
          <p className="eyebrow">GRAPHQL API</p>

          <h1>
            Query the universe
            <br />
            your way.
          </h1>

          <p className="hero-description">
            Write a GraphQL query, execute it against our
            API and inspect the exact JSON response.
          </p>
        </div>
      </header>

      <main className="content">
        <div className="graphql-page">
          <Link to="/" className="back-link">
            ← Back to characters
          </Link>

          <div className="graphql-grid">
            <section className="query-section">
              <div className="section-header">
                <div>
                  <p className="section-label">QUERY</p>
                  <h2>GraphQL Playground</h2>
                </div>
              </div>

              <div className="graphql-editor">
                <textarea
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  spellCheck="false"
                />
              </div>

              <button
                type="button"
                className="execute-button"
                onClick={executeQuery}
                disabled={loading || !query.trim()}
              >
                {loading
                  ? "Executing..."
                  : "Execute Query →"}
              </button>
            </section>

            <section className="graphql-response">
              <div className="section-header">
                <div>
                  <p className="section-label">RESPONSE</p>
                  <h2>JSON</h2>
                </div>

                <span className="graphql-status">
                  {response ? "200 OK" : "—"}
                </span>
              </div>

              <div className="json-panel graphql-json">
                <div className="json-toolbar">
                  <div className="toolbar-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="json-endpoint">
                    POST /graphql
                  </span>

                  <span className="json-status">
                    {response ? "SUCCESS" : "READY"}
                  </span>
                </div>

                <pre>
                  {error
                    ? error
                    : response
                      ? JSON.stringify(
                          response,
                          null,
                          2
                        )
                      : "Execute a query to see the response."}
                </pre>
              </div>
            </section>
          </div>

          <section className="graphql-examples">
            <div className="section-header">
              <div>
                <p className="section-label">
                  EXAMPLES
                </p>

                <h2>Try these queries</h2>
              </div>
            </div>

            <div className="example-grid">
              <button
                type="button"
                onClick={() =>
                  setQuery(`query {
  characters {
    id
    name
    species
  }
}`)
                }
              >
                <strong>All Characters</strong>

                <span>
                  Query characters from the API.
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setQuery(`query {
  character(id: 1) {
    id
    name
    species
    sagas {
      id
      name
    }
  }
}`)
                }
              >
                <strong>Character + Sagas</strong>

                <span>
                  Get a character and related sagas.
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setQuery(`query {
  saga(id: 1) {
    id
    name
    characters {
      id
      name
      species
    }
  }
}`)
                }
              >
                <strong>Saga + Characters</strong>

                <span>
                  Get a saga and its characters.
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default GraphQL;