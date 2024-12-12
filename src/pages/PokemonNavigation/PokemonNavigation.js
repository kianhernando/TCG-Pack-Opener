import "./PokemonNavigation.css";
import { useState, useEffect } from "react";
import PokemonController from "../../controllers/PokemonController";
import pokedexImage from '../../components/Assets/Pokedex.png';
import PokemonCard from "../../models/PokemonCard";
import { supabase } from "../../auth/supabaseClient";
import { handleLogout } from "../../auth/auth";
import { Link } from 'react-router-dom';
import pokemonBallIcon from '../../components/Assets/pokemon-ball-icon-4-1679788945.png';

export default function PokemonCards() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    searchPokemon();
  }, []);

  const nextPokemon = () => {
    const nextIndex = (currentIndex + 1) % pokemon.length;
    setCurrentIndex(nextIndex);
    playPokemonCry(nextIndex);
  };

  const prevPokemon = () => {
    const prevIndex = (currentIndex - 1 + pokemon.length) % pokemon.length;
    setCurrentIndex(prevIndex);
    playPokemonCry(prevIndex);
  };

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
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    } catch (error) {
      console.error("Error saving Pokemon:", error);
      alert("Failed to save Pokemon. Please try again.");
    }
  };

  const playPokemonCry = (index = currentIndex) => {
    if (!pokemon[index]?.cryUrl) {
      console.warn("No cry URL available for this Pokemon");
      return;
    }

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(pokemon[index].cryUrl);
    setAudio(newAudio);
    newAudio.play().catch(error => console.error("Error playing cry:", error));
  };

  useEffect(() => {
    if (pokemon.length > 0 && pokemonChosen) {
      playPokemonCry();
    }
  }, [pokemonChosen, pokemon]);

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
      {showSaveNotification && (
        <div className="save-notification">
          Pokemon saved to inventory!
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-container">
          <img src={pokemonBallIcon} alt="Pokemon Logo" className="navbar-logo" />
          <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
        </div>
      </nav>

      <Link to="/inventory" className="pokedex-button">
        <img src={pokedexImage} alt="pokedex" className="pokeball-image" />
      </Link>

      <div className="cardContainer">
        <div className="pokeCard">
          <div className="pokemon-card">
            <div className="pokemon-name">
              <h1>
                {currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)} {currentPokemon.isShiny && "✨"}
              </h1>
            </div>

            <div className="pokemon-image">
              <img src={currentPokemon.getImage()} alt={currentPokemon.name} />
            </div>

            <div className="pokemon-type">
              <h3>Type: {currentPokemon.type.charAt(0).toUpperCase() + currentPokemon.type.slice(1)}</h3>
            </div>
          </div>
        </div>

        <div className="pokemon-nav-pokedex">
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
          <button onClick={searchPokemon}>
            Generate New Pokemon
          </button>
        </div>
      </div>
    </div>
  );
}