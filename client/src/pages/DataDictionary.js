import React, { useState } from 'react';

// Component/Page Imports
import DataDictionaryPage from '../components/DataDictionary';

// Data imports
// import { mockDataDictionaryData } from '../data/dataDictionary';

// Function Imports
import { dupCheckFx1, dupCheckFx2, dupCheckFx3, dupCheckFx4 } from '../functions/dataDictionaryFx';

const DataDictionary = () => {

    // ----- DD + Fx
    const [dictionaryDups, setDups] = useState(dupCheckFx1(mockDataDictionaryData));
    const [dictionaryDups2, setDups2] = useState(dupCheckFx2(mockDataDictionaryData));
    const [dictionaryDups3, setDups3] = useState(dupCheckFx3(mockDataDictionaryData));
    const [dictionaryDups4, setDups4] = useState(dupCheckFx4(mockDataDictionaryData));

    // Page Variables
    const pageTitle ="Data Dictionary Analytics";
    
    const analysisButtons = [
        {id: 1, "name": "Dup Check Same Group and Same Term", "data": dictionaryDups},
        {id: 2, "name": "Dup Check Same Group, Same Term, Same Defintion", "data": dictionaryDups2},
        {id: 3, "name": "Dup Check Same Group, Same Term, Same Defintion, Same Owner", "data": dictionaryDups3},
        {id: 4, "name": "Same Term, Same Defintion, DIFFERENT Owner", "data": dictionaryDups4},
    ];

    return(
        <section>
            <DataDictionaryPage pageTitle={pageTitle} buttons={analysisButtons} />
        </section>
    )
};

export default DataDictionary;