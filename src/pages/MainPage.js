import logo from '../logo.svg';
import '../App.css';
import PokemonDisplay from '../components/PokemonDisplay/PokemonDisplay';
import PokemonNavigation from '../components/PokemonNavigation/PokemonNavigation';
import PokemonController from '../controllers/PokemonController';
import Pokemon from '../models/Pokemon';
import './MainPage.css'
import { useState } from 'react';
// import MusicPlayer from '../components/MusicPlayer';

const MainPage = () => {
  // pokemon,
  // pokemonChosen,
  // currentIndex,
  // searchPokemon,
  // nextPokemon,
  // prevPokemon
  
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


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

  const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  return (
       
      <div className="mainWrapper">

          <img src=''/>
        
          <audio src="components/lake.mp3" autoPlay loop />

          <div className='genPokemon'>
          <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
          </div>

          {/* <MusicPlayer /> */}
           {!pokemonChosen ? (
            <h1 className='title'>Click the Pokeball to generate Pokemon!</h1>
          ) : (
            <div>
              <PokemonDisplay pokemon={pokemon[currentIndex]} />
              <PokemonNavigation 
                currentIndex={currentIndex}
                totalCount={pokemon.length}
                onPrev={prevPokemon}
                onNext={nextPokemon}
              />
            </div>
          )}
        
      </div>
  );
}

export default MainPage;