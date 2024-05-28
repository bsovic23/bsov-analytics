import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { 
    mergeData,

    andrewMeds,

    functionOne,
    functionTwo,
    functionThree, 
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
    const [secondaryOutcomesPre, setSecondaryOutcomesPre] = useState(functionTwo(data1));
    const [secondaryOutcomesPost, setSecondaryOutcomesPost] = useState('');
    const [demographicsPre, setDemographicsPre] = useState(functionThree(data1));
    const [andrewData, setAndrewData] = useState(andrewMeds(medicationData));

    const analysisButtons = [
        { id: 1, "name": "Full Clean DataSet", "data": data1 },
        { id: 2, "name": "Section 1: Outcome Measures Post", "data": outcomeMeasures },
        { id: 3, "name": "Section 2: Secondary Outcomes Pre", "data": secondaryOutcomesPre },
        { id: 4, "name": "Section 2: Secondary Outcomes Post", "data": secondaryOutcomesPost },
        { id: 5, "name": "Section 3: Demographic Data Points Pre", "data": demographicsPre },
        { id: 6, "name": "Andrew Meds", "data": andrewData }
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Affinia;