import React, { useState } from 'react';

// Page/Component Imports
import Navbar from '../Navbar';

const Page = ({ pageTitle, buttons }) => {
    const [selectedData, setSelectedData] = useState(null);

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    return(
        <section class='page'>
            <header>
                <h1>{pageTitle}</h1>
                < Navbar />
            </header>
            <div>
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