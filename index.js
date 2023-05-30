const {ApolloServer, gql} = require("apollo-server");
const uuid = require("uuid"); //for generating _id's
const axios = require("axios");
const redis = require("redis");
const client = redis.createClient();

// Create the type definitions for the query and our data
const typeDefs = gql`
    type Query {
        PokemonList(pageNum: Int): [PokemonList]
        PokemonDetails(id: String): [Pokemon]
        PokemonSearch(name: String): [Pokemon]
    }
    type PokemonList {
        id: ID!
        name: String!
    }

    type Pokemon {
        id: ID!
        name: String!
        experience: Int
        height: Int
        weight: Int
        url: String
    }
`;
async function getData(pageNum) {
    const offset = pageNum * 20;
    const url =
        "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20";
    const {data} = await axios.get(url);
    return data;
}

async function getPokemonData(id) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    const {data} = await axios.get(url);
    return data;
}
async function connect() {
    await client.connect();
}
connect();
const resolvers = {
    Query: {
        PokemonList: async (_, args) => {
            const pages = await client.hKeys("PokemonPage");
            let pokeData = [];
            for (var i = 0; i < pages.length; i++) {
                pages[i] = JSON.parse(pages[i]);
            }

            if (pages.includes(args.pageNum)) {
                let redisData = await client.hGet("PokemonPage", args.pageNum);
                pokeData = JSON.parse(redisData);
            } else {
                const dataApi = await getData(args.pageNum);
                const totalResults = dataApi["count"];
                const data = dataApi["results"];

                for (var i = 0; i < data.length; i++) {
                    let url = data[i]["url"];
                    let id = url.split("/")[6];

                    pokeData.push({
                        id: id,
                        name: data[i]["name"],
                    });
                }

                let settingInCache = await client.hSet(
                    "PokemonPage",
                    args.pageNum,
                    JSON.stringify(pokeData)
                );
            }
            return pokeData;
        },

        PokemonDetails: async (_, args) => {
            const ids = await client.hKeys("PokemonDetails");
            for (var i = 0; i < ids.length; i++) {
                ids[i] = JSON.parse(ids[i]);
            }
            let pokeData = [];
            if (isNaN(parseInt(args.id))) {
                return pokeData;
            }

            let id = JSON.parse(args.id);
            if (ids.includes(id)) {
                let redisData = await client.hGet(
                    "PokemonDetails",
                    JSON.parse(args.id)
                );
                pokeData = JSON.parse(redisData);
            } else {
                let pokemonDetails = await getPokemonData(args.id);
                pokeData.push({
                    id: pokemonDetails["id"],
                    name: pokemonDetails["name"],
                    experience: pokemonDetails["base_experience"],
                    height: pokemonDetails["height"],
                    weight: pokemonDetails["weight"],
                    url: pokemonDetails["sprites"]["other"]["official-artwork"][
                        "front_default"
                    ],
                });
                let settingInCache = await client.hSet(
                    "PokemonDetails",
                    args.id,
                    JSON.stringify(pokeData)
                );
            }
            return pokeData;
        },

        PokemonSearch: async (_, args) => {
            let pokeData = [];
            if (!args.name) {
                return pokeData;
            }
            let pokemonDetails = await getPokemonData(args.name);
            pokeData.push({
                id: pokemonDetails["id"],
                name: pokemonDetails["name"],
                experience: pokemonDetails["base_experience"],
                height: pokemonDetails["height"],
                weight: pokemonDetails["weight"],
                url: pokemonDetails["sprites"]["other"]["official-artwork"][
                    "front_default"
                ],
            });
            return pokeData;
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});
