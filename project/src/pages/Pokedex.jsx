import React, { useState, useEffect } from 'react';
import apFetch from '../api/config';
import './Pokedex.css';

function Pokedex() {
  const [poke, setPoke] = useState([]);
  
  const getPoke = async () => {
    try {
      const response = await apFetch.get("/pokemon");
      const data = response.data.results;
      setPoke(data);
    } catch (error) {
      console.log("erro!");
    }
  }

  useEffect(() => {
    getPoke();
  }, []);

  return (
    <ul>
      {poke.map((pokemon, index) => (
        <PokeItem key={index} name={pokemon.name} />
      ))}
    </ul>
  );
}

function PokeItem({ name }) {
  const [id, setId] = useState(1);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await apFetch.get(`/pokemon/${name}`);
        setId(response.data.id);
      } catch (error) {
        console.log("erro!");
      }
    }

    fetchPokemonData();
  }, [name]);

  return (
    <div id='box-pokemon'>
      <li>
        <h1>{name}</h1>
        <img className="poketure" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
      </li>
    </div>
  );
}

export default Pokedex;