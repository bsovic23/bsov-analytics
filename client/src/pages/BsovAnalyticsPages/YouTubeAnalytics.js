import React, { useState } from 'react';

// =====================================================
// YouTube Analytics Page
// =====================================================

// Component Imports

import BsovAnalyticsComponent from '../../components/BsovAnalytics';
import BarChart from '../../components/BsovAnalyticsCharts';

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

const YouTubeAnalyticsPage = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = (analysisFx) => {
        const result = analysisFx(youtubeAnalyticsData);
        setAnalysisResult(result);
    }

    const youtubeAnalyticsButtons = [
        { 
            id: 1, 
            title: "YouTube Video Topic Count", 
            data: youtubeTopicCountFx  // Map the function to the 'data' key
        },
        { 
            id: 2, 
            title: "Top 10 YouTube Videos by Views", 
            data: () => youtubeTop10Fx(youtubeAnalyticsData, "Views")  // Another example function
        },
        { 
            id: 2, 
            title: "Views By Fiscal Year", 
            data: () => youtubeViewsByFiscalYearFx(youtubeAnalyticsData, "Views")  // Another example function
        }
    ];

    return (
        <section id='youtube-page' className='analytics-page'>
            <BsovAnalyticsComponent
                pageTitle={"YouTube Analytics"}
                analysisInformation={"Information about the YouTube Analytics"}
                buttons={youtubeAnalyticsButtons}
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

export default YouTubeAnalyticsPage;