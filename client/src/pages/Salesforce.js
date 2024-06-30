import React, { useState } from 'react';

// Imports - Components/Pages
import Page from '../components/Page';

// Function Imports
import { dupsFunction } from '../functions/salesForceFx';

// Data Imports
let wildApricot;
let salesForce;

try {
    wildApricot.require('../data/salesforce').wildApricot;
    salesForce.require('../data/salesforce').salesForce;
} catch (error) {
    wildApricot = 'No data found';
    salesForce = 'No data found';
};

const Salesforce = () => {

    // ----- Page Variables
    const pageTitle = 'Salesforce Cleanup';

    /*
        fx1: Missing Case Hippo Course Tags
        fx2: Delete Test Records
        fx3: Mailing State/Prov = one of 50 states and country is blank (should be US)
        fx4: FN-LN-ZIP with two different emails -> dups
        fx5: FN-LN-ZIP with two different 18 digit identifiers -> merge request 
    */

    const [test1, setTest1] = useState((wildApricot !== 'No data found' && salesForce !== 'No data found') ? dupsFunction(wildApricot, salesForce) : 'No data');

    const analysisButtons = [
        { id: 1, "name": "Wild Apricot + Salesforce Analysis", "data": test1 }
    ];

    return(
        <section class='page' id='salesforce'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default Salesforce;