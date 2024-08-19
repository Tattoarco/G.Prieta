import { useContext } from "react";
import { PokemonContext } from "../Context/PokemonContex";
import { CardPokemon } from "./CardPokemon";

export const PokemonList = () => {
  const { allPokemons } = useContext(PokemonContext);


  return (
    <>
      <div className="card-list-pokemon container">
        {allPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
      </div>
    </>
  );
};
