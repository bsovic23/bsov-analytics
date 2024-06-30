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
let allPtData, kitPtData, medicationData;
try {
    allPtData = require('../data/affinia').allPtData;
    kitPtData = require('../data/affinia').kitPtData;
    medicationData = require('../data/affinia').medicationData;
} catch (error) {
    allPtData = 'No data found';
    kitPtData = 'No data found';
    medicationData = 'No data found';
}

const Affinia = () => {

    // ----- Page Variables
    
    const title = 'Affinia Analysis';

    const [data1, setData1] = useState(
        (allPtData !== 'No data found' || kitPtData !== 'No data found' || medicationData !== 'No data found') ? 
        (mergeData(
        allPtData, // All Cohort Participant data
        kitPtData, // Kit Return Cohort Participant data
        medicationData, // Medication
        )) : 'No Affinia Data Found'
    );
    
    // Analysis Numbers
    const [outcomeMeasures, setOutcomeMeasures] = useState((data1 !== 'No Affinia Data Found') ? functionOne(data1) : 'No Affinia Data Found');
    const [secondaryOutcomesPre, setSecondaryOutcomesPre] = useState((data1 !== 'No Affinia Data Found') ? (functionTwo(data1)) : 'No Affinia Data Found');
    const [secondaryOutcomesPost, setSecondaryOutcomesPost] = useState('');
    const [demographicsPre, setDemographicsPre] = useState((data1 !== 'No Affinia Data Found') ? (functionThree(data1)) : 'No Affinia Data Found');
    const [andrewData, setAndrewData] = useState((medicationData !== 'No data found') ? (andrewMeds(medicationData)) : 'No Medication Data Found');

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