import React, { useState } from 'react';

// Component/Page imports
import Page from '../components/Page';

// Data imports
// import { mockDeleteData } from '../data/registryDelete';
// import { mockA_OrginalData } from '';
// import { mockFinalData } from '';

// Function Imports
import { deleteDataUniqueId } from '../functions/registryFx';

const Registry = () => {
    
    // ----- Registry Data + Fx
    const [deleteUniqueIds, setDeleteIds] = useState(deleteDataUniqueId(mockDeleteData));

    // ----- Page Variables
    const pageTitle ="Registry Analytics";

    const navChoices = [
        {id: 1, text: "Registry"}
    ];
    
    const analysisButtons = [
        {id: 1, "name": "Unique Ids in Delete Data File", "data": deleteUniqueIds}
    ];
    

    return(
        <section>
            <Page pageTitle={pageTitle} navChoices={navChoices} buttons={analysisButtons} />
        </section>
    )
};

export default Registry;