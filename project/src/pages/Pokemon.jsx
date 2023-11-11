// Pokemon.jsx
import React, { useState, useEffect } from 'react';
import apFetch from '../api/config';
import { useParams } from 'react-router-dom';

// components
import PokemonList from '../components/PokemonList';
import PokemonEvol from '../components/PokemonEvol'

function Pokemon() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = [`pokemon-form/${id}`, `pokemon/${id}`,`pokemon-species/${id}`];
      try {
        const [pokemonResponse, additionalInfoResponse, speciesResponse] = await Promise.all(
          endpoints.map(endpoint => apFetch.get(endpoint))
        );
        setData({
          pokemon: pokemonResponse.data,
          additionalInfo: additionalInfoResponse.data,
          stats: additionalInfoResponse.data.stats,
          especies: speciesResponse.data,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <h3>Carregando...</h3>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const { name, sprites, types } = data.pokemon || {};
  const { height, weight, id: pokemonId } = data.additionalInfo || {};
  const typeNames = types ? types.map((typeData) => typeData.type.name) : [];
  const especiesNum = data.especies.evolution_chain.url.replace("https://pokeapi.co/api/v2/evolution-chain/","")

  return (
    <div>
      <p>{name}</p>
      <img src={sprites ? sprites.front_default : ''} alt={name} />
      <p>{typeNames.join(' | ')}</p>
      <div>
        <p>National №: #{("0000" + pokemonId).slice(-4)}</p>
        <p>Tamanho: {height}</p>
        <p>Peso: {weight}</p>
      </div>
      <div>
        <PokemonList data={data.stats || []} />
      </div>
      <div>
        <PokemonEvol id={especiesNum}/>
      </div>
    </div>
  );
}

export default Pokemon;