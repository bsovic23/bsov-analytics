import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { moPilotDataCleanUp, finalDataAnalysisFx, surveyCounts } from '../functions/moPilot';

// Data Imports
let initialData;
let followUpData;

try {
    initialData = require('../data/moData').initialData;
    followUpData = require('../data/moData').followUpData;
} catch (error) {
    initialData = 'No data found';
    followUpData = 'No data found';
}

const MoPilot = () => {

    // ----- Page Variables
    
    const title = 'MO Pilot Project';

    // Healthcare Professional
    
    const [data, setData] = useState((initialData !== 'No data found' && followUpData !== 'No data found') ? (moPilotDataCleanUp(initialData, followUpData)) : 'No Initial or Follow up data found');
    const [data2, setData2] = useState((data !== 'No Initial or Follow up data found') ? (finalDataAnalysisFx(data)) : 'No Initial or Follow up data found');
    const [data3, setData3] = useState((initialData !== 'No data found' && followUpData !== 'No data found') ? (surveyCounts(initialData, followUpData)) : 'No Initial or Follow up data found');

    const analysisButtons = [
        { id: 1, "name": "Output", "data": data },
        { id: 2, "name": "Totals", "data": data2 },
        { id: 3, "name": "Site complete", "data": data3 },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default MoPilot;