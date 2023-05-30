import React from "react";
import {useState} from "react";
import {useQuery, useLazyQuery} from "@apollo/client";
import queries from "../queries";
import {Link, useParams} from "react-router-dom";
import actions from "../actions";
import SearchVal from "./Search";
const PokemonSearchDetails = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {loading, error, data, refetch} = useQuery(
        queries.GET_POKEMON_SEARCH_DETAILS,
        {
            variables: {name: searchTerm},
            fetchPolicy: "cache-and-network",
        }
    );

    const searchValue = async (value) => {
        setSearchTerm(value);
    };
    if (!searchTerm) {
        return (
            <div>
                <SearchVal searchValue={searchValue} />

                {data && data.PokemonSearch[0] && (
                    <div className='card'>
                        <div className='card-body'>
                            <div className='pokeDetails'>
                                <img
                                    alt={data.PokemonSearch[0].name}
                                    src={data.PokemonSearch[0].url}
                                    width='500'
                                    height='600'
                                />
                            </div>
                            <h1 className='pokeDetails'>
                                Name : {data.PokemonSearch[0].name}
                            </h1>
                            <h1 className='pokeDetails'>
                                Height : {data.PokemonSearch[0].height}
                            </h1>
                            <h1 className='pokeDetails'>
                                Weight : {data.PokemonSearch[0].weight}
                            </h1>
                            <h1 className='pokeDetails'>
                                Experience: {data.PokemonSearch[0].experience}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <SearchVal searchValue={searchValue} />

                {data && data.PokemonSearch[0] ? (
                    <div className='card'>
                        <div className='card-body'>
                            <div className='pokeDetails'>
                                <img
                                    alt={data.PokemonSearch[0].name}
                                    src={data.PokemonSearch[0].url}
                                    width='500'
                                    height='600'
                                />
                            </div>
                            <h1 className='pokeDetails'>
                                Name : {data.PokemonSearch[0].name}
                            </h1>
                            <h1 className='pokeDetails'>
                                Height : {data.PokemonSearch[0].height}
                            </h1>
                            <h1 className='pokeDetails'>
                                Weight : {data.PokemonSearch[0].weight}
                            </h1>
                            <h1 className='pokeDetails'>
                                Experience: {data.PokemonSearch[0].experience}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <h2 className='pokeDetails'> Not found</h2>
                )}
            </div>
        );
    }
};
export default PokemonSearchDetails;
