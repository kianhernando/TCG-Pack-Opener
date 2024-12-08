import logo from '../logo.svg';
import '../App.css';
import PokemonDisplay from '../components/PokemonDisplay';
import PokemonNavigation from '../components/PokemonNavigation';
import MusicPlayer from '../components/MusicPlayer';

export default function MainPage({ 
  pokemon, 
  pokemonChosen, 
  currentIndex, 
  searchPokemon, 
  nextPokemon, 
  prevPokemon 
}) {
  return (
    <div className="App">
      <header className="App-header">
        <audio src="components/lake.mp3" autoPlay loop />
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
        <MusicPlayer />
        {!pokemonChosen ? (
          <h1>Click the button to generate Pokemon!</h1>
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
      </header>
    </div>
  );
}
