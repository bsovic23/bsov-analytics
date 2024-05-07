import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { 
    mergeData,
    functionOne, 
} from '../functions/affiniaFx';

// Data Imports
import { 
    allPtData,
    kitPtData,
    medicationData,
} from '../data/affinia';

const Affinia = () => {

    // ----- Page Variables
    
    const title = 'Affinia Analysis';

    const [data1, setData1] = useState(mergeData(
        allPtData, // All Cohort Participant data
        kitPtData, // Kit Return Cohort Participant data
        medicationData, // Medication
    ));

    // Analysis Numbers
    const [outcomeMeasures, setOutcomeMeasures] = useState(functionOne(data1));
    const [secondaryOutcomes, setSecondaryOutcomes] = useState('');
    const [demographics, setDemographics] = useState('');


    const analysisButtons = [
        { id: 1, "name": "Full Clean DataSet", "data": data1 },
        { id: 2, "name": "Section 1: Outcome Measures", "data": outcomeMeasures },
        { id: 3, "name": "Section 2: Secondary Outcomes", "data": secondaryOutcomes },
        { id: 4, "name": "Section 3: Demographics", "data": demographics }
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Affinia;