import React, { useState } from 'react';

// =====================================================
// NKF Analytics
// =====================================================

// Component Imports

import BsovAnalyticsComponent from '../../components/BsovAnalytics';
import NkfAnalyticsBarChart from '../../components/BsovNkfBarChart';

// Functions

import {
    nkfAnalyticsTopicFx,
    nkfAnalyticsEnrollmentsFx,
    nkfAnalyticsCompletionsFx,
    nkfAnalyticsFYFx,
} from '../../functions/nkfAnalyticsFx';

// Data Import

let nkfAnalyticsData;
try {
    nkfAnalyticsData = require('../../data/nkfAnalytics').nkfAnalyticsData;
} catch (error) {
    console.error('NKF Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------


export const NkfAnalyticsPage = () => {

    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = (analysisFx) => {
        const result = analysisFx(nkfAnalyticsData);
        setAnalysisResult(result);
    }

    const nkfAnalyticsButtons = [
        {
            id: 1,
            title: 'Topic Completions Count',
            data: nkfAnalyticsTopicFx,
        },
        {
            id: 2,
            title: 'FY Enrollment Count',
            data: nkfAnalyticsEnrollmentsFx,
        },
        {
            id: 3,
            title: 'FY Completions Count',
            data: nkfAnalyticsCompletionsFx,
        },
        {
            id: 4,
            title: 'FY Source Count',
            data: nkfAnalyticsFYFx,
        },
    ];

    return(
        <section id='nkf-analytics-page' className='analytics-page'>
            <BsovAnalyticsComponent
                pageTitle={"NKF Analytics"}
                analysisInformation={"NKF Analytics - KLS"}
                buttons={nkfAnalyticsButtons}
                onAnalyze={handleAnalyze}
            />
        <div>
           <NkfAnalyticsBarChart data={analysisResult} />
        </div>
    </section>
    )
};

export default NkfAnalyticsPage;