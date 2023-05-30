import {gql} from "@apollo/client";

const GET_POKEMON_LIST = gql`
    query PokemonList($pageNum: Int!) {
        PokemonList(pageNum: $pageNum) {
            id
            name
        }
    }
`;

const GET_POKEMON_DETAILS = gql`
    query PokemonDetails($id: String!) {
        PokemonDetails(id: $id) {
            id
            name
            experience
            height
            weight
            url
        }
    }
`;

const GET_POKEMON_SEARCH_DETAILS = gql`
    query PokemonSearch($name: String!) {
        PokemonSearch(name: $name) {
            id
            name
            experience
            height
            weight
            url
        }
    }
`;

let exported = {
    GET_POKEMON_DETAILS,
    GET_POKEMON_LIST,
    GET_POKEMON_SEARCH_DETAILS,
};

export default exported;
