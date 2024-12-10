import { useEffect, useState } from 'react';

export default function PokemonCollection({ cards, onDelete }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPokemonData = async () => {
      setIsLoading(true);
      try {
        const loadedPokemon = await Promise.all(
          cards.map(card => card.fetchFullPokemon())
        );
        setPokemonData(loadedPokemon);
      } catch (error) {
        console.error('Error loading Pokemon:', error);
      }
      setIsLoading(false);
    };

    loadPokemonData();
  }, [cards]);

  if (isLoading) {
    return <div>Loading collection...</div>;
  }

  return (
    <div className="pokemon-collection">
      <h2>Your Collection ({cards.length} Pokemon)</h2>
      <div className="cards-grid">
        {cards.length === 0 ? (
          <p>No Pokemon in collection yet!</p>
        ) : (
          pokemonData.map((pokemon, index) => (
            cards[index] && (
              <div key={cards[index].id} className="collection-card">
                <img src={pokemon.getImage()} alt={pokemon.name} />
                <p>{pokemon.name} {pokemon.isShiny && "✨"}</p>
                <button onClick={() => onDelete(cards[index].id)}>
                  Remove
                </button>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}