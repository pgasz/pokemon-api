import React from 'react';

const PokemonDetails = ({ data, backFunction }) => {
    return (
        <article className="container">
            {!data ? (
                ''
            ) : (
                <div className="content">
                    <h1>{data.name}</h1>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                        alt=""
                    />
                    <div className="abilities">
                        {data.abilities.map((item, id) => {
                            return <h2 key={id}>{item.ability.name}</h2>;
                        })}
                    </div>
                    <div className="measurements">
                        <h2>
                            weight: <span>{data.weight}</span>
                        </h2>
                        <h2>
                            height: <span>{data.height}</span>
                        </h2>
                    </div>
                    <div
                        className="back-button"
                        onClick={() => {
                            backFunction();
                        }}
                    >
                        BACK
                    </div>
                </div>
            )}
        </article>
    );
};

export default PokemonDetails;
