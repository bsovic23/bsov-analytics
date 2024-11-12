import React, { useState } from 'react';

// =====================================================
// Genially Analytics Page
// =====================================================

// Component Imports

import BsovAnalyticsComponent from '../../components/BsovAnalytics';
import BarChart from '../../components/BsovAnalyticsCharts';

// Functions

import {
    geniallyTopicFx,
    geniallyMonthViewsFx
} from '../../functions/geniallyFx';

// Data Import

let geniallyAnalyticsData;
try {
    geniallyAnalyticsData = require('../../data/bsovAnalytics/geniallyData').geniallyAnalyticsData;
} catch (error) {
    console.error('Genially Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const GeniallyAnalyticsPage = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = (analysisFx) => {
        const result = analysisFx(geniallyAnalyticsData);
        setAnalysisResult(result);
    }

    const googleAnalyticsButtons = [
        {
            id: 1,
            title: 'Topic Count',
            data: geniallyTopicFx,
        },
        {
            id: 2,
            title: 'Month View Count',
            data: geniallyMonthViewsFx,
        }
    ];

    return (
        <section id='genially-page' className='analytics-page'>
            <BsovAnalyticsComponent
                pageTitle={"Genially Analytics"}
                analysisInformation={"Information about the Genially Analytics"}
                buttons={googleAnalyticsButtons}
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
    );
};

export default GeniallyAnalyticsPage;