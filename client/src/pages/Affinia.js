import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// ==================================================================================
// Affinia Analysis
// ==================================================================================

// Function Imports

import { 
    // Pre Clean
    formatPreInterventionData,

    // Functions
    functionOne, // Outcomes Measures
    functionOneFollowUp, // Follow Up Analysis
    functionTwoPre, // Secondary Outcomes Pre
    functionTwoPost, // Secondary Outcomes Post
    functionThree, // Demographics Outcomes
    medicationCountAnalysis, // Medication Analysis Count
    countSurveyResponses, // Survey Monkey Counts
} from '../functions/affiniaFx';

// Data Imports

let allMrn;
let allMedicationData;
let preInterventionData;
let postInterventionData;
let postFollowUpInterventionData;
let surveyMonkeyData;

try {
    allMrn = require('../data/affinia').allMrn;
    allMedicationData = require('../data/affinia').allMedicationData;
    preInterventionData = require('../data/affinia').preInterventionData;
    postInterventionData = require('../data/affinia').postInterventionData;
    postFollowUpInterventionData = require('../data/affinia').postFollowUpInterventionData;
    surveyMonkeyData = require('../data/affinia').surveyMonkeyData;
} catch (error) {
    allMrn = 'No data found';
    allMedicationData = 'No data found';
    preInterventionData = 'No data found';
    postInterventionData = 'No data found';
    postFollowUpInterventionData = 'No data found';
    surveyMonkeyData = 'No data found';
}

const Affinia = () => {

    // ----- Page Variables
    
    const title = 'Affinia Analysis';

    // PRE INTERVENTION CLEANED DATA SET

    const [data1, setData1] = useState(
        (preInterventionData !== 'No data found') ? 
        (formatPreInterventionData(
            preInterventionData, // All Cohort Participant data
        )) : 'No Affinia Pre Intervention Data Found'
    );
    
    // ----- Analysis Numbers

    const [outcomeMeasures, setOutcomeMeasures] = useState((postInterventionData !== 'No Affinia Data Found') ? functionOne(postInterventionData) : 'No Outcomes Data Found');
    const [secondaryOutcomesPre, setSecondaryOutcomesPre] = useState((data1 !== 'No Affinia Data Found') ? (functionTwoPre(data1)) : 'No Affinia Data Found');
    const [secondaryOutcomesPost, setSecondaryOutcomesPost] = useState((postInterventionData !== 'No Affinia Data Found') ? (functionTwoPost(postInterventionData)) : 'No Affinia Data Found');
    const [demographicsPre, setDemographicsPre] = useState((data1 !== 'No Affinia Data Found') ? (functionThree(data1)) : 'No Affinia Data Found');
    const [medicationCount, setMedicationCount] = useState((allMedicationData !== 'No Affinia Data Found') ? (medicationCountAnalysis(allMedicationData)) : 'No Affinia Data Found');
    const [followUpCounts, setFollowUpCounts] = useState((postFollowUpInterventionData !== 'No Affinia Data Found') ? (functionOneFollowUp(postFollowUpInterventionData)) : 'No Affinia Data Found');
    const [surveyMonkeyCount, setSurveyMonkeyCount] = useState((surveyMonkeyData !== 'No Affinia Data Found') ? (countSurveyResponses(surveyMonkeyData)) : 'No Survey Monkey Data Found');

    // -----------------
    // ANALYSIS BUTTONS
    // -----------------

    const analysisButtons = [
        { id: 2, "name": "Section 1: Outcome Measures Post", "data": outcomeMeasures },
        { id: 3, "name": "Section 2: Secondary Outcomes Pre", "data": secondaryOutcomesPre },
        { id: 4, "name": "Section 2: Secondary Outcomes Post", "data": secondaryOutcomesPost },
        { id: 5, "name": "Section 3: Demographic Data Points Pre", "data": demographicsPre },
        { id: 6, "name": "Section 3: Follow Up Analsysi Count", "data": followUpCounts },
        { id: 7, "name": "Section 3: Medication Count", "data": medicationCount },
        { id: 8, "name": "Section 4: Survey Monkey Count", "data": surveyMonkeyCount },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default Affinia;