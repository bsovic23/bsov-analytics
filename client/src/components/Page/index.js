import React, { useState } from 'react';

// Page/Component Imports
import Navbar from '../Navbar';

const Page = ({ pageTitle, navChoices, buttons }) => {
    const [selectedData, setSelectedData] = useState(null);

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    return(
        <section class='page'>
            <header>
                <h1>{pageTitle}</h1>
                < Navbar navElements={navChoices} />
            </header>
            <div>
                {buttons.map((button) => (
                    <button 
                        key={button.id}
                        onClick={() => handleButtonClick(button.data)}
                    >
                        {button.name}
                    </button>
                ))}
            </div>
            <div>
                {(!selectedData) ? (
                    <div>
                        Select button above to view data
                    </div>
                ) : (
                    <div>
                        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
                    </div>
                )}
            </div>
            <footer>
                Footer Here
            </footer>
        </section>
    )
};

export default Page;