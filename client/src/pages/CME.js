import React, { useState } from 'react';

// Functions
import { topCoursesCompleteFx, topCoursesEnrollFx, enrollmentProfessionFx, treatPtFx,  }  from '../functions/cmeFx';

// Data
// import { mockData } from '../data/cme';

// Page/Component Imports
import Page from '../components/Page';

const Cme = () => {
    // ----- CME
    const [coursesEnroll, setTopEnroll] = useState(topCoursesCompleteFx(mockData));
    const [coursesComplete, setTopComplete] = useState(topCoursesEnrollFx(mockData));
    const [coursesProfession, setProfession] = useState(enrollmentProfessionFx(mockData));
    const [rateCount, setRateCount] = useState(treatPtFx(mockData));
    const [scoreCount, setScoreCount] = useState(scoreChange(mockData));

    const title = "CME PAGE";
    const navItems = [
        {id: 1, text: "CME NAV"}
    ];
    const analysisButtons = [
        {id: 1, "name": "Courses Enrolled", "data": coursesEnroll},
        {id: 2, "name": "Courses Completed", "data": coursesComplete},
        {id: 3, "name": "Courses Profession", "data": coursesProfession},
        {id: 4, "name": "Courses Completed", "data": rateCount},
        {id: 5, "name": "Score Count", "data": scoreCount},
    ];

    return(
        <section id='cme'>
            <div>
                < Page pageTitle={title} navChoices={navItems} buttons={analysisButtons} />
            </div>
        </section>
    )
};

export default Cme;