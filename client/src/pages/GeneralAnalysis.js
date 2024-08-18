import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// Function Imports
import { klcEmailListFx, list715fx, salesforceKLCFx, analysisMegan } from '../functions/generalAnalysisFx';

// Data Imports
// let klcEmailData;
// let list715Data;

let enrollmentList718;
let registrationList718;

let meganNumbers;

try {
    // klcEmailData = require('../data/generalAnalysis').klcEmailData;
    // list715Data = require('../data/generalAnalysis').list715Data;

    // enrollmentList718 = require('../data/generalAnalysis').enrollmentList718;
    // registrationList718 = require('../data/generalAnalysis').registrationList718;

    meganNumbers = require('../data/generalAnalysis').meganNumbers;
} catch (error) {
    // klcEmailData = 'No data found';
    // list715Data = 'No data found';

    // enrollmentList718 = 'No data found';
    // registrationList718 = 'No data found';

    meganNumbers = 'No data found';
};


export const GeneralAnalysis = () => {
    // const checkDataAvailability = (data) => data !== 'No data found' && Array.isArray(data);
    
    // const [cleanList, setCleanList] = useState((klcEmailData !== 'No data found') ? klcEmailListFx(klcEmailData) : 'No KLC Email List Data found');
    // const [clean715list, setClean715list] = useState((list715Data !== 'No data found') ? list715fx(list715Data) : 'No 715 list data found');

    /* const [clean718list, setClean718list] = useState(
        checkDataAvailability(enrollmentList718) && checkDataAvailability(registrationList718) ? 
        salesforceKLCFx(registrationList718, enrollmentList718) : 
        'No 718 list data found'
    );
    */

    const [megan, setMegan] = useState((meganNumbers !== 'No data found') ? analysisMegan(meganNumbers) : 'No Megan Data found');

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    const analysisButtons = [
        // {id: 1, "name": "KLC Clean List", "data": cleanList},
        // {id: 2, "name": "715 KLC Katey list", "data": clean715list},
        // {id: 3, "name": "718 Jacob Katey List", "data": clean718list},
        {id: 3, "name": "Megan Numbers", "data": megan},
    ];
    
    return(
        <section className='page' id='general-analysis'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;