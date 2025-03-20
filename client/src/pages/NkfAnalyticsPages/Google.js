import React, { useState, useEffect } from 'react';

// =====================================================
// Google Analytics Page
// =====================================================

// Component Imports

import AnalyticsFramework from '../../components/AnalyticsFramework';

// Functions

import {
    geniallyTopicFx,
    geniallyMonthViewsFx
} from '../../functions/geniallyFx';

// Data Import

let googleAnalyticsData;
let googleAnalyticsMappingData;
try {
    googleAnalyticsMappingData = require('../../data/bsovAnalytics/googleAnalyticsMappingData').googleAnalyticsMappingData;
} catch (error) {
    console.error('Google Analytics Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const Google = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const result = [
            { 
                type: 'bar',
                optionTitle: 'Google Topic Count',
                optionInformation: 'Breakdown of the number of completions per topic',
                formattedData: null,
            },
        ];

        setAnalysisResult(result);
    }, []);

    return (
        <section>
            <AnalyticsFramework
                pageTitle={"Google Analytics"}
                data={analysisResult}
           />
        </section>
    );
};

export default Google;