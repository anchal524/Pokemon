import React from "react";
import {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import queries from "../queries";
import {useParams, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";

const PokemonPage = (props) => {
    let {page} = useParams();
    let pageNum = parseInt(page);
    const dispatch = useDispatch();
    const {loading, error, data, refetch} = useQuery(queries.GET_POKEMON_LIST, {
        variables: {pageNum},
        fetchPolicy: "cache-and-network",
    });

    let partyFull = false;
    const allTrainers = useSelector((state) => state.trainers);
    function alertFunc() {
        alert("Select a Trainer to catch me!");
    }
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

    if ((page && parseInt(page) >= 57) || parseInt(page) < 0) {
        return <div className='error'>Error 404: Page not Found</div>;
    }
    if (data) {
        return (
            <div>
                {pageNum < 0 ? (
                    <p>error</p>
                ) : (
                    <div>
                        {data &&
                            data.PokemonList.map((pokemon) => {
                                if (!trainerId) {
                                    return (
                                        <div class='row'>
                                            <div class='col-sm-10'>
                                                <div
                                                    className='card'
                                                    key={pokemon.id}
                                                >
                                                    <div className='card-body'>
                                                        <p>
                                                            <Link
                                                                to={`/pokemon/${pokemon.id}`}
                                                            >
                                                                <img
                                                                    alt={
                                                                        pokemon.name
                                                                    }
                                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                                                    width='500'
                                                                    height='600'
                                                                />
                                                            </Link>
                                                        </p>
                                                        <br></br>
                                                        <Link
                                                            to={`/pokemon/${pokemon.id}`}
                                                            className='pokemon-img'
                                                        >
                                                            {pokemon.name}
                                                        </Link>

                                                        <button
                                                            className='button'
                                                            onClick={() =>
                                                                alertFunc()
                                                            }
                                                        >
                                                            Catch
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div class='row'>
                                            <div class='col-sm-10'>
                                                <div
                                                    className='card'
                                                    key={pokemon.id}
                                                >
                                                    <div className='card-body'>
                                                        <p>
                                                            <Link
                                                                to={`/pokemon/${pokemon.id}`}
                                                            >
                                                                <img
                                                                    alt={
                                                                        pokemon.name
                                                                    }
                                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                                                    width='500'
                                                                    height='600'
                                                                />
                                                            </Link>
                                                        </p>
                                                        <br></br>
                                                        <Link
                                                            to={`/pokemon/${pokemon.id}`}
                                                            className='pokemon-img'
                                                        >
                                                            {pokemon.name}
                                                        </Link>
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        <div className='pages'>
                            {page && page === "0" ? (
                                <p></p>
                            ) : (
                                <Link
                                    to={`/pokemon/page/${parseInt(page) - 1}`}
                                    className='link-button'
                                >
                                    Previous
                                    {/* <button className='button'>Previous</button> */}
                                </Link>
                            )}
                            {page && parseInt(page) === 56 ? (
                                <p></p>
                            ) : (
                                <Link
                                    to={`/pokemon/page/${parseInt(page) + 1}`}
                                    className='link-button'
                                >
                                    Next
                                    {/* <button className='button'>Next</button> */}
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    } else if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div className='error'>Error: {error.message}</div>;
    }
};

export default PokemonPage;
