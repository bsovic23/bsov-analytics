import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { functionOne, 
    functionTwo, 
    functionThree,
    functionFour,
    functionFive,
    functionSix,
    functionSeven,
    functionEight,
    functionNine,
    functionTen,
} from '../functions/generalAnalysisFx';

// Data Imports
import { 
    // fy24UserReport, 
    // allUserReport, 
    fy24ModuleReport, 
    // allModuleReport 
} from '../data/generalAnalysis';

export const GeneralAnalysis = () => {

    //Page Variables
    const pageTitle = 'General Analysis Analytics';

    // Data
    /*
    const [fxOne, setFxOne] = useState(functionOne(allUserReport));
    const [fxTwo, setFxTwo] = useState(functionTwo(allModuleReport));
    const [fxThree, setFxThree] = useState(functionThree(allModuleReport));
    const [fxFour, setFxFour] = useState(functionFour(allModuleReport));
    const [fxFive, setFxFive] = useState(functionFive(fy24ModuleReport));
    const [fxSix, setFxSix] = useState(functionSix(fy24ModuleReport));
    const [fxSeven, setFxSeven] = useState(functionSeven(fy24UserReport));
    const [fxEight, setFxEight] = useState(functionEight(fy24ModuleReport));
    const [fxNine, setFxNine] = useState(functionNine(fy24UserReport));
    */
    const [fxTen, setTen] = useState(functionTen(fy24ModuleReport));

    const analysisButtons = [
        /*
        {id: 1, "name": "function One Result", "data": fxOne},
        {id: 2, "name": "function Two Results", "data": fxTwo},
        {id: 3, "name": "function Three Results", "data": fxThree},
        {id: 4, "name": "function Four Results", "data": fxFour},
        {id: 5, "name": "function Five Results", "data": fxFive},
        {id: 6, "name": "function Six Results", "data": fxSix},
        {id: 7, "name": "function Seven Results", "data": fxSeven},
        {id: 8, "name": "function Eight Results", "data": fxEight},
        {id: 9, "name": "function Nine Results", "data": fxNine},
        */
        {id: 10, "name": "function Ten Results", "data": fxTen},
    ];
    
    return(
        <section class='page' id='general-analysis'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default GeneralAnalysis;