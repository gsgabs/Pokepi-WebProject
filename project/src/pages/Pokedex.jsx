import { useState, useEffect } from 'react';
import apFetch from '../api/config';

function Pokedex() {
   
    // Setando post onde vai ser uma lista vazia onde adicionaremos os objetos trazidos pela API via JSON
    const [poke,setPoke]= useState([]);
    
  
    // Função assincrona para chamada
    const getPoke = async() => {
      try {
        const response = await apFetch.get("/pokemon");
        const data = response.data.results;
        setPoke(data);
      } catch (error) {
        console.log("erro!");
      }
    }

    useEffect(()=>{
          getPoke();
    },[]);

  return (
    <ul>
        {poke.map((pokemon, index) => (
          <li key={index}>{pokemon.name}
          <img src={pokemon.url} alt="" />
          </li>
        ))}
    </ul>
  );
}

export default Pokedex;