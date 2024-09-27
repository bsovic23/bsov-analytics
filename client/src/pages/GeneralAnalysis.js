import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';
import GeneralAnalysisTable from '../components/GeneralAnalysisTable';

// Function Imports
import { medicationCleanUpFx, dupLabClean } from '../functions/generalAnalysisFx';

// Data Imports
// let klcEmailData;
// let list715Data;

let medicationData;

let egfrDups;
let uacrDups;
let egfrFollowUpDups;
let uacrFollowUpDups;

// let meganNumbers;

try {
    // klcEmailData = require('../data/generalAnalysis').klcEmailData;
    // list715Data = require('../data/generalAnalysis').list715Data;

    // enrollmentList718 = require('../data/generalAnalysis').enrollmentList718;
    // registrationList718 = require('../data/generalAnalysis').registrationList718;

    // meganNumbers = require('../data/generalAnalysis').meganNumbers;
    // medicationData = require('../data/generalAnalysis').medicationData;

    egfrDups = require('../data/generalAnalysis').egfrDups;
    uacrDups = require('../data/generalAnalysis').uacrDups;
    egfrFollowUpDups = require('../data/generalAnalysis').egfrFollowUpDups;
    uacrFollowUpDups = require('../data/generalAnalysis').uacrFollowUpDups;
} catch (error) {
    // klcEmailData = 'No data found';
    // list715Data = 'No data found';

    // enrollmentList718 = 'No data found';
    // registrationList718 = 'No data found';

   // medicationData = 'No data found';

    egfrDups = 'No data found';
    uacrDups = 'No data found';
    egfrFollowUpDups = 'No data found';
    uacrFollowUpDups = 'No data found';
};


export const GeneralAnalysis = () => {
    // const checkDataAvailability = (data) => data !== 'No data found' && Array.isArray(data);
    
    // const [cleanList, setCleanList] = useState((klcEmailData !== 'No data found') ? klcEmailListFx(klcEmailData) : 'No KLC Email List Data found');
    // const [clean715list, setClean715list] = useState((list715Data !== 'No data found') ? list715fx(list715Data) : 'No 715 list data found');

    /*
    const [clean718list, setClean718list] = useState(
        checkDataAvailability(enrollmentList718) && checkDataAvailability(registrationList718) ? 
        salesforceKLCFx(registrationList718, enrollmentList718) : 
        'No 718 list data found'
    );
    

    // const [megan, setMegan] = useState((meganNumbers !== 'No data found') ? analysisMegan(meganNumbers) : 'No Megan Data found');
    */

    // const [cleanMeds, setCleanMeds] = useState((medicationData !== 'No data found') ? medicationCleanUpFx(medicationData) : 'No Medication Data found');

    // const [var1, setVar1] = useState((egfrDups !== 'No data found') ? dupLabClean(egfrDups) : 'No Medication Data found');
    // const [var2, setVar2] = useState((uacrDups !== 'No data found') ? dupLabClean(uacrDups) : 'No Medication Data found');
    // const [var3, setVar3] = useState((egfrFollowUpDups !== 'No data found') ? dupLabClean(egfrFollowUpDups) : 'No Medication Data found');
    const [var4, setVar4] = useState((uacrFollowUpDups !== 'No data found') ? dupLabClean(uacrFollowUpDups) : 'No Medication Data found');

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    const analysisButtons = [
        // {id: 1, "name": "KLC Clean List", "data": cleanList},
        // {id: 2, "name": "715 KLC Katey list", "data": clean715list},
        // {id: 3, "name": "718 Jacob Katey List", "data": clean718list},
        // {id: 4, "name": "Megan Numbers", "data": megan},
        // {id: 5, "name": "Clean Meds Data", "data": cleanMeds},

        // {id: 6, "name": "EGFR Data", "data": var1},
        // {id: 7, "name": "UACR Data", "data": var2},
        // {id: 8, "name": "egfr follow up", "data": var3},
        // {id: 9, "name": "uacrfollowup", "data": var4},
    ];
    
    // <GeneralAnalysisTable data={clean718list} />

    return(
        <section className='page' id='general-analysis'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;