
import Cards from "../components/Cards";

const importCards = [
    {title: 'practice 1 title', text: 'practice 1 text'},
    {title: 'practice 2 title', text: 'practice 2 text'},
    {title: 'practice 3 title', text: 'practice 3 text'},
    {title: 'practice 4 title', text: 'practice 4 text'},
    {title: 'practice 5 title', text: 'practice 5 text'},
    {title: 'practice 6 title', text: 'practice 6 text'},
    {title: 'practice 7 title', text: 'practice 7 text'},
    {title: 'practice 8 title', text: 'practice 8 text'},
    {title: 'practice 9 title', text: 'practice 9 text'},
    {title: 'practice 10 title', text: 'practice 10 text'},
]

const PracticeCards = () => {
    return(
        <section>
            <Cards cards={importCards}/>
        </section>
    )
};

export default PracticeCards;