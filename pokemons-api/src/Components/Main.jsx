import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import Card from './Card';
import PokemonDetails from './PokemonDetails';

const Main = () => {
    // const pokemonDetailsContainer = useRef();
    // const [isPokemonDetailsActive, setisPokemonDetailsActive] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [pokeDex, setPokeDex] = useState();

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
        <>
            <main>
                <Card
                    pokemonData={pokemonData}
                    loading={loading}
                    infoPokemon={(poke) => setPokeDex(poke)}
                ></Card>

                <div className="btn-group">
                    {previousUrl ? (
                        <button
                            onClick={() => {
                                setPokemonData([]);
                                setUrl(previousUrl);
                            }}
                        >
                            Previous
                        </button>
                    ) : (
                        ''
                    )}
                    {nextUrl ? (
                        <button
                            onClick={() => {
                                setPokemonData([]);
                                setUrl(nextUrl);
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </main>
            <section className="pokemon-details-container active">
                <PokemonDetails data={pokeDex}></PokemonDetails>
            </section>
        </>
    );
};

export default Main;
