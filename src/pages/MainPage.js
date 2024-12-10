import logo from '../logo.svg';
import '../App.css';

import PokemonDisplay from '../PokemonDisplay';
import PokemonNavigation from '../components/PokemonNavigation/PokemonNavigation'
import PokemonController from '../controllers/PokemonController';
import Pokemon from '../models/Pokemon';
import './MainPage.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import pokeball from './Assets/pokeball_PNG8-986274437.png';
// import MusicPlayer from '../components/MusicPlayer';

const MainPage = () => {
  return (

    <div>
      <nav class="navbar">
        <div class="navbar-container">
          <a href="" class="logout-link">Logout</a>
        </div>
      </nav>
      
      <div className="mainWrapper">

        <img src='' />

        <audio src="components/lake.mp3" autoPlay loop />

        <div className='genPokemon'>
          <a href="src/components/PokemonNavigation/PokemonNavigation.js" className="pokeball-button" onClick={() => window.location.href = 'pages/MainPage.js'}>
            <img src={pokeball} alt="Pokeball" className="pokeball-image" />
          </a>
        </div>

        <a href="src/components/PokemonNavigation/PokemonNavigation.js" className="pokeball-button" onClick={() => window.location.href = 'pages/MainPage.js'}>
            <img src={pokeball} alt="Pokeball" className="pokeball-image" />
        </a>

        {/* <MusicPlayer /> */}
        <h1 className='title'>Click the Pokeball to generate Pokemon!</h1>
      </div>

    </div>
  );
}

export default MainPage;
