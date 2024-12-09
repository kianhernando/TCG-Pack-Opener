import './PokemonNavigation.css'
import Pokemon from '../../models/Pokemon';

export default function PokemonCards({pokemon, currentIndex, totalCount, onPrev, onNext}) {
  return (
    // <div className='cardContainer'>

    //   <span> Pokemon {currentIndex + 1} of {totalCount} </span>


    //   <div className='previous'>
    //     <button onClick={onNext}>Next</button>
    //   </div>
    //   <div className='next'>
    //     <button onClick={onPrev}>Previous</button>
    //   </div>

    // </div>

    <div className='cardContainer'>
      
      <div className='count'>
        <span> Pokemon {currentIndex + 1} of {totalCount} </span>
      </div>

      <div className='previous'>
        <button onClick={onPrev}>Previous</button>
      </div>

      <div className='next'>
        <button onClick={onNext}>Next</button>
      </div>

      <h1>{pokemon.name} {pokemon.isShiny && "✨"}</h1>
    
      {/* <h1>{pokemon.name} {pokemon.isShiny && "✨"}</h1>
      <img src={pokemon.getImage()} alt={pokemon.name} />
      <h3>National Pokedex #{pokemon.id}</h3>
      <h3>Type: {pokemon.type}</h3> */}
    </div>
  );
}