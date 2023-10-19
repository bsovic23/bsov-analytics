import React, { useState } from 'react';

// Component Imports
import Page from '../components/Page';

// Function Imports
import { ckdStageCorrectFx } from '../functions/CKDfx';

// Data Imports
// import { ckdMockData } from '../data/ckd';

export const CKD = () => {
    const [ckdCount, setCount] = useState(ckdStageCorrectFx(ckdMockData));

    const title = "CKD Analytics";

    const analysisButtons = [
        {id: 1, "name": "CKD Stages Wrong", data: ckdCount}
    ];

    return(
        <section class=''>
            <Page pageTitle={title} buttons={analysisButtons}/>
        </section>
    )
};

export default CKD;