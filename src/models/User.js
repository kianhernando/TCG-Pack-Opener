class User {
  constructor(userId) {
    this.userId = userId;
    this.inventory = new Map(); // THANKS LEETCODE AND HUNG BUI FOR TEACHING ME MAPS
  }

  addCard(pokemonCard) {
    this.inventory.set(pokemonCard.id, pokemonCard);
  }

  removeCard(cardId) {
    if (!this.inventory.has(cardId)) {
      console.warn(`Card with ID ${cardId} not found in inventory`);
      return false;
    }
    return this.inventory.delete(cardId);
  }

  getCard(cardId) {
    return this.inventory.get(cardId);
  }

  getAllCards() {
    return Array.from(this.inventory.values());
  }
}

export default User;