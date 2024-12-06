class User {
  constructor(userId) {
    this.userId = userId;
    this.inventory = new Map(); // NEW MAP FOR USER INVENTORY (THANKS LEETCODE AND HUNG BUI FOR TEACHING ME)
  }

  addCard(pokemonCard) {
    this.inventory.set(pokemonCard.id, pokemonCard);
  }

  removeCard(cardId) {
    this.inventory.delete(cardId);
  } d

  getCard(cardId) {
    return this.inventory.get(cardId);
  }

  getAllCards() {
    return Array.from(this.inventory.values());
  }
}

export default User; 