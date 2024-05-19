import React, { useState } from 'react';

// Functions
import { moduleScoring } from '../functions/ceFx';

// Data
import { moduleMockData } from '../data/ce';

// Page/Component Imports
import Page from '../components/Page';

const Ce = () => {
    // ----- CME
    const [moduleScoreData, setModuleScoreData] = useState(moduleScoring(moduleMockData));
 

    const title = "CE Data";
    
    const analysisButtons = [
        {id: 1, "name": "Module Data", "data": moduleScoreData},
    ];

    return(
        <section id='cme'>
            <div>
                < Page pageTitle={title} buttons={analysisButtons} />
            </div>
        </section>
    )
};

export default Ce;