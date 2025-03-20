import React, { useState } from 'react';

// ----------------------------------------------------------------------------------------------
// Component Imports
// ----------------------------------------------------------------------------------------------
import BarChart from '../AnalyticsCharts/Bar';
import LineChart from '../AnalyticsCharts/Line';

// ===============================================================================================
// Analytics Framework
// ===============================================================================================

const AnalyticsFramework = ({ pageTitle, data }) => {

  const [selectedType, setSelectedType] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [chartDescription, setChartDescription] = useState("Analysis Information");

  const handleSelectedType = (type) => {
    setSelectedType(type);
    setChartDescription('Analysis Information');
    setSelectedData(null);
  };

  const handleOptionClick = (item) => {
    console.log('Selected Data:', item.formattedData);
    setSelectedData(item.formattedData);
    setChartDescription(item.optionInformation);
  };

  return (
    <section className="analyticsFramework-container">
      {/* Box 1 Left */}
      <div className="analyticsFramework-leftBox">
        <h2>{pageTitle}</h2>
        {selectedData ? (
          <>
            {selectedType === 'bar' && <BarChart data={selectedData} />}
            {selectedType === 'line' && <LineChart data={selectedData} />}
            <p>{chartDescription}</p>
          </>
        ) : (
          <p>Select a chart type and option to display the chart</p>
        )}
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

        <div className="option-buttons">
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