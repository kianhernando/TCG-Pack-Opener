import { useState } from 'react';
import PokemonController from './PokemonController';

export default function useMainPageController() {
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
      .catch((error) => {
        console.error('Error:', error);
        setPokemonChosen(false);
      });
  };

  const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  return {
    pokemon,
    pokemonChosen,
    currentIndex,
    searchPokemon,
    nextPokemon,
    prevPokemon
  };
} 