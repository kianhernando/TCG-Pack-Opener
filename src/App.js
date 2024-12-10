import './App.css';
import PokemonNavigation from './components/PokemonNavigation/PokemonNavigation'
import LoginRegister from './components/LoginRegister/LoginRegister';
import MainPage from './pages/MainPage';
import PokemonCollection from './components/PokemonInventory/PokemonInventory';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
function App() {
  return (
    // <Router>
    //   <div>
    //     <Routes>
    //     <Route path="/" element={<Navigate to="/LoginRegister" />} /> {/* Redirect to login by default */}
    //       <Route path="/login" element={<LoginRegister />} />
    //       <Route path="/main" element={<MainPage />} />
    //       <Route path="/pokemon-navigation" element={<PokemonNavigation />} />
    //       <Route path="/pokemon-collection" element={<PokemonCollection />} />
    //     </Routes>
    //   </div>
    // </Router>
     <div>
      {/* <LoginRegister/> */}
      {/* <MainPage/> */}
      <PokemonNavigation/>
      {/* <PokemonCollection/> */}
     </div>
  );
  

export default App;
