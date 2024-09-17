import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// Function Imports
import { 
    wildApricotDupsFx,
    wildApricotMemberLapseFx,
    wildApricotYearAnalysis,
    calculateRetention
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
    const month = 7;
    const year = 2024;
    const [lapsedData, setLapsedData] = useState((wildApricotData !== 'No data found') ? wildApricotMemberLapseFx(wildApricotData, month, year) : 'No Wild Apricot Data');
    const [trends, setTrends] = useState((wildApricotData !== 'No data found') ? (wildApricotYearAnalysis(wildApricotData)) : 'No Wild Apricot Data');
    const years = [2021,2022, 2023, 2024];
    const [retention, setRetention] = useState((wildApricotData !== 'No data found') ? (calculateRetention(wildApricotData, years)) : 'No Wild Apricot Data');

    //Page Variables
    const pageTitle = 'Membership Analysis';

    const analysisButtons = [
        {id: 1, "name": "Wild Apricot Dups", "data": dups},
        {id: 2, "name": "Wild Apricot Lapsed Members:" + month, "data": lapsedData},
        {id: 3, "name": "Wild Apricot Year Trends", "data": trends},
        {id: 4, "name": "Retention Analysis", "data": retention},
    ];
    
    return(
        <section className='page' id='membership'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default Membership;