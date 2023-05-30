const addTrainer = (name) => ({
    type: "CREATE_TRAINER",
    payload: {
        name: name,
    },
});

const deleteTrainer = (id) => ({
    type: "DELETE_TRAINER",
    payload: {id: id},
});

const selectTrainer = (id) => ({
    type: "SELECT_TRAINER",
    payload: {id: id},
});

const unselectTrainer = (id) => ({
    type: "UNSELECT_TRAINER",
    payload: {id: id},
});

const catchPokemon = (id, pokemonDetails) => ({
    type: "CATCH_POKEMON",
    payload: {
        id: id,
        pokemonDetails: pokemonDetails,
    },
});

const releasePokemon = (id, pokemonDetails) => ({
    type: "RELEASE_POKEMON",
    payload: {
        id: id,
        pokemonDetails: pokemonDetails,
    },
});
const searchPokemon = (pokemonName) => ({
    type: "SEARCH_POKEMON",
    payload: {
        pokemonName: pokemonName,
    },
});
module.exports = {
    addTrainer,
    deleteTrainer,
    selectTrainer,
    unselectTrainer,
    catchPokemon,
    releasePokemon,
    searchPokemon,
};
