import React, { useState } from 'react';

import AnalyticsFramework from '../../components/AnalyticsFramework';

const NewPage = () => {

    const cleanData = [
        { type: 'line', optionTitle: 'option 1', optionInformation: 'info 1', formattedData: 'data1'},
        { type: 'bar', optionTitle: 'option 2', optionInformation: 'info 2', formattedData: 'data2'},
        { type: 'other', optionTitle: 'option 3', optionInformation: 'info 3', formattedData: 'data3'},
    ];

    return (
        <section>
            <AnalyticsFramework 
                pageTitle={"New Page"}
                data={cleanData}
            />
        </section>
    )
}

export default NewPage;