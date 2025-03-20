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

    //
    {title: 'NKF V5.0 layout', text: 'New Layout', link: '/NewPage'},
    {title: 'NKF V5.0 layout - casehippo new', text: 'New Layout', link: '/CaseHippoAnalyticsPageNew'},
];

const BsovAnalytics = () => {
    return(
        <section class='page' id='bsov-analytics'>
            <Cards cards={importCards}/>
        </section>
    )
};

export default BsovAnalytics;