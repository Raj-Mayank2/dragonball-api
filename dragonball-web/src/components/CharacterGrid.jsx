import CharacterCard from "./CharacterCard";

function CharacterGrid({ characters }) {
  if (characters.length === 0) {
    return <p className="empty-state">No characters found.</p>;
  }

  return (
    <section className="character-grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
        />
      ))}
    </section>
  );
}

export default CharacterGrid;