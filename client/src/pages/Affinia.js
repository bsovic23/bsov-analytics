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
    mergePostData,

    andrewMeds,

    functionOne,
    functionTwoPre,
    functionTwoPost,
    functionThree, 

    getMostRecentRecords,
    postInterventionFxOne,

    postLabAnalysis,
    postFollowUpFx,

    // double check fx
    followUpAnalysis,
    functionLabs,
} from '../functions/affiniaFx';

// Data Imports

let
uniqueMrn, 
medicationData,
allPtData, 
kitPtData, 
postInterventionResults, 
postInterventionBP,
postInterventionEgfr,
postInterventionUacr,
postInterventionInsurance,
postInterventionAbnVisit,
postInterventionAbnEGFR,
postInterventionAbnUACR;

try {
    uniqueMrn = require('../data/affinia').uniqueMrn;
    medicationData = require('../data/affinia').medicationData;

    allPtData = require('../data/affinia').allPtData;
    kitPtData = require('../data/affinia').kitPtData;

    postInterventionResults = require('../data/affinia').postInterventionResults;
    postInterventionBP = require('../data/affinia').postInterventionBP;
    postInterventionEgfr = require('../data/affinia').postInterventionEgfr;
    postInterventionUacr = require('../data/affinia').postInterventionUacr;
    postInterventionInsurance = require('../data/affinia').postInterventionInsurance;

    postInterventionAbnVisit = require('../data/affinia').postInterventionAbnVisit;
    postInterventionAbnEGFR = require('../data/affinia').postInterventionAbnEGFR;
    postInterventionAbnUACR = require('../data/affinia').postInterventionAbnUACR;
} catch (error) {
    uniqueMrn = 'No data found';
    medicationData = 'No data found';

    allPtData = 'No data found';
    kitPtData = 'No data found';

    postInterventionResults= 'No data found'; 
    postInterventionBP = 'No data found';
    postInterventionEgfr = 'No data found';
    postInterventionUacr = 'No data found';
    postInterventionInsurance = 'No data found';

    postInterventionAbnVisit = 'No data found';
    postInterventionAbnEGFR = 'No data found';
    postInterventionAbnUACR = 'No data found';
}

const Affinia = () => {

    // ----- Page Variables
    
    const title = 'Affinia Analysis';

    // PRE INTERVENTION CLEANED DATA SET

    const [data1, setData1] = useState(
        (allPtData !== 'No data found' || kitPtData !== 'No data found') ? 
        (mergeData(
        allPtData, // All Cohort Participant data
        kitPtData, // Kit Return Cohort Participant data
        )) : 'No Affinia Data Found'
    );

    
    // POST INTERVENTION CLEANED DATA SET

    const [data2, setData2] = useState(
        (postInterventionResults !== 'No data found' || postInterventionBP !== 'No data found' || postInterventionEgfr !== 'No data found' || postInterventionUacr !== 'No data found' || postInterventionInsurance !== 'No data found') ? 
        (mergePostData(
            postInterventionResults,
            postInterventionBP,
            postInterventionEgfr,
            postInterventionUacr,
            postInterventionInsurance,
        )) : 'No Post Affinia Data Found'
    );
    
    // ----- Analysis Numbers

    const [outcomeMeasures, setOutcomeMeasures] = useState((data2 !== 'No Affinia Data Found') ? functionOne(data2) : 'No Post Affinia Data Found');
    const [secondaryOutcomesPre, setSecondaryOutcomesPre] = useState((data1 !== 'No Affinia Data Found') ? (functionTwoPre(data1)) : 'No Affinia Data Found');
    const [secondaryOutcomesPost, setSecondaryOutcomesPost] = useState((data2 !== 'No Affinia Data Found') ? (functionTwoPost(data2)) : 'No Affinia Data Found');
    const [demographicsPre, setDemographicsPre] = useState((data1 !== 'No Affinia Data Found') ? (functionThree(data1)) : 'No Affinia Data Found');
    const [andrewData, setAndrewData] = useState((medicationData !== 'No data found') ? (andrewMeds(medicationData)) : 'No Medication Data Found');

    // ----- Double Check Analysis
    const [labs, setLabs] = useState((postInterventionBP !== 'No Affinia Data Found') ? functionLabs(postInterventionBP) : 'No Post Affinia Data Found');
    const [followUpOutput, setFollowUpOutput] = useState((postInterventionAbnVisit !== 'No data found' || postInterventionAbnUACR !== 'No Data found' || postInterventionAbnEGFR !== 'No Data Found') ? (followUpAnalysis(postInterventionAbnVisit, postInterventionAbnUACR, postInterventionAbnEGFR)) : 'No follow up Data Found');
    // -----------------
    // ANALYSIS BUTTONS
    // -----------------

    const analysisButtons = [
        { id: 0, "name": "Full Clean DataSet - PRE", "data": data1 },
        { id: 1, "name": "Full Clean DataSet - POST", "data": data2 },
        { id: 2, "name": "Section 1: Outcome Measures Post", "data": outcomeMeasures },
        { id: 3, "name": "Section 2: Secondary Outcomes Pre", "data": secondaryOutcomesPre },
        { id: 4, "name": "Section 2: Secondary Outcomes Post", "data": secondaryOutcomesPost },
        { id: 5, "name": "Section 3: Demographic Data Points Pre", "data": demographicsPre },
        
        { id: 50, "name": "Double Check: Post Labs", "data": labs },
        { id: 51, "name": "Double Check: Follow Up Data", "data": followUpOutput },
        
        { id: 99, "name": "Andrew Meds Review", "data": andrewData },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Affinia;