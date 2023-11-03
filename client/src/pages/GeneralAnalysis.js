import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { klcNoCourseRegistrationFx, klcRegistrationNoCompleteFx } from '../functions/generalAnalysisFx';

// Data Imports
// import { generalAnalysisData } from '../data/generalAnalysis';

export const GeneralAnalysis = () => {
    const [participantCountOne, setFxOne] = useState(klcNoCourseRegistrationFx(generalAnalysisData));
    const [participantCountTwo, setFxTwo] = useState(klcRegistrationNoCompleteFx(generalAnalysisData));

    const title="General Analysis";

    const analysisButtons = [
        {id: 1, "name": "KLC Participants, No Completion, No Registration", data: participantCountOne},
        {id: 2, "name": "KLC Participants, No Completion, Yes Registration", data: participantCountTwo}
    ];

    return(
        <section>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;