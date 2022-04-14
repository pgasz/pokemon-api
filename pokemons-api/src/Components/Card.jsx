import React from 'react';

const Card = ({ pokemonData, loading, infoPokemon }) => {
    return (
        <>
            {console.log(`CARD pokemon data'`, pokemonData)}
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                pokemonData.map((item) => {
                    return (
                        <article
                            key={item.id}
                            className="card"
                            onClick={() => infoPokemon(item)}
                        >
                            <h2 className="id">{item.id}</h2>
                            <img src={item.sprites.front_default} alt="" />
                            <h2 className="name">{item.name}</h2>
                            <div className="types">
                                {item.types.map((item, id) => {
                                    return (
                                        <h3 key={id} className={item.type.name}>
                                            {item.type.name}
                                        </h3>
                                    );
                                })}
                            </div>
                        </article>
                    );
                })
            )}
        </>
    );
};

export default Card;
