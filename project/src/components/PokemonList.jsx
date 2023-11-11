import React from 'react';

function PokemonList({ data }) {

  console.log(data);
  
  return (
    <table>
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.stat.name}</td>
            <td>{item.base_stat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PokemonList;