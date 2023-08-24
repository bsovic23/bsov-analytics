import React, { useState } from 'react';

// Imports - Components/Pages
import Table from '../components/Table';

// Data
// import { mockData } from '../data/cme';
import { mockRegData } from '../data/registry';
// import { mockKlcData } from '../data/klc';

// Functions
import { topCoursesCompleteFx, topCoursesEnrollFx, enrollmentProfessionFx, treatPtFx }  from '../functions/cmeFx';
import { potentialDupsFx, surveyCount, studyPopulation } from '../functions/registryFx';
import { klcModulesFx, klcModuleScores } from '../functions/klcFx';

const Home = () => {

    // ----- CME
    // const [coursesEnroll, setTopEnroll] = useState(topCoursesCompleteFx(mockData));
    // const [coursesComplete, setTopComplete] = useState(topCoursesEnrollFx(mockData));
    // const [coursesProfession, setProfession] = useState(enrollmentProfessionFx(mockData));
    // const [rateCount, setRateCount] = useState(treatPtFx(mockData));

    // ----- Registry
    // const [dups, setDups] = useState(potentialDupsFx(mockRegData));
    // const [dups, setDups] = useState(surveyCount(mockRegData));
    const [pt, setDups] = useState(studyPopulation(mockRegData));

    // ----- KLC Pre/post Analysis
    // const [klcCourses, setKlcCourses] = useState(klcModulesFx(mockKlcData));
    // const [klcScores, setScores] = useState(klcModuleScores(mockKlcData));
    
    return(
        <section class='page' id='home'>
            <h1>HOME</h1>
            <div>
                <pre>{JSON.stringify(pt, null, 2)}</pre>
            </div>
            <div>

            </div>
        </section>
    )
};

export default Home;