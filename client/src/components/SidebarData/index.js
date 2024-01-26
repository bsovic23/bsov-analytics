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
        image: imageOne
    },
    {
        title: "Data Dictionary Analytics", 
        icon: <AnalyticsIcon />,
        link: "/DataDictionary",
        image: imageTwo
    },
    {
        title: "Registry Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Registry",
        image: imageOne
    },
    {
        title: "KLC Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Klc",
        image: imageTwo
    },
    {
        title: "CKD Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Ckd",
        image: imageOne
    },
    {
        title: "General Analysis Analytics", 
        icon: <AnalyticsIcon />,
        link: "/GeneralAnalysis",
        image: imageTwo
    },
    {
        title: "Survey", 
        icon: <AnalyticsIcon />,
        link: "/Survey",
        image: imageOne
    },
    {
        title: "Information", 
        icon: <InfoIcon />,
        link: "/",
        image: imageTwo
    },
];