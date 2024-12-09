import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonController from './controllers/PokemonController';
import PokemonDisplay from './components/PokemonDisplay/PokemonDisplay';
import PokemonNavigation from './components/PokemonNavigation/PokemonNavigation';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
     {/* <LoginRegister/> */}
     {/* <MainPage/> */}
     <PokemonNavigation/>
    </div>
  );
  // const [pokemon, setPokemon] = useState([]);
  // const [pokemonChosen, setPokemonChosen] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);


  // const searchPokemon = () => {
  //   setPokemonChosen(false);
  //   setCurrentIndex(0);
    
  //   PokemonController.fetchRandomPokemon(5)
  //     .then((pokemonList) => {
  //       setPokemon(pokemonList);
  //       setPokemonChosen(true);
  //     })
  //     .catch((error) => {     // THANKS PAUL FOR TEACHING ME CATCH
  //       console.error('Error:', error);
  //       setPokemonChosen(false);
  //     });
  // };

  // const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  // const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
  //       {!pokemonChosen ? (
  //         <h1>Click the button to generate Pokemon!</h1>
  //       ) : (
  //         <div>
  //           <PokemonDisplay pokemon={pokemon[currentIndex]} />
  //           <PokemonNavigation 
  //             currentIndex={currentIndex}
  //             totalCount={pokemon.length}
  //             onPrev={prevPokemon}
  //             onNext={nextPokemon}
  //           />
  //         </div>
  //       )}
  //     </header>
  //   </div>
  // );
}

export default App;
