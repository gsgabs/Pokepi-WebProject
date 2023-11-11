// Pokemon.jsx
import React, { useState, useEffect } from 'react';
import apFetch from '../api/config';
import { useParams } from 'react-router-dom';
import PokemonList from '../components/PokemonList';

function Pokemon() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = [`pokemon-form/${id}`, `pokemon/${id}`];
      try {
        const [pokemonResponse, additionalInfoResponse] = await Promise.all(
          endpoints.map(endpoint => apFetch.get(endpoint))
        );
        setData({
          pokemon: pokemonResponse.data,
          additionalInfo: additionalInfoResponse.data,
          stats: additionalInfoResponse.data.stats,
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
    </div>
  );
}

export default Pokemon;
