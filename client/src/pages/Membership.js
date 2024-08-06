import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { 
    wildApricotDupsFx,
    wildApricotMemberLapseFx
} from '../functions/membershipFx';

// Data Imports
let wildApricotData;

try {
    wildApricotData = require('../data/membership').wildApricotData;
} catch (error) {
    wildApricotData = 'No data found';
};


export const Membership = () => {

    // Variables
    const [dups, setDups] = useState((wildApricotData !== 'No data found') ? (wildApricotDupsFx(wildApricotData)) : 'No Wild Apricot Data');
    const [lapsedData, setLapsedData] = useState((wildApricotData !== 'No data found') ? (wildApricotMemberLapseFx(wildApricotData)) : 'No Wild Apricot Data');
   

    //Page Variables
    const pageTitle = 'Membership Analysis';

    const analysisButtons = [
        {id: 1, "name": "Wild Apricot Dups", "data": dups},
        {id: 2, "name": "Wild Apricot Lapsed Members", "data": lapsedData},
    ];
    
    return(
        <section className='page' id='membership'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default Membership;