import React, { useState } from 'react';

// Functions
import { 
    moduleScoring,
    enrollmentDataAnalysis,
 } from '../functions/ceFx';

// Data
let moduleMockData, enrollmentMockData;
try {
    moduleMockData = require('../data/ce').moduleMockData;
    enrollmentMockData = require('../data/ce').enrollmentMockData;
} catch (error) {
    moduleMockData = 'No data found';
    enrollmentMockData = 'No data found';
}

// Page/Component Imports
import Page from '../components/Page';

const Ce = () => {
    // ----- CME
    const [moduleScoreData, setModuleScoreData] = useState((moduleMockData !== 'No data found') ? (moduleScoring(moduleMockData)) : 'No Module Data Found');
    const [enrollmentData, setEnrollmentData] = useState((enrollmentMockData !== 'No data found') ? (enrollmentDataAnalysis(enrollmentMockData)) : 'No Enrollment Data Found');

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