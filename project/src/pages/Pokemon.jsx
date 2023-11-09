import React, { useState, useEffect } from 'react';
import apFetch from '../api/config';
import { useParams } from 'react-router-dom';

function Pokemon() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apFetch.get(`pokemon-form/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err); // Define error como o objeto de erro
      } finally {
          setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Adiciona "id" como dependência

  if (loading) {
      return <h3>Carregando...</h3>;
  }
  
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  
  const names = data.name; // Acesse o nome do Pokémon diretamente
  const types = data.types; // Acesse a matriz de tipos
  
  const sprite = data.sprites.front_default;
  const typeNames = types.map((typeData) => typeData.type.name);
  
  return (
    <div>
      <p>{names}</p>
      <img src={sprite} alt={names} />
      <p>{typeNames.join(' | ')}</p>
      <PokeInfo name={names}/>
    </div>
  );
  
  function PokeInfo({name}){

        const [pokemonAp, setPokemonAp] = useState({});

        useEffect(() => {
            const fetchPokeAp = async () => {
            try {
                const res = await apFetch.get(`pokemon/${name}`);
                setPokemonAp(res.data);
            }catch (err) {
                setError(err);
            }finally {
                setLoading(false);
            }
            };
            fetchPokeAp();
        }, [name]); 

    const height = pokemonAp.height;
    const weight = pokemonAp.weight;
    const number = ("0000" + pokemonAp.id).slice(-4);;
    
    return(
        <div>
            <p>National №: #{number}</p>
            <p>tamanho:{height}</p>
            <p>peso:{weight}</p>
        </div>
    );
  }
}

export default Pokemon;
