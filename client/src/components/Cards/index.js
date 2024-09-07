// Cards
import React from 'react';
import { Link } from 'react-router-dom';

export const Cards = ({ cards }) => {
    return (
        <section id='cards-section'>
            {cards.map((card, index) => (
                <div className="card" style={{ width: '18rem' }} key={index}>
                    <img src={card.image} className="card-img-top" alt={card.alt || 'Card image'} />
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.text}</p>
                        <Link to={card.link} className="btn btn-primary">Click to See Analysis</Link>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Cards;