import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// Function Imports
import { klcEmailListFx } from '../functions/generalAnalysisFx';

// Data Imports
let klcEmailData;

try {
    klcEmailData = require('../data/generalAnalysis').klcEmailData;
} catch (error) {
    klcEmailData = 'No data found';
};


export const GeneralAnalysis = () => {

    //
    const [cleanList, setCleanList] = useState((klcEmailData !== 'No data found') ? klcEmailListFx(klcEmailData) : 'No KLC Email List Data found');

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    const analysisButtons = [
        {id: 1, "name": "KLC Clean List", "data": cleanList},
    ];
    
    return(
        <section className='page' id='general-analysis'>
        <Page pageTitle={pageTitle} buttons={analysisButtons} />
        {cleanList !== 'No KLC Email List Data found' && (
          <GeneralAnalysisTable data={cleanList} />
        )}
      </section>
    )
};

export default GeneralAnalysis;