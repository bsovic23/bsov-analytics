import React, { useState } from 'react';

// Imports - Components/Pages
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import Cme from './CME';

// Data
// import { mockRegData } from '../data/registry';
// import { mockKlcData } from '../data/klc';
// import { mockSCMdata } from '../data/scm';

// Functions

import { potentialDupsFx, surveyCount, studyPopulation, registryIdN, registryIdNTwo, registrySiteId } from '../functions/registryFx';
import { klcModulesFx, klcModuleScores } from '../functions/klcFx';
import { scmCleanup, scmStats, scmRoleWordCount, scoreChange } from '../functions/scmFx';

const Home = () => {

    // ----- Registry
    // const [dups, setDups] = useState(potentialDupsFx(mockRegData));
    // const [dups, setDups] = useState(surveyCount(mockRegData));
    // const [pt, setDups] = useState(studyPopulation(mockRegData));
    // const [unique, setDups] = useState(registrySiteId(mockRegData));

    // ----- KLC Pre/post Analysis
    // const [klcCourses, setKlcCourses] = useState(klcModulesFx(mockKlcData));
    // const [klcScores, setScores] = useState(klcModuleScores(mockKlcData));

    // ----- SCM 
    // const [scmFinal, setScores] = useState(scmRoleWordCount(mockSCMdata));

    const navChoices = [
        {id: 1, text: 'CME'},
        {id: 2, text: 'Registry'},
        {id: 3, text: 'KLC'},
        {id: 4, text: 'SCM'},
    ];

    return(
        <section class='page' id='home'>
            <header>
                <h1>HOME</h1>
                < Navbar navElements={navChoices} />
            </header>
            <div>
                < Cme />
            </div>
            <div>
                Please click the nav options above to run the
                analysis needed
            </div>
            <footer>
                FOOTER HERE
            </footer>
        </section>
    )
};

export default Home;