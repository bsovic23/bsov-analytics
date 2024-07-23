import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { dupsClean, cleanDataFx, analysisOne } from '../functions/projectEcho';

// Data Imports
let surveyScores;
let participantInformation;

try {
    surveyScores = require('../data/projectEcho').surveyScores;
    participantInformation = require('../data/projectEcho').participantInformation;
} catch (error) {
    surveyScores = 'No data found';
    participantInformation = 'No data found';
}

const ProjectEcho = () => {

    // ----- Page Variables
    
    const title = 'MO Pilot Project';

    // Healthcare Professional
    const [data, setData] = useState((participantInformation !== 'No data found') ? (dupsClean(participantInformation)) : 'No Participation data found')
    const [data2, setData2] = useState((participantInformation !== 'No data found') ? (cleanDataFx(surveyScores, participantInformation)) : 'No Participation data found')
    const [data3, setData3] = useState((participantInformation !== 'No data found') ? (analysisOne(data2)) : 'No data found found')

    const analysisButtons = [
        { id: 1, "name": "Delete Rows", "data": data },
        { id: 2, "name": "Celan Data", "data": data2 },
        { id: 3, "name": "Analsysi 1", "data": data3 },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default ProjectEcho;