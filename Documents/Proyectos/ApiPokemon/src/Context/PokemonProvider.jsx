import PropTypes from "prop-types";
import { PokemonContext } from "./PokemonContex";
import { useEffect, useState } from "react";
import { useForm } from "../Hook/useForm";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  //   Utilizar CustomHook - useForm
  const {valueSearch, onImputChange, onResetForm} = useForm({
    valueSearch: "",
  });

  //   Estados para la aplicación simples
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  // Llamar 50m pokemones a la API
  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  // Llamar todos los pokemones
  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setGlobalPokemons(results);
    setLoading(false);
  };

  //   Llamar pokemones por Id
  const getPokemonByID = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
  <PokemonContext.Provider 
    value={{ 
        valueSearch, 
        onImputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonByID
        }}> 

        {children}
  </PokemonContext.Provider>)
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
