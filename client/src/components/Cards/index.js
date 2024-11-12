// Cards
import React from 'react';
import { Link } from 'react-router-dom';

export const Cards = ({ cards }) => {
    return (
        <section id='cards-section'>
            {cards.map((card, index) => (
                <Link to={card.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.text}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default Cards;