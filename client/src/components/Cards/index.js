// Cards

export const Cards = (cards) => {
    return(
        <section id='cards-section'>
            {cards.map(
                <div id='cards=card'>
                    <h1>{cards.title}</h1>
                    <p>{cards.link}</p>
                    <div>{cards.image}</div>
                    <p>{cards.description}</p>
                </div>
            )}
        </section>
    )
};

export default Cards;