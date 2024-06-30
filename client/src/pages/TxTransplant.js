import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { 
    healthcareProfessionalSurveyCleanFx,
    healthcareProfessionalSurveyAnalysis,

    patientSurveyCleanFx,
    patientSurveyAnalysis,

} from '../functions/txTransplantFx';


// Data Imports
let healthcareProfessionalSurveyData;
let patientSurveyData;

try {
    healthcareProfessionalSurveyData = require('../data/txTransplant').healthcareProfessionalSurveyData;
    patientSurveyData = require('../data/txTransplant').patientSurveyData;
} catch (error) {
    healthcareProfessionalSurveyData = 'No data found';
    patientSurveyData = 'No data found';
}

const TxTransplant = () => {

    // ----- Page Variables
    
    const title = 'TX Transplant Analysis';

    // 

    // Healthcare Professional
    const [data, setData] = useState((healthcareProfessionalSurveyData !== 'No data found') ? (healthcareProfessionalSurveyCleanFx(healthcareProfessionalSurveyData)) : 'No TX Transplant data found');
    const [healthcareProfessionalAnalysis, setHealthcareProfessionalAnalysis] = useState((healthcareProfessionalSurveyData !== 'No data found') ? (healthcareProfessionalSurveyAnalysis(data)) : 'No TX Transplant data found');

    // Healthcare Professional
    const [data2, setData2] = useState((patientSurveyData !== 'No data found') ? (patientSurveyCleanFx(patientSurveyData)) : 'No TX Transplant data found');
    const [patientAnalysis, setPatientAnalysis] = useState((healthcareProfessionalSurveyAnalysis !== 'No data found') ? (patientSurveyAnalysis(data2)) : 'No TX Transplant data found');

    const analysisButtons = [
        { id: 1, "name": "Healthcare Professional Education Survey Data Clean", "data": data },
        { id: 2, "name": "Healthcare Professional Education Survey Analysis", "data": healthcareProfessionalAnalysis },
        { id: 3, "name": "Patient Survey Analysis", "data": patientAnalysis },
    ];

    return(
        <section class='page' id='registry'>
            <Page pageTitle={title} buttons={analysisButtons} />
        </section>
    )
};

export default TxTransplant;