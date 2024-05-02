import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import imageOne from '../../images/imageOne.png';
import imageTwo from '../../images/imageTwo.png';

export const SidebarData = [
    {
        title: "Home", 
        icon: <HomeIcon />,
        link: "/",
        image: imageOne,
        description: 'Return Home'
    },
    {
        title: "Data Dictionary Analytics", 
        icon: <AnalyticsIcon />,
        link: "/DataDictionary",
        image: imageTwo,
        description: 'Program identifies Ids that need to be deleted, merged, or edited'
    },
    {
        title: "Registry Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Registry",
        image: imageOne,
        description: 'Analysis for Patient Registry'
    },
    {
        title: "General Analysis Analytics", 
        icon: <AnalyticsIcon />,
        link: "/GeneralAnalysis",
        image: imageTwo,
        description: 'general analysis'
    },
    {
        title: "Survey", 
        icon: <AnalyticsIcon />,
        link: "/Survey",
        image: imageOne,
        description: 'complete a survey for analysis requests'
    },
    {
        title: "Salesforce", 
        icon: <AnalyticsIcon />,
        link: "/Salesforce",
        image: imageOne,
        description: 'Salesforce data cleanup'
    },
    {
        title: "Affinia",
        icon: <AnalyticsIcon />,
        link: "/Affinia",
        image: imageTwo,
        description: "At home CKD test kit"
    },
    {
        title: "Information", 
        icon: <InfoIcon />,
        link: "/",
        image: imageTwo,
        description: 'information about the application'
    },
];