import './PokemonDisplay.css'

export default function PokemonDisplay ({
  pokemon, 
  pokemonChosen, 
  currentIndex, 
  searchPokemon, 
  nextPokemon, 
  prevPokemon,
  collectAllPokemon,
  deleteCard,
  getAllCards,
}) {
  return (
    <div>
      <h1>{pokemon.name} {pokemon.isShiny && "✨"}</h1>
      <img src={pokemon.getImage()} alt={pokemon.name} />
      <h3>National Pokedex #{pokemon.id}</h3>
      <h3>Type: {pokemon.type}</h3>
    </div>
  );
}