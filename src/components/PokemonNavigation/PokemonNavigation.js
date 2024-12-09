import './PokemonNavigation.css'
import Pokemon from '../../models/Pokemon';
import { useState } from 'react';
import PokemonController from '../../controllers/PokemonController';

export default function PokemonCards({totalCount, onPrev, onNext }) {
  
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  const searchPokemon = () => {
    setPokemonChosen(false);
    setCurrentIndex(0);
    
    PokemonController.fetchRandomPokemon(5)
      .then((pokemonList) => {
        setPokemon(pokemonList);
        setPokemonChosen(true);
      })
      .catch((error) => {     // THANKS PAUL FOR TEACHING ME CATCH
        console.error('Error:', error);
        setPokemonChosen(false);
      });
  };
  return (

    <div className='cardContainer'>
      <div className='count'>
        <span> Pokemon {currentIndex + 1} of {pokemon.length} </span>
      </div>
      
      <div className='previous'>
        <button onClick={prevPokemon}>Previous</button>
      </div>
      <div className='next'>
        <button onClick={nextPokemon}>Next</button>
      </div>

      <div className='genPokemon'>
          <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
      </div>


      <div className="pokeCard">
        <div className="pokemon-card">
          <div className="pokemon-name">
            <h1>{pokemon.name} {pokemon.isShiny && "✨"}</h1>
          </div>

          <div className="pokemon-image">
            <img src={pokemon[currentIndex]} alt={pokemon.name} />
          </div>
          
          <div className="pokemon-type"><h3>Type: {pokemon.type}</h3></div>
        </div>
      </div>

      {/* <img src={'pokemon-ball-icon-4-1679788945.png'}/> */}

      {/* <h1>{pokemon.name} {pokemon.isShiny && "✨"}</h1>
      <img src={pokemon.getImage()} alt={pokemon.name} />
      <h3>National Pokedex #{pokemon.id}</h3>
      <h3>Type: {pokemon.type}</h3> */}
    </div>
  );
}