import Pokemon from './Pokemon';

class PokemonCard {
  constructor(pokemonNumber, isShiny = false) {
    this.id = crypto.randomUUID(); // GENERATE UNIQUE ID
    this.pokemonNumber = pokemonNumber;
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
}

export default PokemonCard;