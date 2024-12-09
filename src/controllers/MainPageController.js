import { useState } from 'react';
import PokemonController from './PokemonController';
import User from '../models/User';

export default function useMainPageController() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user] = useState(new User("default-user"));
  const [collection, setCollection] = useState([]);

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

  const collectAllPokemon = () => {
    pokemon.forEach(poke => {
      const card = poke.toCard();
      user.addCard(card);
    });
    
    setPokemon([]);
    setPokemonChosen(false);
    setCurrentIndex(0);
    setCollection(user.getAllCards());
  };

  const deleteCard = (cardId) => {
    user.removeCard(cardId);
    setCollection(user.getAllCards());
  };

  const getAllCards = () => {
    return collection;
  };

  const nextPokemon = () => setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () => setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

  return {
    pokemon,
    pokemonChosen,
    currentIndex,
    searchPokemon,
    nextPokemon,
    prevPokemon,
    collectAllPokemon,
    deleteCard,
    getAllCards,
  };
} 