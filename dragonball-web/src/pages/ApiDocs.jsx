import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/characters",
    title: "List characters",
    description: "Returns a paginated list of Dragon Ball characters.",
    example: `${API_URL}/api/v1/characters?page=1&limit=10`,
  },
  {
    method: "GET",
    path: "/api/v1/characters/{id}",
    title: "Get character",
    description: "Returns a single character by ID.",
    example: `${API_URL}/api/v1/characters/1`,
  },
  {
    method: "POST",
    path: "/api/v1/characters",
    title: "Create character",
    description: "Creates a new character.",
    example: `${API_URL}/api/v1/characters`,
  },
  {
    method: "PATCH",
    path: "/api/v1/characters/{id}",
    title: "Update character",
    description: "Updates one or more character fields.",
    example: `${API_URL}/api/v1/characters/1`,
  },
  {
    method: "DELETE",
    path: "/api/v1/characters/{id}",
    title: "Delete character",
    description: "Deletes a character.",
    example: `${API_URL}/api/v1/characters/1`,
  },
  {
    method: "GET",
    path: "/api/v1/sagas",
    title: "List sagas",
    description: "Returns all available sagas.",
    example: `${API_URL}/api/v1/sagas`,
  },
  {
    method: "GET",
    path: "/api/v1/sagas/{id}/characters",
    title: "Saga characters",
    description: "Returns characters associated with a saga.",
    example: `${API_URL}/api/v1/sagas/1/characters`,
  },
  {
    method: "GET",
    path: "/api/v1/characters/{id}/sagas",
    title: "Character sagas",
    description: "Returns sagas associated with a character.",
    example: `${API_URL}/api/v1/characters/1/sagas`,
  },
  {
    method: "GET",
    path: "/api/v1/events",
    title: "SSE event stream",
    description: "Opens a Server-Sent Events stream.",
    example: `${API_URL}/api/v1/events`,
  },
  {
    method: "POST",
    path: "/graphql",
    title: "GraphQL",
    description: "Execute GraphQL queries against the API.",
    example: `${API_URL}/graphql`,
  },
];

function ApiDocs() {
  const [copied, setCopied] = useState(null);

  async function copyText(text, index) {
    await navigator.clipboard.writeText(text);

    setCopied(index);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  }

  return (
    <>
      <header className="hero">
        <Navbar />

        <div className="hero-content">
          <p className="eyebrow">DEVELOPER DOCUMENTATION</p>

          <h1>
            Build with the
            <br />
            Dragon Ball API.
          </h1>

          <p className="hero-description">
            Explore endpoints, parameters and response formats
            for building applications with Dragon Ball data.
          </p>
        </div>
      </header>

      <main className="content">
        <div className="docs-page">
          <Link to="/" className="back-link">
            ← Back to characters
          </Link>

          <section className="docs-intro">
            <p className="section-label">GETTING STARTED</p>

            <h2>Base URL</h2>

            <div className="base-url">
              <code>{API_URL}</code>

              <button
                type="button"
                onClick={() =>
                  copyText(API_URL, "base-url")
                }
              >
                {copied === "base-url"
                  ? "Copied!"
                  : "Copy"}
              </button>
            </div>

            <p>
              All REST endpoints are currently available under
              the <code>/api/v1</code> prefix.
            </p>
          </section>

          <section>
            <div className="section-header">
              <div>
                <p className="section-label">REST API</p>
                <h2>Endpoints</h2>
              </div>
            </div>

            <div className="endpoint-list">
              {endpoints.map((endpoint, index) => (
                <article
                  className="endpoint-card"
                  key={`${endpoint.method}-${endpoint.path}`}
                >
                  <div className="endpoint-top">
                    <span
                      className={`method method-${endpoint.method.toLowerCase()}`}
                    >
                      {endpoint.method}
                    </span>

                    <code>{endpoint.path}</code>
                  </div>

                  <h3>{endpoint.title}</h3>

                  <p>{endpoint.description}</p>

                  <div className="endpoint-example">
                    <code>{endpoint.example}</code>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          endpoint.example,
                          index
                        )
                      }
                    >
                      {copied === index
                        ? "Copied!"
                        : "Copy"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="usage-section">
            <p className="section-label">EXAMPLE</p>

            <h2>Get all characters</h2>

            <div className="code-example">
              <pre>{`fetch("${API_URL}/api/v1/characters?page=1&limit=10")
  .then(response => response.json())
  .then(data => console.log(data));`}</pre>
            </div>
          </section>

          <section className="usage-section">
            <p className="section-label">RESPONSE</p>

            <h2>JSON</h2>

            <div className="code-example">
              <pre>{`{
  "items": [
    {
      "id": 1,
      "name": "Son Goku",
      "gender": "MALE",
      "status": "ALIVE",
      "species": "SAIYAN",
      "created_at": "...",
      "image": "..."
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 26,
  "pages": 3
}`}</pre>
            </div>
          </section>

          <section className="developer-links">
            <a
              href={`${API_URL}/docs`}
              target="_blank"
              rel="noreferrer"
            >
              Open Swagger →
            </a>

            <Link to="/graphql">
              Open GraphQL →
            </Link>

            <Link to="/">
              Explore Characters →
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default ApiDocs;