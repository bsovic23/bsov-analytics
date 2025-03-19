import React, { useState } from 'react';

const AnalyticsFramework = ({ pageTitle, data }) => {

  const [selectedType, setSelectedType] = useState(null);
  const [chartTitle, setChartTitle] = useState('CHART');
  const [chartDescription, setChartInfo] = useState("Analysis Information");

  const handleSelectedType = (type) => {
    setSelectedType(type);
    setChartTitle('CHART');
    setChartInfo('Analysis Information');
  };

  const handleOptionClick = (item) => {
    console.log('Selected Data:', item.formattedData);
    setChartTitle(item.optionTitle);
    setChartInfo(item.optionInformation);
  };

  return (
    <section className="analyticsFramework-container">
      {/* Box 1 Left */}
      <div className="analyticsFramework-leftBox">
        <h2>{pageTitle}</h2>
        <div>{chartTitle}</div>
        <p>{chartDescription}</p>
      </div>

      {/* Box 2 Right */}
      <div className="analyticsFramework-RightBox">
        <div>
          {['line', 'bar', 'other'].map((type) => (
            <button
              key={type}
              onClick={() => handleSelectedType(type)}
              className={selectedType === type ? 'active' : ''}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div>
          {selectedType ? (
            data
              .filter((item) => item.type === selectedType)
              .map((item, index) => (
                <button key={index} onClick={() => handleOptionClick(item)}>
                  {item.optionTitle}
                </button>
              ))
          ) : (
            <p>Select a chart to begin</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsFramework;