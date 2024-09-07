// BSOV Analytics Page for data imports

import React from 'react';

// Data Imports

import Cards from "../components/Cards";

const importCards = [
    {title: 'Google Analytics', text: 'Analytics on web pages', link: '/GoogleAnalyticsPage'},
    {title: 'Youtube Analytics', text: 'YouTube Analytics', link: '/YouTubeAnalyticsPage'},
    {title: 'Genially Analytics', text: 'Analytics on Genially pages', link: '/GeniallyAnalyticsPage'},
    {title: 'NKF Analytics Combo', text: 'overview and comparison among analytics'},
];

const BsovAnalytics = () => {
    return(
        <section class='page' id='bsov-analytics'>
            <Cards cards={importCards}/>
        </section>
    )
};

export default BsovAnalytics;