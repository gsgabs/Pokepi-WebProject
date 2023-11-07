//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

function Pokemon({name,id}) {

  return (
    <>
        <h1>{name}</h1>
      <img className="" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
    </>
  );
}

export default Pokemon;