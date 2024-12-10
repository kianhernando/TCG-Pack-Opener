import './App.css';
import PokemonNavigation from './components/PokemonNavigation/PokemonNavigation'
import LoginRegister from './components/LoginRegister/LoginRegister';
import MainPage from './pages/MainPage';
import PokemonCollection from './components/PokemonInventory/PokemonInventory';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
function App() {
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      // Set up Supabase auth state listener
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
  
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
  
      return () => subscription.unsubscribe();
    }, []);
  
    return (
      <Router>
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
      </Router>
    );
  
  }

export default App;
