import React from "react";
import logo from "./pokemon.jpeg";
import "./App.css";
import {NavLink, BrowserRouter as Router, Route} from "react-router-dom";
import PokemonDetails from "./Components/PokemonDetails";
import PokemonPage from "./Components/Pokemon";
import TrainerList from "./Components/TrainersList";
import Home from "./Components/Home";
import PokemonSearchDetails from "./Components/SearchPokemon";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000",
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <header className='App-header'>
                        <img src={logo} className='App-logo' alt='logo' />
                        {/* <h1 className='App-title'>Pokemon</h1> */}
                        <nav>
                            <NavLink className='navlink' to='/'>
                                Home
                            </NavLink>
                            <NavLink className='navlink' to='/pokemon/page/0'>
                                Pokemons
                            </NavLink>
                            <NavLink className='navlink' to='/trainer'>
                                Trainers
                            </NavLink>
                            <NavLink className='navlink' to='/search'>
                                Search
                            </NavLink>
                        </nav>
                    </header>
                    <Route exact path='/' component={Home} />
                    <Route path='/pokemon/page/:page' component={PokemonPage} />
                    <Route path='/pokemon/:id' component={PokemonDetails} />
                    <Route path='/trainer' component={TrainerList} />
                    <Route path='/search' component={PokemonSearchDetails} />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
