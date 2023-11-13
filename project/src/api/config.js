import axios from "axios";
//Importação da biblioteca axios para manipulação da API usando react

const apFetch = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
    //Atribuindo dados URL para manipulação
}) 

export default apFetch;