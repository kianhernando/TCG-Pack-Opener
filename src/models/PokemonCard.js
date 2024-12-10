import Pokemon from './Pokemon';
import { supabase } from '../lib/supabaseClient';

class PokemonCard {
  constructor(pokemonNumber, userId = null, isShiny = false, id = null) {
    this.id = id || crypto.randomUUID(); // Use provided ID or generate new one
    this.pokemonNumber = pokemonNumber;
    this.userId = userId;
    this.isShiny = isShiny;
  }

  // MAKE NEW POKEMON CARD FROM POKEMON INFO
  static fromPokemon(pokemon, userId) {
    return new PokemonCard(pokemon.id, userId, pokemon.isShiny);
  }

  // FETCH POKEMON FROM API
  async fetchFullPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonNumber}`);
    if (!response.ok) throw new Error('Pokemon not found');
    const data = await response.json();
    const pokemon = new Pokemon(data);
    pokemon.isShiny = this.isShiny; // OVERRIDE THE RANDOM SHINY VALUE WITH STORED VALUE
    return pokemon;
  }

  // DATABASE CRUD OPERATIONS
  async save() {
    try {
      if (!this.userId) {
        throw new Error('Cannot save card: No user ID provided');
      }

      const { data, error } = await supabase
        .from('pokemon_cards')
        .insert({
          id: this.id,
          pokemon_number: this.pokemonNumber,
          user_id: this.userId,
          is_shiny: this.isShiny
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving card:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Failed to save card:', error);
      throw error;
    }
  }

  static async loadUserCards(userId) {
    try {
      const { data, error } = await supabase
        .from('pokemon_cards')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading cards:', error);
        throw error;
      }
      
      return data.map(card => // THANKS HUNG BUI AND LEETCODE FOR TEACHING ME MAP
        new PokemonCard(
          card.pokemon_number, 
          card.user_id, 
          card.is_shiny,
          card.id  // PASS ID TO POKEMON CARD CONSTRUCTOR
        )
      );
    } catch (error) {
      console.error('Failed to load cards:', error);
      throw error;
    }
  }

  static async deleteCard(cardId) {
    try {
      console.log('Deleting card with ID:', cardId); // DEBUG LOG
      const { error } = await supabase
        .from('pokemon_cards')
        .delete()
        .eq('id', cardId);

      if (error) {
        console.error('Error deleting card:', error);
        throw error;
      }
      console.log('Card deleted successfully'); // DEBUG LOG
    } catch (error) {
      console.error('Failed to delete card:', error);
      throw error;
    }
  }
}

// When saving a Pokemon to collection:
async function savePokemonToCollection(pokemon) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Must be logged in to save Pokemon');
    
    const pokemonCard = PokemonCard.fromPokemon(pokemon, user.id);
    await pokemonCard.save();
    
    // Handle success (e.g., show notification)
  } catch (error) {
    console.error('Error saving Pokemon:', error);
    // Handle error (e.g., show error message)
  }
}

export default PokemonCard;

