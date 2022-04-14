import React from 'react';

const Card = ({ data, infoPokemon }) => {
    return (
        <div className="card__wrap--outer">
            <article
                key={data.id}
                className="card"
                onClick={() => infoPokemon(data)}
            >
                <h2 className="id">{data.id}</h2>
                <img src={data.sprites.front_default} alt="" />
                <h2 className="name">{data.name}</h2>
                <div className="types">
                    {data.types.map((item, id) => {
                        return (
                            <h3 key={id} className={item.type.name}>
                                {item.type.name}
                            </h3>
                        );
                    })}
                </div>
            </article>
        </div>
    );
};

export default Card;
