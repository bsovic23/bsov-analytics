import React, { useState } from 'react';

// =====================================================
// YouTube Analytics Page
// =====================================================

// Component Imports

import BsovAnalyticsComponent from '../../components/BsovAnalytics';
import BarChart from '../../components/BsovAnalyticsCharts';

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

const CaseHippoAnalyticsPage = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = (analysisFx) => {
        const result = analysisFx(caseHippoData);
        setAnalysisResult(result);
    }

    const caseHippoAnalyticsButtons = [
        { 
            id: 1, 
            title: "Enrollments Count", 
            data: caseHippoEnrollmentFx
        },
        { 
            id: 2, 
            title: "Completions Count", 
            data:  caseHippoCompleteFx,
        },
        {
            id: 3, 
            title: "Module Complete Count", 
            data:  caseHippoModuleCompleteFx,
        },
        {
            id: 4, 
            title: "Module Enroll Count", 
            data:  caseHippoModuleEnrollFx,
        },
        {
            id: 5, 
            title: "Module Completions By Profession", 
            data:  caseHippoCompleteProfessionFx,
        },
    ];

    return (
        <section id='caseHippo-page' className='analytics-page'>
            <BsovAnalyticsComponent
                pageTitle={"Case Hippo Analytics"}
                analysisInformation={"Information about the Case Hippo Analytics"}
                buttons={caseHippoAnalyticsButtons}
                onAnalyze={handleAnalyze}
            />
            <div>
                {analysisResult && (
                    <div>
                        <BarChart data={analysisResult} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default CaseHippoAnalyticsPage;