import Pokemon from '../models/Pokemon';

class PokemonController {
  static async fetchRandomPokemon(count = 5) {
    const pokemonPromises = [];
    
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Pokemon not found');
          return response.json();
        })
        .then((data) => new Pokemon(data));
      
      pokemonPromises.push(promise);
    }

    return Promise.all(pokemonPromises);
  }

  static async fetchPokemonByNumber(number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    if (!response.ok) throw new Error('Pokemon not found');
    const data = await response.json();
    return new Pokemon(data);
  }
}

export default PokemonController;