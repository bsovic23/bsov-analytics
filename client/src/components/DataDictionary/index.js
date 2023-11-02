import React, { useState } from 'react';

// Page/Component Imports
import Navbar from '../Navbar';
import GenerateExcelFile from '../GenerateExcelFile';
import DictionaryButtons from '../DictionaryButtons';

const DataDictionaryPage = ({ pageTitle, buttons }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [rowStates, setRowStates] = useState({});

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    const handleKeepClick = (id) => {
        setRowStates((prevRowStates) => {
            return { ...prevRowStates, [id]: 'Keep' };
        });
    };
    
    const handleDeleteClick = (id) => {
        setRowStates((prevRowStates) => {
            return { ...prevRowStates, [id]: 'Delete' };
        });
    };
    
    const handleMergeClick = (id) => {
        const mergedId = window.prompt(`Enter the ID to merge "${id}" into:`);

        if (mergedId === null || mergedId.trim() === '') {
            alert('Merge canceled or ID is empty.');
        } else {
            setRowStates((prevRowStates) => {
                const mergedDescription = `Merge with ID ${mergedId}`;
                return { ...prevRowStates, [id]: mergedDescription };
            });
        }
    };

    const handleReviewClick = (id) => {
        setRowStates((prevRowStates) => {
            return { ...prevRowStates, [id]: 'Re-Review' };
        });
    };

    return (
        <section className='page'>
            <header>
                <h1>{pageTitle}</h1>
                <Navbar />
            </header>
            <div class='analysis-buttons-div'>
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
                                <th>SubGroup</th>
                                <th>Term</th>
                                <th>Term Owner</th>
                                <th>Definition</th>
                                <th>Data Source</th>
                                <th>Duplicate Metric?</th>
                                <th>Additional Comments</th>
                                <th>Data Dictionary To Do</th>
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
                                            <td>{item.SubGroup}</td>
                                            <td>{item.Term}</td>
                                            <td>{item['Term Owner']}</td>
                                            <td>{item.Definition}</td>
                                            <td>{item['Data Source']}</td>
                                            <td>{item['Duplicate Metric?']}</td>
                                            <td>{item['Additional Comments']}</td>
                                            <td>{rowStates[item.id] ? rowStates[item.id] : ''}</td>
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
                <button onClick={() => GenerateExcelFile({ rowStates })}>
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