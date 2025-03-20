import React, { useState, useEffect } from 'react';

// =====================================================
// Genially Analytics Page
// =====================================================

// Component Imports

import AnalyticsFramework from '../../components/AnalyticsFramework';

// Functions

import {
    geniallyTopicFx,
    geniallyMonthViewsFx
} from '../../functions/geniallyFx';

// Data Import

let geniallyAnalyticsData;
try {
    geniallyAnalyticsData = require('../../data/geniallyData').geniallyAnalyticsData;
} catch (error) {
    console.error('Genially Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const Genially = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const result = [
            { 
                type: 'bar',
                optionTitle: 'Genially Topic Count',
                optionInformation: 'Breakdown of the number of completions per topic',
                formattedData: geniallyTopicFx(geniallyAnalyticsData),
            },
            { 
                type: 'line', 
                optionTitle: 'Views By Month', 
                optionInformation: 'Total views of Genially material by month',
                formattedData: geniallyMonthViewsFx(geniallyAnalyticsData),
            },
        ];

        setAnalysisResult(result);
    }, []);

    return (
        <section>
            <AnalyticsFramework
                pageTitle={"Genially Analytics"}
                data={analysisResult}
           />
        </section>
    );
};

export default Genially;