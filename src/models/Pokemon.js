import PokemonCard from './PokemonCard';

class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.img = data.sprites.front_default;
    this.shinyImg = data.sprites.front_shiny;
    this.type = data.types[0].type.name;
    this.isShiny = Math.random() < 0.05; // 5% CHANCE FOR SHINY
    this.cryUrl = data.cries.latest; // Renamed from this.cry to this.cryUrl
  }

  toCard(userId = null) {
    return new PokemonCard(this.id, userId, this.isShiny);
  }

  getImage() {
    return this.isShiny ? this.shinyImg : this.img;
  }
}

export default Pokemon;