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
  static fromPokemon(pokemon) {
    return new PokemonCard(pokemon.id, pokemon.isShiny);
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
      // FETCH USER ID FROM DATABASE LATER
      // SAVE POKEMON CARD TO DATABASE  
      const { data, error } = await supabase
        .from('pokemon_cards')
        .insert({
          id: this.id,
          pokemon_number: this.pokemonNumber,
          user_id: this.userId, // PASS USER ID FROM DATABASE LATER
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

export default PokemonCard;

