import React, { useState } from 'react';

// Page/Component Imports
import Navbar from '../Navbar';
import GenerateExcelFile from '../GenerateExcelFile';
import DictionaryButtons from '../DictionaryButtons';

const DataDictionaryPage = ({ pageTitle, buttons }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [rowStates, setRowStates] = useState([]);

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    const handleKeepClick = (rowIndex) => {
    const updatedStates = [...rowStates];
    updatedStates[rowIndex] = 'keep';
    setRowStates(updatedStates);
    console.log(rowIndex);
    };
    
    const handleDeleteClick = (rowIndex) => {
    const updatedStates = [...rowStates];
    updatedStates[rowIndex] = 'delete';
    setRowStates(updatedStates);
    };
    
    const handleMergeClick = (rowIndex) => {
    const updatedStates = [...rowStates];
    updatedStates[rowIndex] = 'merge';
    setRowStates(updatedStates);
    };

    const handleReviewClick = (rowIndex) => {
    const updatedStates = [...rowStates];
    updatedStates[rowIndex] = 'review';
    setRowStates(updatedStates);
    };

    return (
        <section className='page'>
            <header>
                <h1>{pageTitle}</h1>
                <Navbar />
            </header>
            <div>
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => handleButtonClick(button.data)}
                        className='analysis-buttons'
                    >
                        {button.name}
                    </button>
                ))}
            </div>
            <div>
            {selectedData.filteredTerms && selectedData.filteredTerms.length > 0 ? (
                <div>
                    <div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Group</th>
                                <th>Term</th>
                                <th>Term Owner</th>
                                <th>Definition</th>
                                <th>Data Source</th>
                                <th>Additional Comments</th>
                                <th>To Do: Data Dictionary Variable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.filteredTerms.map((innerArray, index) => (
                                <React.Fragment key={index}>
                                    {innerArray.map((item) => (
                                        <tr
                                            key={item.id}
                                            class={index % 2 === 0 ? 'blue' : 'white'}
                                        >
                                            <td>{item.id}</td>
                                            <td>{item.Group}</td>
                                            <td>{item.Term}</td>
                                            <td>{item['Term Owner']}</td>
                                            <td>{item.Definition}</td>
                                            <td>{item['Data Source']}</td>
                                            <td>{item['Additional Comments']}</td>
                                            <td>
                                            <DictionaryButtons
                                                onKeepClick={() => handleKeepClick(item.id)}
                                                onDeleteClick={() => handleDeleteClick(item.id)}
                                                onMergeClick={() => handleMergeClick(item.id)}
                                                onReviewClick={() => handleReviewClick(item.id)}
                                            />
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                ) : (
                <div>
                    Select a button above to view data
                </div>
                )}
            </div>
            <div>
                <button onClick={() => GenerateExcelFile({ selectedData, rowStates })}>
                    Generate Excel
                </button>
            </div>
            <footer>
                Footer Here
            </footer>
        </section>
    );
};

export default DataDictionaryPage;