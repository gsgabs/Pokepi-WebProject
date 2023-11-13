import React, { useState, useEffect } from 'react';
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
  // Função para obter a cor com base no tipo
  const getTypeColor = (type) => {
    switch (type) {
      case 'grass':
        return 'green';
      case 'fire':
        return 'red';
      case 'water':
        return 'blue';
      case 'bug':
        return 'lime';
      case 'rock':
        return '#a38c21';
      case 'poison':
        return '#b97fc9';
      case 'steel':
        return '#9eb7b8';
      case 'ghost':
        return '#7b62a3';
      case 'ground':
        return '#ab9842';
      case 'fighting':
        return '#d56723';
      case 'normal':
        return '#a4acaf';
      case 'ice':
        return '#51c4e7';
      case 'psychic':
        return '#f366b9';
      case 'electric':
        return '#eed535';
      case 'dark':
        return '#707070';
      case 'flying':
        return '#707070';
      case 'fairy':
        return '#fdb9e9';
      case 'dragon':
        return '#53a4cf';
      // Adicione mais tipos conforme necessário
      default:
        return 'gray';
    }
  };

  // Obtém a cor do primeiro tipo do Pokémon (pode ser ajustado conforme necessário)
  const backgroundColor = getTypeColor(types[0].type.name);

  return (
    <div id='box-pokemon'>
      <li >
        <h1>{name}</h1>
        <p className='tipo' style={{ backgroundColor }}>{types.map((typeData) => typeData.type.name).join(' | ')}</p>
        <Link to={`/${name}`}>
          <img className="poketure" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
        </Link>
      </li>
    </div>
  );
}

export default Pokedex;
