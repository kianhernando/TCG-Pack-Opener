import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({});
  const [pokemonChosen, setPokemonChosen] = useState(false);

  const searchPokemon = () => {
    // CLEAR PREV POKEMON (FOR TESTING)
    setPokemonChosen(false);
    
    // POKEMON ARRAY
    const pokemonPromises = [];
    
    // GENERATE 5 POKEMON
    for (let i = 0; i < 5; i++) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      // PROMISE TO CHECK API RESPONSE, THEN RETURN JSON
      const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Pokemon not found');
          }
          return response.json();
        })
        .then((data) => ({
          name: data.name,
          move: data.moves[Math.floor(Math.random() * data.moves.length)].move.name,
          img: data.sprites.front_default,
          type: data.types[0].type.name,
        }));
      // PUSH PROMISE TO ARRAY
      pokemonPromises.push(promise);
    }

    // WAIT FOR PROMISE TO FINISH, THEN SET POKEMON
    Promise.all(pokemonPromises)
      .then((pokemonList) => {
        setPokemon(pokemonList);
        setPokemonChosen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setPokemonChosen(false);
      });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
        {!pokemonChosen ? (
          <h1>Click the button to generate Pokemon!</h1>
        ) : (
          <div>
            {pokemon.map((p, index) => (
              <div key={index}>
                <h1>{p.name}</h1>
                <img src={p.img} alt={p.name} />
                <h3>Move: {p.move}</h3>
                <h3>Type: {p.type}</h3>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
