// BSOV Analytics Phrases

import React from 'react';

// Function Imports

const BsovAnalyticsComponent = ({ pageTitle, analysisInformation, buttons, onAnalyze }) => {

    return (
        <section id='BsovAnalytics-Page'>
            <h1>{pageTitle}</h1>
            <div>{analysisInformation}</div>
            <div>
                {buttons.map((button) => (
                    <button key={button.id} onClick={() => onAnalyze(button.data)}>
                        {button.title}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default BsovAnalyticsComponent;