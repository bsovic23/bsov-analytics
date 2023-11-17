import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { klcNoCourseRegistrationFx, klcRegistrationNoCompleteFx } from '../functions/generalAnalysisFx'; // KLC General Functions
import { ddCleanupDeletes } from '../functions/generalAnalysisFx'; // Data Dictionary General Analysis Functions

// Data Imports
// import { generalAnalysisData, dataDictionaryAll, dataDictionaryEdits } from '../data/generalAnalysis';

export const GeneralAnalysis = () => {
    const [participantCountOne, setFxOne] = useState(klcNoCourseRegistrationFx(generalAnalysisData) || []);
    const [participantCountTwo, setFxTwo] = useState(klcRegistrationNoCompleteFx(generalAnalysisData) || []);
    const [cleanData, setCleanData] = useState(ddCleanupDeletes(dataDictionaryAll || [], dataDictionaryEdits || []));
  
    const title = "General Analysis";

    const analysisButtons = [
        {id: 1, "name": "KLC Participants, No Completion, No Registration", data: participantCountOne},
        {id: 2, "name": "KLC Participants, No Completion, Yes Registration", data: participantCountTwo},
        {id: 3, "name": "Data Dictionary Cleanup", data: cleanData}
    ];

    return(
        <section>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;