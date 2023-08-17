import React, { useState } from 'react';

// Imports - Components/Pages
import Table from '../components/Table';

// Data and Functions
// import { mockData } from '../data/cme';
import { mockRegData } from '../data/registry';
import { topCoursesCompleteFx, topCoursesEnrollFx, enrollmentProfessionFx, treatPtFx }  from '../functions/cmeFx';
import { potentialDupsFx } from '../functions/registryFx';

const Home = () => {
    // const [coursesEnroll, setTopEnroll] = useState(topCoursesCompleteFx(mockData));
    // const [coursesComplete, setTopComplete] = useState(topCoursesEnrollFx(mockData));
    // const [coursesProfession, setProfession] = useState(enrollmentProfessionFx(mockData));
    // const [rateCount, setRateCount] = useState(treatPtFx(mockData));
    const [dups, setDups] = useState(potentialDupsFx(mockRegData));

    return(
        <section class='page' id='home'>
            <h1>HOME</h1>
            <div>
                <pre>{JSON.stringify(dups, null, 2)}</pre>
            </div>
            <div>

            </div>
        </section>
    )
};

export default Home;