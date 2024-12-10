import PokemonInventory from './PokemonInventory.css';

export default function SavePokemon () {
    return (
        <body>
  <div class="header">
    <h1>Your Pokémon Collection</h1>
    <p>Save and view your generated Pokémon cards here!</p>
  </div>

  <div class="button-container">
    <button id="save-button">Save Collection</button>
    <button id="clear-button">Clear Collection</button>
  </div>

  <div class="card-grid">

    <div class="card">
      <img src="placeholder.png" alt="Pokemon" />
      <p class="card-title">Pokémon Name</p>
      <button class="remove-button">Remove</button>
    </div>

    <div class="card">
      <img src="placeholder.png" alt="Pokemon" />
      <p class="card-title">Pokémon Name</p>
      <button class="remove-button">Remove</button>
    </div>
  </div>
</body>
    )
}