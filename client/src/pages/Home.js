import React, { useState } from 'react';

// Imports - Components/Pages
import Table from '../components/Table';

// Data and Functions
import { mockData } from '../data/cme';
import { topCoursesCompleteFx, topCoursesEnrollFx, enrollmentProfession }  from '../functions/cmeFx';

const Home = () => {
    const [coursesEnroll, setTopEnroll] = useState(topCoursesCompleteFx(mockData));
    const [coursesComplete, setTopComplete] = useState(topCoursesEnrollFx(mockData));
    const [coursesProfession, setProfession] = useState(enrollmentProfession(mockData));

    return(
        <section class='page' id='home'>
            <h1>HOME</h1>
            <div>
                <pre>{JSON.stringify(coursesEnroll, null, 2)}</pre>
            </div>
            <div>
                <pre>{JSON.stringify(coursesComplete, null, 2)}</pre>
            </div>
            <div>
                <pre>{JSON.stringify(coursesProfession, null, 2)}</pre>
            </div>
        </section>
    )
};

export default Home;