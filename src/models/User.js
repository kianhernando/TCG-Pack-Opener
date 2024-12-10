import PokemonCard from './PokemonCard';

class User {
  constructor(userId) {
    this.userId = userId;
    this.inventory = new Map();
  }

  async addCard(pokemonCard) {
    pokemonCard.userId = this.userId;
    await pokemonCard.save();
    this.inventory.set(pokemonCard.id, pokemonCard);
  }

  async removeCard(cardId) {
    if (!this.inventory.has(cardId)) {
      console.warn(`Card with ID ${cardId} not found in inventory`);
      return false;
    }
    await PokemonCard.deleteCard(cardId);
    return this.inventory.delete(cardId);
  }

  async loadCards() {
    const cards = await PokemonCard.loadUserCards(this.userId);
    this.inventory.clear();
    cards.forEach(card => this.inventory.set(card.id, card));
    return this.getAllCards();
  }

  getCard(cardId) {
    return this.inventory.get(cardId);
  }

  getAllCards() {
    return Array.from(this.inventory.values());
  }
}

export default User;