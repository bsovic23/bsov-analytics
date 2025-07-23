// BSOV Analytics Page for data imports

import React from 'react';

// Components Imports

import Cards from "../components/Cards";

const importCards = [
    {title: 'DataBot', text: 'DataBot can answer your analytic questions', link: '/DataBot'},
    {title: 'NKF Analytics Combo', text: 'All NKF Analytics', link: '/NkfAnalyticsPage'},

    //
    {title: 'CaseHippo Analytics', text: 'Professional Education Resource Center Data Analytics', link: '/CaseHippoAnalyticsPageNew'},
    {title: 'YouTube Analytics', text: 'NKF YouTube Channel Video Analytics', link: '/YouTube'},
    {title: 'Genially Analytics', text: 'KLS Infographic Analytics', link: '/Genially'},
    {title: 'Google Analytics', text: 'NKF Webtraffic Analytics', link: '/Google'},
];

const BsovAnalytics = () => {
    return(
        <section class='page' id='bsov-analytics'>
            <Cards cards={importCards}/>
        </section>
    )
};

export default BsovAnalytics;