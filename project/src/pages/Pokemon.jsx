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
      try {
        const [pokemonResponse, statusResponse] = await Promise.all([
          apFetch.get(`pokemon-form/${id}`),
          apFetch.get(`stat`),
        ]);
        setData(pokemonResponse.data);
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

  const names = data.name;
  const types = data.types;
  const sprite = data.sprites.front_default;
  const typeNames = types.map((typeData) => typeData.type.name);

  return (
    <div>
      <p>{names}</p>
      <img src={sprite} alt={names} />
      <p>{typeNames.join(' | ')}</p>
      <PokeInfo name={names} />
      <PokeStatusNum name={names}/>
    </div>
  );


function PokeInfo({ name }) {
  const [pokemonAp, setPokemonAp] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokeAp = async () => {
      try {
        const res = await apFetch.get(`pokemon/${name}`);
        setPokemonAp(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokeAp();
  }, [name]);

  if (loading) {
    return <h3>Carregando informações adicionais...</h3>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const height = pokemonAp.height;
  const weight = pokemonAp.weight;
  const number = ("0000" + pokemonAp.id).slice(-4);

  return (
    <div>
      <p>National №: #{number}</p>
      <p>Tamanho: {height}</p>
      <p>Peso: {weight}</p>
    </div>
  );
}

function PokeStatusNum({name}) {
  const [statusNum, setStatusNum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokeStatus = async () => {
      try {
        const res = await apFetch.get(`pokemon/${name}`);        
        setStatusNum(res.data.stats);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokeStatus();
  }, []);
  
  if (loading) {
    return <h3>Carregando informações de status...</h3>;
  }
  
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
        <PokemonList data={statusNum}/>
    </div>
  );
}
}
export default Pokemon;
