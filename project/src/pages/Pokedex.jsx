import { useState, useEffect } from 'react';
import Pokemon from '../components/Pokemon';
import apFetch from '../api/config';

function Pokedex() {
   
    // Setando post onde vai ser uma lista vazia onde adicionaremos os objetos trazidos pela API via JSON
    const [poke,setPoke]= useState([]);
    const [id,setId] = useState(0);
    
  
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

      setId(id+1);

  return (
    <ul>
        {poke.map((pokemon, index) => (
          <li key={index}>
            <Pokemon name={pokemon.name} id={id}/>
          </li>
        ))}
    </ul>
  );
}

export default Pokedex;