import React, { useState } from 'react';

// Component/Page imports
import Page from '../components/Page';

// Data imports

// Function Imports

const Registry = () => {
    
    // ----- Page Variables
    const pageTitle ="Registry Analytics";
    
    const analysisButtons = [
        // FORMAT: {id: 0, "name": "<name>", "data": <data>},
    ];
    
    return(
        <section class='page' id='registry'>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default Registry;