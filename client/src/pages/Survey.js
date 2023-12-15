import React, { useState, useEffect } from 'react';

const Survey = () => {

    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState('');
    const [questionThree, setQuestionThree] = useState('');
    const [selectedRequest, setSelectedRequest] = useState([]);
    const [deptSelected, setDepartment] = useState('');
    const [codingLanguages, setCodingLanguages] = useState([]);

    // Drop down useState
    const [showModal, setShowModal] = useState(false);
    const [choiceData, setChoiceData] = useState('');
    const [categories, setCategories] = useState({
        1: 'Click to select',
        2: 'Click to select',
        3: 'Click to select',
    });

  const handleCheckboxChange = (request) => {
    const isSelected = selectedRequest.includes(request);

    if (isSelected) {
        setSelectedRequest(selectedRequest.filter((r) => r !== request));
    } else {
        setSelectedRequest([...selectedRequest, request]);
    }
  };

  const handleCodingLanguagesChange = (language) => {
    const alreadyChosen = codingLanguages.includes(language);

    if (alreadyChosen) {
        setCodingLanguages(codingLanguages.filter((c) => c !== language))
    } else {
        setCodingLanguages([...codingLanguages, language])
    }
  };


  const handleDeptChange = (dept) => {
    setDepartment(dept)
  };

  const submitForm = (event) => {
    event.preventDefault();
    };

    // Drop down ------------------------------------------------------------
    const choices = [
        {category: 1, text: 'css'},
        {category: 1, text: 'javascript'},
        {category: 1, text: 'html'},
        {category: 1, text: 'react'},
        {category: 1, text: 'mongodb'},
        {category: 1, text: 'sas'},
        {category: 1, text: 'stata'},
        {category: 1, text: 'r'},
        {category: 1, text: 'react'},
        {category: 1, text: 'react'},
        {category: 1, text: 'react'},
        {category: 2, text: 'clean up'},
        {category: 2, text: 'stats'},
        {category: 2, text: 'publication'},
        {category: 3, text: '1 day'},
        {category: 3, text: '1 week'},
        {category: 3, text: '1 month'},
    ];

    const handleCategoryClick = (categoryNumber) => {
        const data = choices.filter(choice => choice.category === categoryNumber)

        setChoiceData(data);
        setShowModal(true);
     };

    const setChoice = (category, text) => {
        setCategories(prevCategories => ({
            ...prevCategories,
            [category]: text
        }));
        setShowModal(false);
    };

    return(
        <section style={{marginLeft: '40px' }}>
            SURVEY MOCK STRUCTURE
            <form onSubmit={submitForm}>
                <h1>FORM TITLE</h1>
                <div>
                    <label>Question 1</label>
                    <input
                        type='text'
                        value={questionOne}
                        placeholder='question 1'
                        onChange={(e) => setQuestionOne(e.target.value)}
                    />
                </div>
                <div>
                    <label>Question 2</label>
                    <input
                        type='text'
                        placeholder='Enter question 2 answer here'
                        value={questionTwo}
                        onChange={(e) => setQuestionTwo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Question 3</label>
                    <input
                        type='text'
                        placeholder='Enter question 3 answer here'
                        value={questionThree}
                        onChange={(e) => setQuestionThree(e.target.value)}
                    />
                </div>
                <div>
                    <h3>What kind of analysis/data management will this project require (Select all that apply):</h3>
                        <label>
                        <input
                            type="checkbox"
                            value="Data Cleaning"
                            checked={selectedRequest.includes('Data Cleaning')}
                            onChange={() => handleCheckboxChange('Data Cleaning')}
                        />
                        Data Cleaning
                        </label>

                        <label>
                        <input
                            type="checkbox"
                            value="Data Analysis"
                            checked={selectedRequest.includes('Data Analysis')}
                            onChange={() => handleCheckboxChange('Data Analysis')}
                        />
                        Data Analysis
                        </label>

                        <label>
                        <input
                            type="checkbox"
                            value="Data Formatting"
                            checked={selectedRequest.includes('Data Formatting')}
                            onChange={() => handleCheckboxChange('Data Formatting')}
                        />
                        Data Formatting
                        </label>

                        <label>
                        <input
                            type="checkbox"
                            value="Survey Consult"
                            checked={selectedRequest.includes('Survey Consult')}
                            onChange={() => handleCheckboxChange('Survey Consult')}
                        />
                        Survey Consult
                        </label>
                
                        <p>Selected Data Analysis/Data Management: {selectedRequest.join(', ')}</p>
                </div>
                <div>
                    <h3>What division do you currently work for?</h3>
                    <label>
                        <input 
                            type='radio'
                            value={"Scientific Operations"}
                            checked={deptSelected === 'Scientific Operations'}
                            onChange={() => handleDeptChange('Scientific Operations')}
                        />
                        Scientific Operations
                    </label>
                    <label>
                        <input
                            type='radio'
                            value={"Finance"}
                            checked={deptSelected === 'Finance'}
                            onChange={() => handleDeptChange('Finance')}
                        />
                        Finance
                    </label>
                </div>
                <p>Department selected: {deptSelected}</p>
                <div>
                    <h3>Which coding languages are required for this analysis</h3>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="HTML"
                                checked={codingLanguages.includes("HTML")}
                                onChange={() => handleCodingLanguagesChange('HTML')}
                            />
                            HTML
                        </label>

                        <label>
                            <input
                                type='checkbox'
                                value={'CSS'}
                                checked={codingLanguages.includes('CSS')}
                                onChange={() => {handleCodingLanguagesChange('CSS')}}
                            />
                            CSS
                        </label>
                    <p>Coding Languages: {codingLanguages.join(', ')}</p>
                    </div>
                </div>

                <section>
                    <h3>Analysis Form</h3>
                    <div id='analysis-form' className='flex-container'>
                        <div id='section-1'>
                        <button onClick={() => handleCategoryClick(1)}>Analysis Language: {categories[1]}</button>
                        <button onClick={() => handleCategoryClick(2)}>Analysis Type: {categories[2]}</button>
                        <button onClick={() => handleCategoryClick(3)}>Analysis Timeframe: {categories[3]}</button>
                        </div>
                        {showModal && (
                        <div className='modal' id='section-2'>
                            <button onClick={() => setShowModal(false)}>X</button>
                            <div className='scrollable-container'>
                            {choiceData && Array.isArray(choiceData) && choiceData.map((choice, index) => (
                                <button
                                key={index}
                                onClick={() => setChoice(choice.category, choice.text)}
                                >
                                {choice.category}: {choice.text}
                                </button>
                            ))}
                            </div>
                        </div>
                        )}
                    </div>
                </section>

            </form>
        </section>
    )
};

export default Survey;