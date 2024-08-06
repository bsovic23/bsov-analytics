import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { dupsClean, cleanDataFx, analysisOne, percAnalysisFx, analyzeVariables, analyzeEvalData } from '../functions/projectEcho';

// Data Imports
let surveyScores;
let participantInformation;
let percInformation;
let percEvaluation;
let percEvaluationVar;

try {
    surveyScores = require('../data/projectEcho').surveyScores;
    participantInformation = require('../data/projectEcho').participantInformation;
    percInformation = require('../data/projectEcho').percInformation;
    percEvaluation = require('../data/projectEcho').percEvaluation;
    percEvaluationVar = require('../data/projectEcho').percEvaluationVar;
} catch (error) {
    surveyScores = 'No data found';
    participantInformation = 'No data found';
    percInformation = 'No data found';
    percEvaluation = 'No data found';
    percEvaluationVar = 'No data found';
}

const ProjectEcho = () => {

    // ----- Page Variables
    
    const title = 'MO Pilot Project';

    // Healthcare Professional
    // const [data, setData] = useState((participantInformation !== 'No data found') ? (dupsClean(participantInformation)) : 'No Participation data found')
    // const [data2, setData2] = useState((participantInformation !== 'No data found') ? (cleanDataFx(surveyScores, participantInformation)) : 'No Participation data found')
    // const [data3, setData3] = useState((participantInformation !== 'No data found') ? (analysisOne(data2)) : 'No data found found')
    const [data4, setData4] = useState((percInformation !== 'No data found') ? (percAnalysisFx(percInformation)) : 'No data found found')
    const [data5, setData5] = useState((percEvaluation !== 'No data found') ? (analyzeVariables(percEvaluation, percEvaluationVar)) : 'No data found found')
    const [data6, setData6] = useState((percEvaluation !== 'No data found') ? (analyzeEvalData(percEvaluation)) : 'No data found found')

    const analysisButtons = [
        // { id: 1, "name": "Delete Rows", "data": data },
        // { id: 2, "name": "Celan Data", "data": data2 },
        // { id: 3, "name": "Analsysi 1", "data": data3 },
        { id: 4, "name": "PERC", "data": data4 },
        { id: 5, "name": "PERC EVAL DATA EASY", "data": data5 },
        { id: 6, "name": "PERC EVAL DATA", "data": data6 },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default ProjectEcho;