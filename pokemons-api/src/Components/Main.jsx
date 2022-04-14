import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
    IoIosArrowBack as PreviousArrow,
    IoIosArrowForward as NextArrow,
} from 'react-icons/io';
import {
    BsFillMoonFill as DarkMode,
    BsFillBrightnessHighFill as LightMode,
} from 'react-icons/bs';

import Card from './Card';
import PokemonDetails from './PokemonDetails';
import Loading from './Loading';

const Main = () => {
    const pokemonDetailsContainer = useRef();
    const [isPokemonDetailsActive, setisPokemonDetailsActive] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [pokeDetails, setPokeDetails] = useState();
    const [darkMode, setDarkMode] = useState(false);

    const getPokemonDetails = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            setPokemonData((state) => {
                state = [...state, result.data];
                state.sort((a, b) => (a.id > b.id ? 1 : -1));
                return state;
            });
        });
    };

    const fetchPokemons = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        getPokemonDetails(res.data.results);
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemons();
    }, [url]);

    return (
        <div id="theme" className={`${darkMode ? 'dark' : ''}`}>
            <h1 id="header">Choose Your Pokemon!</h1>
            <div id="switch" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightMode /> : <DarkMode />}
            </div>
            <main>
                <div className="card-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        pokemonData.map((item, id) => {
                            return (
                                <Card
                                    key={id}
                                    data={item}
                                    infoPokemon={(pokemon) => {
                                        setPokeDetails(pokemon);
                                        setisPokemonDetailsActive(true);
                                    }}
                                />
                            );
                        })
                    )}
                </div>
            </main>
            <button
                className={`previous-btn navigation-button ${
                    !previousUrl ? 'hide' : ''
                }`}
                onClick={() => {
                    setPokemonData([]);
                    setUrl(previousUrl);
                }}
            >
                <PreviousArrow />
            </button>
            <button
                className={`next-btn navigation-button ${
                    !nextUrl ? 'hide' : ''
                }`}
                onClick={() => {
                    setPokemonData([]);
                    setUrl(nextUrl);
                }}
            >
                <NextArrow />
            </button>
            <section
                ref={pokemonDetailsContainer}
                className={`pokemon-details-container ${
                    isPokemonDetailsActive ? 'active' : ''
                }`}
                onClick={(e) => {
                    if (e.target === pokemonDetailsContainer.current) {
                        setisPokemonDetailsActive(false);
                    }
                }}
            >
                <PokemonDetails
                    data={pokeDetails}
                    backFunction={() => setisPokemonDetailsActive(false)}
                ></PokemonDetails>
            </section>
        </div>
    );
};

export default Main;
