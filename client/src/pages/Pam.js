import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { 
    pamCounts,
    analyzeLevelChanges,
    analyzeBaselineActivationChanges
} from '../functions/pamFx';


// Data Imports
let pamMockData;
try {
    pamMockData = require('../data/pam').pamMockData;
} catch (error) {
    pamMockData = 'No data found';
}

const Pam = () => {

    // ----- Page Variables
    
    const title = 'Pam Analysis';

    // Analysis Numbers
    const [counts, setCounts] = useState((pamMockData !== 'No data found') ? (pamCounts(pamMockData)) : 'No Pam Data Found');
    const [levelChange, setLevelChange] = useState((pamMockData !== 'No data found') ? (analyzeLevelChanges(pamMockData)) : 'No Pam Data Found');
    const [activationChange, setActivationChange] = useState((pamMockData !== 'No data found') ? (analyzeBaselineActivationChanges(pamMockData)) : 'No Pam Data Found');

    const analysisButtons = [
        { id: 1, "name": "Counts data", "data": counts },
        { id: 2, "name": "Basline Level Change", "data": levelChange },
        { id: 3, "name": "Activation Level Change", "data": activationChange },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Pam;