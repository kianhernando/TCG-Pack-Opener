import logo from '../logo.svg';
import '../App.css';
import PokemonDisplay from '../components/PokemonDisplay';
import PokemonNavigation from '../components/PokemonNavigation';
import MusicPlayer from '../components/MusicPlayer';
import PokemonCollection from '../components/PokemonCollection';

export default function MainPage({ 
  pokemon, 
  pokemonChosen, 
  currentIndex, 
  searchPokemon, 
  nextPokemon, 
  prevPokemon,
  collectAllPokemon,
  deleteCard,
  getAllCards 
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
            <button onClick={collectAllPokemon}>Collect All Pokemon</button>
          </div>
        )}
        <PokemonCollection cards={getAllCards()} onDelete={deleteCard} />
      </header>
    </div>
  );
}
