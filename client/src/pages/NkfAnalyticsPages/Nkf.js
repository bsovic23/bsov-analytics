import React, { useState, useEffect } from 'react';

// =====================================================
// NKF Analytics
// =====================================================

// Component Imports

import AnalyticsFramework from '../../components/AnalyticsFramework';

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


export const NkfAnalytics = () => {

    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
            const result = [
                { 
                    type: 'bar',
                    optionTitle: 'Topic Completions Count',
                    optionInformation: 'Number of completions for each topic. A completion can be defined as a complete video view or completed module',
                    formattedData: nkfAnalyticsTopicFx(nkfAnalyticsData),
                },
                { 
                    type: 'line', 
                    optionTitle: 'FY Enrollments', 
                    optionInformation: 'Enrollments each FY among each database',
                    formattedData: nkfAnalyticsEnrollmentsFx(nkfAnalyticsData),
                },
                { 
                    type: 'line', 
                    optionTitle: 'FY Completions', 
                    optionInformation: 'Completions each FY among each database',
                    formattedData: nkfAnalyticsCompletionsFx(nkfAnalyticsData),
                },
                { 
                    type: 'line', 
                    optionTitle: 'Views By Month', 
                    optionInformation: 'Total views of Genially material by month',
                    formattedData: nkfAnalyticsFYFx(nkfAnalyticsData),
                },
            ];
    
            setAnalysisResult(result);
    }, []);

    return(
        <section>
          <AnalyticsFramework
                pageTitle={"NKF Analytics"}
                data={analysisResult}
           />
        </section>
    )
};

export default NkfAnalytics;