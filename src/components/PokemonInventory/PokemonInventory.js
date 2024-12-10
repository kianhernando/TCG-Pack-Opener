import { useEffect, useState } from 'react';
import './PokemonInventory.css';
import { supabase } from '../../lib/supabaseClient';
import PokemonCard from '../../models/PokemonCard';
import { handleLogout } from '../../utils/auth';
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
                    <Link to="/" className="logout-link">
                        Generate More Pokemon
                    </Link>
                    <h3>TCG Pack Opener</h3>
                    <button onClick={handleLogout} className="logout-link">Logout</button>
                </div>
            </nav>

            <div className="header">
                <h1>Your Pokémon Collection</h1>
                <p>Save and view your generated Pokémon cards here!</p>
            </div>

            {isLoading ? (
                <div>Loading your collection...</div>
            ) : (
                <div className="card-grid">
                    {pokemonData.map((pokemon, index) => (
                        <div key={index} className="pokemon-card">
                            <div className="pokemon-name">
                                <h1>
                                    {pokemon.name} {pokemon.isShiny && "✨"}
                                </h1>
                            </div>

                            <div className="pokemon-image">
                                <img src={pokemon.getImage()} alt={pokemon.name} />
                            </div>

                            <div className="pokemon-type">
                                <h3>Type: {pokemon.type}</h3>
                            </div>

                            <div className="pokedex">
                                <h3>National Pokedex #{pokemon.id}</h3>
                            </div>

                            <button 
                                className="remove-button"
                                onClick={() => handleRemoveCard(cards[index].id)}
                                title="Remove card"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}