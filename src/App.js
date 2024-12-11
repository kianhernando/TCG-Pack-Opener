import './App.css';
import PokemonNavigation from './pages/PokemonNavigation/PokemonNavigation'
import LoginRegister from './pages/LoginRegister/LoginRegister';
import MainPage from './pages/MainPage/MainPage';
import PokemonCollection from './pages/PokemonInventory/PokemonInventory';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './auth/supabaseClient';
import { useMusicController } from './controllers/MusicController';
import MuteButton from './components/MuteButton/MuteButton';

function App() {
    const [session, setSession] = useState(null);
    const { audioRef, playMusic, stopMusic } = useMusicController();
  
    useEffect(() => {
      // Set up Supabase auth state listener
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
  
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (!session) {
          stopMusic();
        }
      });
  
      return () => subscription.unsubscribe();
    }, []);
  
    return (
      <Router>
        <audio ref={audioRef} />
        <Routes>
          <Route 
            path="/" 
            element={!session ? <LoginRegister /> : <Navigate to="/main" />} 
          />
          <Route 
            path="/main" 
            element={session ? <MainPage /> : <Navigate to="/" />} 
          />
          <Route path="/pokemon" element={<PokemonNavigation />} />
          <Route path="/inventory" element={<PokemonCollection />} />
        </Routes>
        {session && <MuteButton />}
      </Router>
    );
  
  }

export default App;
