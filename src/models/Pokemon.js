class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.move = data.moves[Math.floor(Math.random() * data.moves.length)].move.name;
    this.img = data.sprites.front_default;
    this.shinyImg = data.sprites.front_shiny;
    this.type = data.types[0].type.name;
    this.isShiny = Math.random() < 0.001; // 0.1% shiny chance
  }

  getImage() {
    return this.isShiny ? this.shinyImg : this.img;
  }
}

export default Pokemon;