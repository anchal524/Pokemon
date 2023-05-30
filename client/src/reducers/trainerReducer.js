import {v4 as uuid} from "uuid";
const initalState = [
    {
        id: uuid(),
        name: "null",
        pokemon: [],
        selected: false,
        pokemonDetails: null,
    },
];

let copyState = null;
let index = 0;
let pokemonDelete = null;

const trainerReducer = (state = [], action) => {
    const {type, payload} = action;

    switch (type) {
        case "CREATE_TRAINER":
            return [
                ...state,
                {
                    id: uuid(),
                    name: payload.name,
                    pokemon: [],
                    selected: false,
                    pokemonDetails: null,
                },
            ];
        case "DELETE_TRAINER":
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.splice(index, 1);
            return [...copyState];
        case "SELECT_TRAINER":
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.forEach((element) => {
                element.selected = false;
            });
            copyState[index].selected = true;
            return [...copyState];
        case "UNSELECT_TRAINER":
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].selected = false;
            return [...copyState];
        case "CATCH_POKEMON":
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].pokemon.push(payload.pokemonDetails);
            return [...copyState];
        case "RELEASE_POKEMON":
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            pokemonDelete = copyState[index].pokemon.findIndex(
                (x) => x === payload.pokemonDetails
            );
            copyState[index].pokemon.splice(pokemonDelete, 1);
            return [...copyState];
        default:
            return state;
    }
};

export default trainerReducer;
