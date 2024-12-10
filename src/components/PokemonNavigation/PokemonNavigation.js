import "./PokemonNavigation.css";
import Pokemon from "../../models/Pokemon";
import { useState, useEffect } from "react";
import PokemonController from "../../controllers/PokemonController";
import Pokedex from "./Pokedex.png";
import PokemonCard from "../../models/PokemonCard";
import { supabase } from "../../lib/supabaseClient";
import { handleLogout } from "../../utils/auth";
import { Link } from 'react-router-dom';

export default function PokemonCards() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchPokemon();
  }, []);

  const nextPokemon = () =>
    setCurrentIndex((prev) => (prev + 1) % pokemon.length);
  const prevPokemon = () =>
    setCurrentIndex((prev) => (prev - 1 + pokemon.length) % pokemon.length);

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
        console.error("Error:", error);
        setPokemonChosen(false);
        setIsLoading(false);
      });
  };

  const savePokemonToInventory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to save Pokemon");
        return;
      }

      const savePromises = pokemon.map((poke) => {
        const pokemonCard = PokemonCard.fromPokemon(poke, user.id);
        return pokemonCard.save();
      });

      await Promise.all(savePromises);
      alert("Pokemon saved to inventory!");
    } catch (error) {
      console.error("Error saving Pokemon:", error);
      alert("Failed to save Pokemon. Please try again.");
    }
  };

  if (isLoading || !pokemonChosen || !pokemon || pokemon.length === 0) {
    return (
      <div className="cardContainer">
        {/* <h1>Loading Pokemon...</h1> */}
        <div className="genPokemon">
          <button onClick={searchPokemon}>Generate 5 Random Pokemon</button>
        </div>
      </div>
    );
  }

  const currentPokemon = pokemon[currentIndex];

  if (!currentPokemon) {
    return (
      <div className="cardContainer">
        <h1>Error loading Pokemon</h1>
        <div className="genPokemon">
          <button onClick={searchPokemon}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <h3>TCG Pack Opener</h3>
          <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
        </div>
      </nav>

      <Link to="/inventory" className="pokedex-button">
        <img src={Pokedex} alt="pokedex" className="pokeball-image" />
      </Link>

      <div className="cardContainer">
        <div className="pokeCard">
          <div className="pokemon-card">
            <div className="pokemon-name">
              <h1>
                {currentPokemon.name} {currentPokemon.isShiny && "✨"}
              </h1>
            </div>

            <div className="pokemon-image">
              <img src={currentPokemon.getImage()} alt={currentPokemon.name} />
            </div>

            <div className="pokemon-type">
              <h3>Type: {currentPokemon.type}</h3>
            </div>
          </div>
        </div>

        <div className="pokedex">
          <h3>National Pokedex #{currentPokemon.id}</h3>
        </div>

        <div className="count">
          <span>
            Pokemon {currentIndex + 1} of {pokemon.length}
          </span>
        </div>

        <div className="navigation-buttons">
          <div className="previous">
            <button onClick={prevPokemon}>Previous</button>
          </div>
          <div className="next">
            <button onClick={nextPokemon}>Next</button>
          </div>
        </div>

        <div className="genPokemon">
          <button onClick={savePokemonToInventory}>
            Save Pokemon to Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
