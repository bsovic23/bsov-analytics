// BSOV Analytics Page for data imports

import React from 'react';

// Components Imports

import Cards from "../components/Cards";

const importCards = [
    {title: 'DataBot', text: 'DataBot can answer your analytic questions', link: '/DataBot'},
    {title: 'Google Analytics', text: 'Web Page Analytics', link: '/GoogleAnalyticsPage'},
    {title: 'Youtube Analytics', text: 'YouTube Video Analytics', link: '/YouTubeAnalyticsPage'},
    {title: 'Genially Analytics', text: 'Genially Platform Analytics', link: '/GeniallyAnalyticsPage'},
    {title: 'CaseHippo Analytics', text: 'CME/CE Analytics', link: '/CaseHippoAnalyticsPage'},
    {title: 'NKF Analytics Combo', text: 'overview and comparison among analytics', link: '/NkfAnalyticsPage'},
];

const BsovAnalytics = () => {
    return(
        <section class='page' id='bsov-analytics'>
            <Cards cards={importCards}/>
        </section>
    )
};

export default BsovAnalytics;