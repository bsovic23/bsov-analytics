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
    caseHippoCompleteFyFx,
    caseHippoEnrollFyFx,
    caseHippoMemberCount,
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
                optionTitle: 'Module Enrollments Count',
                optionInformation: 'The total amount of module enrollments',
                formattedData: caseHippoEnrollmentFx(caseHippoData),
            },
            { 
                type: 'bar',
                optionTitle: 'Module Completions Count',
                optionInformation: 'The total amount of module completions', 
                formattedData: caseHippoCompleteFx(caseHippoData),
            },
            { 
                type: 'bar', 
                optionTitle: 'Modules Enrolled', 
                optionInformation: 'Amount of enrollments broken down by specific modules',
                formattedData: caseHippoModuleEnrollFx(caseHippoData),
            },
            { 
                type: 'bar',
                optionTitle: 'Modules Complete',
                optionInformation: 'Amount of completions broken down by specific modules',
                formattedData: caseHippoModuleCompleteFx(caseHippoData),
            },
            { 
                type: 'bar', 
                optionTitle: 'Professions Completed', 
                optionInformation: 'What is the self reported profession for completed modules',
                formattedData: caseHippoCompleteProfessionFx(caseHippoData),
            },
            { 
                type: 'line', 
                optionTitle: 'Modules Complete each FY', 
                optionInformation: 'How many modules were completed during specific FY',
                formattedData: caseHippoCompleteFyFx(caseHippoData),
            },
            { 
                type: 'line', 
                optionTitle: 'Modules Enrolled each FY', 
                optionInformation: 'How many modules were enrolled during specific FY',
                formattedData: caseHippoEnrollFyFx(caseHippoData),
            },
            { 
                type: 'bar', 
                optionTitle: 'Member Count', 
                optionInformation: 'How many members enrolled in modules',
                formattedData: caseHippoMemberCount(caseHippoData),
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