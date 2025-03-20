import React, { useState, useEffect } from 'react';

// =====================================================
// Case Hippo Analytics Page
// =====================================================

// Component Imports

import AnalyticsFramework from '../../components/AnalyticsFramework';

// Functions

import {
    caseHippoEnrollmentFx,
    caseHippoCompleteFx,
    caseHippoModuleCompleteFx,
    caseHippoModuleEnrollFx,
    caseHippoCompleteProfessionFx,
} from '../../functions/caseHippoAnalysisFx';

// Data Import

let caseHippoData;
let caseHippoMappingData;
try {
    caseHippoData = require('../../data/casehippoData').caseHippoData;
    caseHippoMappingData = require('../../data/casehippoMappingData').caseHippoMappingData;
} catch (error) {
    console.error('Case Hippo data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const CaseHippoAnalyticsPageNew = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const result = [
            { 
                type: 'bar',
                optionTitle: 'Enrollments Count',
                optionInformation: 'Enrollment Information count total',
                formattedData: caseHippoEnrollmentFx(caseHippoData),
            },
            { 
                type: 'bar',
                optionTitle: 'Completions Count',
                optionInformation: 'Total Counts of Completions', 
                formattedData: caseHippoCompleteFx(caseHippoData),
            },
            { 
                type: 'bar', 
                optionTitle: 'Modules Enrolled', 
                optionInformation: 'Case Hippo Modules Enrolled',
                formattedData: caseHippoModuleEnrollFx(caseHippoData),
            },
            { 
                type: 'bar',
                optionTitle: 'Modules Complete',
                optionInformation: 'Case Hippo Modules Completed',
                formattedData: caseHippoModuleCompleteFx(caseHippoData),
            },
            { 
                type: 'bar', 
                optionTitle: 'Professions Completed', 
                optionInformation: 'Modules completed by profession',
                formattedData: caseHippoCompleteProfessionFx(caseHippoData),
            },
        ];

        setAnalysisResult(result);

    }, []); 

    return (
        <section>
            <AnalyticsFramework
                pageTitle={"Case Hippo Analytics"}
                data={analysisResult}
            />
        </section>
    )
}

export default CaseHippoAnalyticsPageNew;