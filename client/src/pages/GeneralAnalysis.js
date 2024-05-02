import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { countUniqueIdsPerState } from '../functions/generalAnalysisFx';

// Data Imports

export const GeneralAnalysis = () => {

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    const analysisButtons = [
     
    ];
    
    return(
        <section class='page' id='general-analysis'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;