import { useState, useEffect } from 'react';
import PokemonController from './PokemonController';
import User from '../models/User';

export default function useMainPageController() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user] = useState(new User("default-user"));
  const [collection, setCollection] = useState([]);

  // LOAD CARDS WHEN USER IS LOADED
  useEffect(() => {
    const loadUserCards = async () => {
      const cards = await user.loadCards();
      setCollection(cards);
    };
    loadUserCards();
  }, [user]);

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

  const collectAllPokemon = async () => {
    for (const poke of pokemon) {
      const card = poke.toCard();
      await user.addCard(card);
    }
    
    setPokemon([]);
    setPokemonChosen(false);
    setCurrentIndex(0);
    setCollection(user.getAllCards());
  };

  const deleteCard = async (cardId) => {
    await user.removeCard(cardId);
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