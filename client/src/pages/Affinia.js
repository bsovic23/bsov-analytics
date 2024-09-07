import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// ==================================================================================
// Affinia Analysis
// ==================================================================================

// Function Imports

import { 
    mergeData,

    andrewMeds,

    functionOne,
    functionTwo,
    functionThree, 

    getMostRecentRecords,
    postInterventionFxOne,

    postLabAnalysis,
    postFollowUpFx,
} from '../functions/affiniaFx';

// Data Imports

let allPtData, kitPtData, medicationData, postAptPtData, postUACR, postEGFR, postAllPtData, postBothLabs ;
try {
    allPtData = require('../data/affinia').allPtData;
    kitPtData = require('../data/affinia').kitPtData;
    medicationData = require('../data/affinia').medicationData;

    postUACR = require('../data/affinia').postUACR;
    postEGFR = require('../data/affinia').postEGFR;

    postAllPtData = require('../data/affinia').postAllPtData;

    postBothLabs = require('../data/affinia').postBothLabs;
    postAptPtData = require('../data/affinia').postAptPtData;
} catch (error) {
    allPtData = 'No data found';
    kitPtData = 'No data found';
    medicationData = 'No data found';

    postUACR = 'No data found';
    postEGFR = 'No data found';

    postBothLabs = 'No data found';

    postAptPtData = 'No data found';
}

const Affinia = () => {

    // ----- Page Variables
    
    const title = 'Affinia Analysis';

    /*
    const [data1, setData1] = useState(
        (allPtData !== 'No data found' || kitPtData !== 'No data found' || medicationData !== 'No data found') ? 
        (mergeData(
        allPtData, // All Cohort Participant data
        kitPtData, // Kit Return Cohort Participant data
        medicationData, // Medication
        )) : 'No Affinia Data Found'
    );
    
    // Analysis Numbers
    // Pre Intervention
    const [outcomeMeasures, setOutcomeMeasures] = useState((data1 !== 'No Affinia Data Found') ? functionOne(data1) : 'No Affinia Data Found');
    const [secondaryOutcomesPre, setSecondaryOutcomesPre] = useState((data1 !== 'No Affinia Data Found') ? (functionTwo(data1)) : 'No Affinia Data Found');
    const [secondaryOutcomesPost, setSecondaryOutcomesPost] = useState('');
    const [demographicsPre, setDemographicsPre] = useState((data1 !== 'No Affinia Data Found') ? (functionThree(data1)) : 'No Affinia Data Found');
    const [andrewData, setAndrewData] = useState((medicationData !== 'No data found') ? (andrewMeds(medicationData)) : 'No Medication Data Found');

    */

    // Post Intervention
    // const [egfruacr, setEgfruacr] = useState((postEGFR !== 'No Affinia Data Found') ? getMostRecentRecords(postUACR, postEGFR) : 'No Affinia uarcr egfr Data Found');
    // const [postOne, setPostOne] = useState(postInterventionFxOne(postAllPtData))
    const [postTwo, setPostTwo] = useState(postLabAnalysis(postBothLabs));
    const [postThree, setPostThree] = useState(postFollowUpFx(postAptPtData));

    const analysisButtons = [
        /*
        { id: 1, "name": "Full Clean DataSet", "data": data1 },
        { id: 2, "name": "Section 1: Outcome Measures Post", "data": outcomeMeasures },
        { id: 3, "name": "Section 2: Secondary Outcomes Pre", "data": secondaryOutcomesPre },
        { id: 4, "name": "Section 2: Secondary Outcomes Post", "data": secondaryOutcomesPost },
        { id: 5, "name": "Section 3: Demographic Data Points Pre", "data": demographicsPre },
        { id: 6, "name": "Andrew Meds", "data": andrewData },
         */
        // { id: 7, "name": "EGFR UACR data", "data": egfruacr },
        // { id: 8, "name": "Post Intervention Data", "data": postOne },
        { id: 9, "name": "Lab Analysis", "data": postTwo },
        { id: 10, "name": "Follow Up Analysis", "data": postThree }
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Affinia;