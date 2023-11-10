import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apFetch from '../api/config';

function Pokedex() {
  const [poke, setPoke] = useState([]);
  
  useEffect(() => {
    const getPoke = async () => {
      try {
        const response = await apFetch.get("/pokemon-form?limit=151");
        const data = response.data.results;
        setPoke(data);
      } catch (error) {
        console.log("erro!");
      }
    }
    getPoke();
  }, []);

  return (
    <ul>
      {poke.map((pokemon, index) => (
        <PokeItem key={index} name={pokemon.name} />
      ))}
    </ul>
  );

  function PokeItem({ name }) {
    const [id, setId] = useState(1);
  
    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const response = await apFetch.get(`/pokemon-form/${name}`);
          setId(response.data.id);
        } catch (error) {
          console.log("erro!");
        }
      }
  
      fetchPokemonData();
    }, [name]);
  
    return (
      <li>
        <h1>{name}</h1> 
        <img className="" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
        <Link to={`/${name}`}>Details</Link>
      </li>
    );
  }
  

}

export default Pokedex;