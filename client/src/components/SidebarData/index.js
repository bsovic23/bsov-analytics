import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export const SidebarData = [
    {
        title: "Home", 
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Data Dictionary Analytics", 
        icon: <AnalyticsIcon />,
        link: "/DataDictionary"
    },
    {
        title: "Registry Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Registry"
    },
    {
        title: "KLC Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Klc"
    },
    {
        title: "CKD Analytics", 
        icon: <AnalyticsIcon />,
        link: "/Ckd"
    },
    {
        title: "General Analysis Analytics", 
        icon: <AnalyticsIcon />,
        link: "/GeneralAnalysis"
    },
    {
        title: "Information", 
        icon: <InfoIcon />,
        link: "/"
    },
];