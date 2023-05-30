import {useDispatch} from "react-redux";
import actions from "../actions";
import React from "react";
import {useParams, Link} from "react-router-dom";

function Trainer(props) {
    const dispatch = useDispatch();

    const deleteTrainer = () => {
        dispatch(actions.deleteTrainer(props.trainer.id));
    };

    const selectTrainer = (selectFlag) => {
        if (selectFlag === "select")
            dispatch(actions.selectTrainer(props.trainer.id));
        if (selectFlag === "unselect")
            dispatch(actions.unselectTrainer(props.trainer.id));
    };
    const catchPokemon = (pokemonDetails) => {
        dispatch(actions.releasePokemon(props.trainer.id, pokemonDetails));
    };

    return (
        <div className='trainer-wrapper'>
            <p>Trainer:{props.trainer.name}</p>
            <div key={props.trainer.id}>
                Pokemons:
                <div>
                    {props.trainer.pokemon &&
                        props.trainer.pokemon.map((pokeData) => {
                            return (
                                <div class='row'>
                                    <div class='col-sm-10'>
                                        <div className='card' key={pokeData.id}>
                                            <div className='card-body'>
                                                <p>
                                                    <Link
                                                        to={`/pokemon/${pokeData.id}`}
                                                    >
                                                        <img
                                                            alt={pokeData.name}
                                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`}
                                                            width='500'
                                                            height='600'
                                                        />
                                                    </Link>
                                                </p>
                                                <br></br>

                                                <Link
                                                    to={`/pokemon/${pokeData.id}`}
                                                    className='pokemon-img'
                                                >
                                                    {pokeData.name}
                                                </Link>

                                                <button
                                                    className='button'
                                                    onClick={() =>
                                                        catchPokemon(pokeData)
                                                    }
                                                >
                                                    Release
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            {!props.trainer.selected && (
                <button className='button' onClick={deleteTrainer}>
                    Delete Trainer
                </button>
            )}
            {!props.trainer.selected && (
                <button
                    className='button'
                    onClick={() => selectTrainer("select")}
                >
                    Select Trainer
                </button>
            )}
            {props.trainer.selected && (
                <button
                    className='button'
                    onClick={() => selectTrainer("unselect")}
                >
                    Selected
                </button>
            )}
        </div>
    );
}

export default Trainer;
