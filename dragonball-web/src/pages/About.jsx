import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        <Link to="/" className="back-link">
          ← Back to characters
        </Link>

        <div className="about-hero">
          <p className="section-label">ABOUT THE PROJECT</p>

          <h1>
            A modern API for
            <br />
            the Dragon Ball universe.
          </h1>

          <p>
            Dragon Ball API is a developer-focused project
            built to explore characters and the Dragon Ball
            universe through a clean, modern API.
          </p>
        </div>

        <section className="about-grid">
          <article className="about-card">
            <span>01</span>

            <h2>REST API</h2>

            <p>
              Explore characters using clean REST endpoints,
              filtering, search and pagination.
            </p>
          </article>

          <article className="about-card">
            <span>02</span>

            <h2>GraphQL</h2>

            <p>
              Query exactly the data you need through a
              flexible GraphQL interface.
            </p>

            <small>Coming soon</small>
          </article>

          <article className="about-card">
            <span>03</span>

            <h2>Real-time</h2>

            <p>
              Stream updates using Server-Sent Events for
              real-time API interactions.
            </p>

            <small>Coming soon</small>
          </article>

          <article className="about-card">
            <span>04</span>

            <h2>Open Source</h2>

            <p>
              Built as a learning and experimentation project
              for modern backend and API engineering.
            </p>
          </article>
        </section>

        <section className="tech-section">
          <p className="section-label">TECHNOLOGY</p>

          <h2>Built with modern tools.</h2>

          <div className="tech-list">
            <span>Python</span>
            <span>FastAPI</span>
            <span>PostgreSQL</span>
            <span>SQLAlchemy</span>
            <span>Alembic</span>
            <span>React</span>
            <span>Vite</span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;