import { useEffect, useState } from 'react';
import './PokemonInventory.css';
import { supabase } from '../../auth/supabaseClient';
import PokemonCard from '../../models/PokemonCard';
import { handleLogout } from '../../auth/auth';
import { Link } from 'react-router-dom';

export default function PokemonInventory() {
    const [cards, setCards] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserCards();
    }, []);

    const loadUserCards = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            
            const userCards = await PokemonCard.loadUserCards(user.id);
            setCards(userCards);
        } catch (error) {
            console.error('Error loading cards:', error);
        }
    };

    useEffect(() => {
        const loadPokemonData = async () => {
            setIsLoading(true);
            try {
                const loadedPokemon = await Promise.all(
                    cards.map(card => card.fetchFullPokemon())
                );
                setPokemonData(loadedPokemon);
            } catch (error) {
                console.error('Error loading pokemon data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPokemonData();
    }, [cards]);

    const handleRemoveCard = async (cardId) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            
            // Remove the card from the database
            await PokemonCard.deleteCard(cardId);
            
            // Update the local state
            setCards(cards.filter(card => card.id !== cardId));
            setPokemonData(pokemonData.filter((_, index) => cards[index].id !== cardId));
            
        } catch (error) {
            console.error('Error removing card:', error);
            alert('Failed to remove card. Please try again.');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="nav-link">
                        Generate More Pokemon
                    </Link>
                    <h3 className="nav-title">TCG Pack Opener</h3>
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                </div>
            </nav>

            {isLoading ? (
                <div>Loading your collection...</div>
            ) : (
                <div className="card-grid">
                    {pokemonData.map((pokemon, index) => ( /* THANKS LEETCODE AND HUNG BUI FOR TEACHING ME MAP */
                        <div key={index} className="pokemon-card">
                            <div className="pokemon-name">
                                <h1>
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} {pokemon.isShiny && "✨"}
                                </h1>
                            </div>

                            <div className="pokemon-image">
                                <img src={pokemon.getImage()} alt={pokemon.name} />
                            </div>

                            <div className="pokemon-info">
                                <div className="pokemon-type">
                                    <h3>Type: {pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}</h3>
                                </div>
                                <div className="pokemon-dex">
                                    <h3>National Pokedex #{pokemon.id}</h3>
                                </div>
                            </div>

                            <button 
                                className="remove-button"
                                onClick={() => handleRemoveCard(cards[index].id)}
                                title="Remove card"
                            >
                                
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}