import React from "react";
import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import queries from "../queries";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";

const PokemonDetails = (props) => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const {loading, error, data, refetch} = useQuery(
        queries.GET_POKEMON_DETAILS,
        {
            variables: {id},
            fetchPolicy: "cache-and-network",
        }
    );
    let partyFull = false;
    function alertFunc() {
        alert("Select a Trainer to catch me!");
    }
    const allTrainers = useSelector((state) => state.trainers);

    function getTrainerId(allTrainers) {
        let trainerSelected = null;
        allTrainers.map((trainer) => {
            if (trainer.selected) {
                trainerSelected = trainer.id;
            }
        });
        return trainerSelected;
    }

    function getPokemonId(allTrainers, trainerNow) {
        let ids = [];
        allTrainers.map((trainer) => {
            if (trainerNow === trainer.id && trainer.pokemon) {
                if (trainer.pokemon.length === 6) partyFull = true;
                for (var i = 0; i < trainer.pokemon.length; i++) {
                    ids.push(trainer.pokemon[i].id);
                }
            }
        });

        return ids;
    }
    let trainerId = getTrainerId(allTrainers);

    let caughtPokemonId = [];
    if (trainerId) {
        caughtPokemonId = getPokemonId(allTrainers, trainerId);
    }

    const catchPokemon = (selectFlag, pokemonDetails) => {
        if (selectFlag === "catch") {
            dispatch(actions.catchPokemon(trainerId, pokemonDetails));
        }
        if (selectFlag === "release") {
            dispatch(actions.releasePokemon(trainerId, pokemonDetails));
        }
    };
    if (data) {
        return (
            <div>
                {data &&
                    data.PokemonDetails.map((pokemon) => {
                        if (!trainerId) {
                            return (
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='pokeDetails'>
                                            <img
                                                alt={pokemon.name}
                                                src={pokemon.url}
                                                width='500'
                                                height='600'
                                            />
                                        </div>
                                        <h1 className='pokeDetails'>
                                            Name : {pokemon.name}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Height : {pokemon.height}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Weight : {pokemon.weight}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Experience: {pokemon.experience}
                                        </h1>
                                        <button
                                            className='button'
                                            onClick={() => alertFunc()}
                                        >
                                            {" "}
                                            Catch
                                        </button>{" "}
                                        <br></br>
                                        <Link
                                            to={`/pokemon/page/0`}
                                            className='link-button'
                                        >
                                            Back to all pokemons
                                            {/* <button className='button'>
                                                Back to all pokemons
                                            </button> */}
                                        </Link>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='pokeDetails'>
                                            <img
                                                alt={pokemon.name}
                                                src={pokemon.url}
                                                width='500'
                                                height='600'
                                            />
                                        </div>
                                        <h1 className='pokeDetails'>
                                            Name : {pokemon.name}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Height : {pokemon.height}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Weight : {pokemon.weight}
                                        </h1>
                                        <h1 className='pokeDetails'>
                                            Experience: {pokemon.experience}
                                        </h1>
                                        {caughtPokemonId.includes(
                                            pokemon.id
                                        ) && (
                                            <button
                                                className='button'
                                                onClick={() =>
                                                    catchPokemon(
                                                        "release",
                                                        pokemon
                                                    )
                                                }
                                            >
                                                Release
                                            </button>
                                        )}
                                        {!caughtPokemonId.includes(
                                            pokemon.id
                                        ) &&
                                            !partyFull && (
                                                <button
                                                    className='button'
                                                    onClick={() =>
                                                        catchPokemon(
                                                            "catch",
                                                            pokemon
                                                        )
                                                    }
                                                >
                                                    Catch
                                                </button>
                                            )}
                                        {!caughtPokemonId.includes(
                                            pokemon.id
                                        ) &&
                                            partyFull && (
                                                <button className='button'>
                                                    Party Full
                                                </button>
                                            )}
                                        <br></br>

                                        <Link
                                            to={`/pokemon/page/0`}
                                            className='link-button'
                                        >
                                            Back to all pokemons
                                            {/* <button className='button'>
                                                Back to all pokemons
                                            </button> */}
                                        </Link>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        );
    } else if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div className='error'>Error: {error.message}</div>;
    }
};

export default PokemonDetails;
