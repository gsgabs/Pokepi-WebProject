import React, { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apFetch from '../api/config';
import './Pokedex.css';

function Pokedex() {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apFetch.get("/pokemon-form?limit=151");
        const data = response.data.results;
        const requests = data.map(pokemon => apFetch.get(`/pokemon-form/${pokemon.name}`));
        const responses = await Promise.all(requests);
        const pokemonData = responses.map(response => response.data);
        setPoke(pokemonData);
      } catch (error) {
        console.log("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {poke.map((pokemon, index) => (
        <PokeItem key={index} {...pokemon} />
      ))}
    </ul>
  );
}

function PokeItem({ name, id, types }) {
  return (
    <li>
      <h1>{name}</h1> 
      <p>{types.map((typeData) => typeData.type.name).join(' | ')}</p>
      <Link to={`/${name}`}><img className="" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} /></Link>
    </li>
  );
}

export default Pokedex;
