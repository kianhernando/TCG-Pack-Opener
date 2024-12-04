export default function PokemonNavigation({ currentIndex, totalCount, onPrev, onNext }) {
  return (
    <div>
      <button onClick={onPrev}>Previous</button>
      <span> Pokemon {currentIndex + 1} of {totalCount} </span>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
