import { Link } from "react-router-dom";

function CharacterCard({ character }) {
  return (
    <Link
      to={`/characters/${character.id}`}
      className="character-card-link"
    >
      <article className="character-card">
        <div className="character-image-wrapper">
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
        </div>

        <div className="character-info">
          <div className="character-title-row">
            <h2>{character.name}</h2>

            <span className="character-number">
              #{character.id}
            </span>
          </div>

          <div className="character-meta">
            <span
              className={`badge status-${character.status.toLowerCase()}`}
            >
              {character.status}
            </span>

            <span className="badge">
              {character.gender}
            </span>

            <span className="badge">
              {character.species}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default CharacterCard;