import React, { useState } from 'react';

// Functions
import { 
    moduleScoring,
    enrollmentDataAnalysis,
 } from '../functions/ceFx';

// Data
import { 
    moduleMockData,
    enrollmentMockData, 
} from '../data/ce';

// Page/Component Imports
import Page from '../components/Page';

const Ce = () => {
    // ----- CME
    const [moduleScoreData, setModuleScoreData] = useState(moduleScoring(moduleMockData));
    const [enrollmentData, setEnrollmentData] = useState(enrollmentDataAnalysis(enrollmentMockData));

    const title = "CE Data";
    
    const analysisButtons = [
        {id: 1, "name": "Module Data", "data": moduleScoreData},
        {id: 2, "name": "Enrollment Data", "data": enrollmentData},
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