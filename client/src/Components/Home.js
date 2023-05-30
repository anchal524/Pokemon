import React from "react";
import pika from "../pikachu1.jpeg";

const Home = () => {
    return (
        <div>
            <h1>
                This is a Pokemon website where you can view Pokemons and their
                info. You can form your team of 6 pokemons. Let's get started!
                Catch em all!!!
            </h1>
            <img src={pika} className='pika' alt='pika' />
        </div>
    );
};

export default Home;
