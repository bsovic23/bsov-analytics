import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// Function Imports
import { klcEmailListFx, list715fx } from '../functions/generalAnalysisFx';

// Data Imports
let klcEmailData;
let list715Data;

try {
    klcEmailData = require('../data/generalAnalysis').klcEmailData;
    list715Data = require('../data/generalAnalysis').list715Data;
} catch (error) {
    klcEmailData = 'No data found';
    list715Data = 'No data found';
};


export const GeneralAnalysis = () => {

    //
    const [cleanList, setCleanList] = useState((klcEmailData !== 'No data found') ? klcEmailListFx(klcEmailData) : 'No KLC Email List Data found');
    const [clean715list, setClean715list] = useState((list715Data !== 'No data found') ? list715fx(list715Data) : 'No 715 list data found');

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    const analysisButtons = [
        {id: 1, "name": "KLC Clean List", "data": cleanList},
        {id: 2, "name": "715 KLC Katey list", "data": clean715list},
    ];
    
    return(
        <section className='page' id='general-analysis'>
        <Page pageTitle={pageTitle} buttons={analysisButtons} />
     
      </section>
    )
};

export default GeneralAnalysis;