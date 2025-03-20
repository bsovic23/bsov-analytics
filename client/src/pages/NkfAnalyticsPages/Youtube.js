import React, { useState, useEffect } from 'react';

// =====================================================
// YouTube Analytics Page
// =====================================================

// Component Imports

import AnalyticsFramework from '../../components/AnalyticsFramework';

// Functions

import {
    youtubeTopicCountFx,
    youtubeTop10Fx,
    youtubeViewsByFiscalYearFx
} from '../../functions/youtubeAnalyticsFx';

// Data Import

let youtubeAnalyticsData;
try {
    youtubeAnalyticsData = require('../../data/youtubeData').youtubeAnalyticsData;
} catch (error) {
    console.error('Youtube Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const YouTube = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const result = [
            { 
                type: 'bar',
                optionTitle: 'YouTube Video Topic Count',
                optionInformation: 'The number of videos related to topics',
                formattedData: youtubeTopicCountFx(youtubeAnalyticsData),
            },
            { 
                type: 'bar',
                optionTitle: 'Top 10 YouTube Videos by Views',
                optionInformation: 'Top viewed videos all time in the NKF YouTube channel', 
                formattedData: youtubeTop10Fx(youtubeAnalyticsData),
            },
            { 
                type: 'line', 
                optionTitle: 'Views By Fiscal Year', 
                optionInformation: 'Total YouTube NKF Views each Fiscal Year',
                formattedData: youtubeViewsByFiscalYearFx(youtubeAnalyticsData),
            },
        ];

        setAnalysisResult(result);
    }, []); 

    return (
        <section>
           <AnalyticsFramework
                pageTitle={"YouTube Analytics"}
                data={analysisResult}
           />
        </section>
    )
}

export default YouTube;