import React, { useState, useEffect } from 'react';

const Survey = () => {

    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState('');
    const [questionThree, setQuestionThree] = useState('');
    const [selectedRequest, setSelectedRequest] = useState([]);
    const [deptSelected, setDepartment] = useState('');
    const [codingLanguages, setCodingLanguages] = useState([]);

    const [buttonNumber, setButtonNumber] = useState('');

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
        {category: 2, text: 'clean up'},
        {category: 2, text: 'stats'},
        {category: 2, text: 'publication'},
        {category: 3, text: '1 day'},
        {category: 3, text: '1 week'},
        {category: 3, text: '1 month'},
    ];

    const handleButtonClick = (buttonNumber) => {
        const data = choices
           .filter(choice => buttonNumber === choice.category)

        setButtonNumber(data);
        console.log(data);
     };

    const setButtonChoice = (buttonChoice) => {
        console.log(buttonChoice)
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
                    <p>What kind of analysis/data management will this project require (Select all that apply):</p>
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
                    <div>
                        <button onClick={() => handleButtonClick(1)}>Analysis Language:</button><p>chosen language here</p>
                        <button onClick={() => handleButtonClick(2)}>Analysis Type:</button><p>chosen type here</p>
                        <button onClick={() => handleButtonClick(3)}>Analysis Timeframe</button><p>chosen time here</p>
                    </div>
                    <div>
                        <div>
                            Current Button Number: {buttonNumber && Array.isArray(buttonNumber) && buttonNumber.length > 0 ? buttonNumber.map((button) => button.text).join(', ') : 'None'}
                        </div>
                        <div>
                            {buttonNumber && Array.isArray(buttonNumber) && buttonNumber.map((button, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setButtonChoice(button.category, button.text)}
                                >
                                    {button.category}: {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </form>
        </section>
    )
};

export default Survey;