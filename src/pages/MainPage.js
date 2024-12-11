import logo from "../logo.svg";
import "../App.css";

import PokemonDisplay from "../PokemonDisplay";
import PokemonNavigation from "../components/PokemonNavigation/PokemonNavigation";
import PokemonController from "../controllers/PokemonController";
import Pokemon from "../models/Pokemon";
import "./MainPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import pokeball from "./Assets/pokeball_PNG8-986274437.png";
import { supabase } from "../lib/supabaseClient";
import { handleLogout } from "../utils/auth";
import Pokedex from '../components/PokemonNavigation/Pokedex.png';
// import MusicPlayer from '../components/MusicPlayer';

const MainPage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div></div>
          <h3 className="nav-title">TCG Pack Opener</h3>
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </div>
      </nav>

      <Link to="/inventory" className="pokedex-button">
        <img src={Pokedex} alt="pokedex" className="pokeball-image" />
      </Link>

      <div className="mainWrapper">
        <h3 className="welcome-message">Welcome to the TCG Pack Opener</h3>
        <img src="" />

        <audio src="components/lake.mp3" autoPlay loop />

        <div className="mainPagePokeball">
          <Link to="/pokemon" className="pokeball-button">
            <img src={pokeball} alt="Pokeball" className="pokeball-image" />
          </Link>
        </div>

        {/* <MusicPlayer /> */}
        <h1 className="title">Click the Pokeball to generate Pokemon!</h1>
      </div>
    </div>
  );
};

export default MainPage;
