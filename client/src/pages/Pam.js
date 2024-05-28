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
import { 
    pamMockData
} from '../data/pam';

const Pam = () => {

    // ----- Page Variables
    
    const title = 'Pam Analysis';

    // Analysis Numbers
    const [counts, setCounts] = useState(pamCounts(pamMockData));
    const [levelChange, setLevelChange] = useState(analyzeLevelChanges(pamMockData));
    const [activationChange, setActivationChange] = useState(analyzeBaselineActivationChanges(pamMockData));

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