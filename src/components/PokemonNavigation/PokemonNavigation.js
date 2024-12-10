import './PokemonNavigation.css'
import Pokemon from '../../models/Pokemon';
import { useState, useEffect } from 'react';
import PokemonController from '../../controllers/PokemonController';
import Pokedex from './Pokedex.png'

export default function PokemonCards() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchPokemon();
  }, []);

  const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  const searchPokemon = () => {
    setIsLoading(true);
    setPokemonChosen(false);
    setCurrentIndex(0);

    PokemonController.fetchRandomPokemon(5)
      .then((pokemonList) => {
        setPokemon(pokemonList);
        setPokemonChosen(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setPokemonChosen(false);
        setIsLoading(false);
      });
  };

  if (isLoading || !pokemonChosen || !pokemon || pokemon.length === 0) {
    return (
      <div className='cardContainer'>
        {/* <h1>Loading Pokemon...</h1> */}
        <div className='genPokemon'>
          <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
        </div>
      </div>
    );
  }

  const currentPokemon = pokemon[currentIndex];

  if (!currentPokemon) {
    return (
      <div className='cardContainer'>
        <h1>Error loading Pokemon</h1>
        <div className='genPokemon'>
          <button onClick={searchPokemon}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav class="navbar">
        <div class="navbar-container">
          <h3>TCG Pack Opener</h3>
          <a href="" class="logout-link">Logout</a>
        </div>
      </nav>

      <a href="src/components/PokemonNavigation/PokemonInventory.js" className="pokedex-button" 
              onClick={() => window.location.href = 'pages/PokemonInventory.js'}>
            <img src={Pokedex} alt="pokedex" className="pokeball-image" />
      </a>

      <div className='cardContainer'>
        <div className="pokeCard">
          <div className="pokemon-card">
            <div className="pokemon-name">
              <h1>{currentPokemon.name} {currentPokemon.isShiny && "✨"}</h1>
            </div>

            <div className="pokemon-image">
              <img src={currentPokemon.getImage()} alt={currentPokemon.name} />
            </div>

            <div className="pokemon-type">
              <h3>Type: {currentPokemon.type}</h3>
            </div>
          </div>
        </div>

        <div className='pokedex'>
          <h3>National Pokedex #{currentPokemon.id}</h3>
        </div>

        <div className='count'>
          <span>Pokemon {currentIndex + 1} of {pokemon.length}</span>
        </div>

        <div className="navigation-buttons">
          <div className='previous'>
            <button onClick={prevPokemon}>Previous</button>
          </div>
          <div className='next'>
            <button onClick={nextPokemon}>Next</button>
          </div>
        </div>

        <div className='genPokemon'>
          <button onClick={''}>Save Pokemon to Inventory</button>
        </div>
      </div>
    </div>
  );
}