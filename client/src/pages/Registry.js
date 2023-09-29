import React, { useState } from 'react';

// Component/Page imports
import Page from '../components/Page';

// Data imports
// import { registryMockRawData } from '../data/registryRawData';
// import { mockDeleteData } from '../data/registryDelete';
// import { mockA_OrginalData } from '';
// import { mockFinalData } from '';

// Function Imports
// import { allDataId } from '../functions/registryFx';
// import { deleteDataUniqueId, deleteDataEmptyInfo, deleteDataDobOnly } from '../functions/registryFx';

const Registry = () => {
    
    // ----- Registry Data + Fx
    // const [allRawData, setUnformattedData] = useState(allDataId(registryMockRawData));

    const [deleteUniqueIds, setDeleteIds] = useState(deleteDataUniqueId(mockDeleteData));
    const [emptyUniqueIds, setEmptyAllIds] = useState(deleteDataEmptyInfo(mockDeleteData));
    const [emptyDobOnly, setEmptyDobOnlyIds] = useState(deleteDataDobOnly(mockDeleteData));

    // ----- Page Variables
    const pageTitle ="Registry Analytics";
    
    const analysisButtons = [
        // {id: 0, "name": "All Raw Data: Unique Ids + Site Count", "data": allRawData},
        {id: 1, "name": "Delete Data: Unique Ids", "data": deleteUniqueIds},
        {id: 2, "name": "Delete Data: Empty IDs with only a pt id", "data": emptyUniqueIds},
        {id: 3, "name": "Delete Data: Empty IDs with ONLY DOB", "data": emptyDobOnly}
    ];
    
    return(
        <section>
            <Page pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default Registry;