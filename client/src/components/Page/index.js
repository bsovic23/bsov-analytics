import React, { useState } from 'react';

// Page/Component Imports
import Sidebar from '../Sidebar';
import GenerateExcelFileGeneral from '../GenerateExcelFileGeneral';

const Page = ({ pageTitle, buttons }) => {
    const [selectedData, setSelectedData] = useState(null);

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    return(
        <section class='page'>
            <section class='page-section'>
                <h1>{pageTitle}</h1>
                < Sidebar enableHover={false}/>
            </section>
            <section class='page-section'>
                <div>
                    <button onClick={() => GenerateExcelFileGeneral({ generalData: selectedData })}>
                        Generate General Excel File
                    </button>
                </div>
                <div class='analysis-buttons-div'>
                    {buttons.map((button) => (
                        <button 
                            key={button.id}
                            onClick={() => handleButtonClick(button.data)}
                            class='analysis-buttons'
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
                <div>
                    {(selectedData === null) ? (
                        <div>
                            Select button above to view data
                        </div>
                    ) : (
                        <div>
                            <pre class='json-display'>{JSON.stringify(selectedData, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
};

export default Page;