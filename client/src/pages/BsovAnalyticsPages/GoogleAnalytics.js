import React, { useState } from 'react';
import ExcelJS from 'exceljs';

// =====================================================
// Google Analytics Page
// =====================================================

// Component Imports

import BsovAnalyticsComponent from '../../components/BsovAnalytics';
import BarChart from '../../components/BsovAnalyticsCharts';

// Functions

import {
    googleAnalyticsCleanFx,
    googleAnalyticsTotals
} from '../../functions/googleAnalyticsFx';

// Data Import

let googleAnalyticsMappingData;
try {
    googleAnalyticsMappingData = require('../../data/bsovAnalytics');
} catch (error) {
    console.error('Google Analytics Data not available', error);
}

// ------------------------------------
// Page 
// ------------------------------------

const GoogleAnalyticsPage = () => {
    const [googleImportData, setImportData] = useState(null);
    const [cleanData, setCleanData] = useState(null); // State for cleaned data
    const [analysisResult, setAnalysisResult] = useState(null);

    // GOOGLE FILE IMPORT
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
    
        const worksheet = workbook.worksheets[0];
        const data = [];
    
        const headerRow = worksheet.getRow(1);
        const headers = [];
        headerRow.eachCell((cell) => {
            headers.push(cell.value);
        });
    
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                const rowData = {};
                row.eachCell((cell, colNumber) => {
                    const cellValue = cell.type === ExcelJS.ValueType.Date ? cell.value.toString() : cell.value;
                    const header = headers[colNumber - 1];
                    if (header === 'digits') {
                        rowData[header] = cellValue.toString();
                    } else {
                        rowData[header] = cellValue;
                    }
                });
                data.push(rowData);
            }
        });
    
        // Set the imported data
        setImportData(data);
    
        // Run cleaning function immediately after data import
        const cleanedData = googleAnalyticsCleanFx(data, googleAnalyticsMappingData);
        setCleanData(cleanedData);
    };

    // GOOGLE ANALYTICS ANALYSIS FUNCTIONALITY
    const handleAnalyze = (analysisFx) => {
        if (!cleanData) {
            console.error("Cleaned Data is not available yet!");
            return;
        }
    
        const result = analysisFx(cleanData, var1, var2);
    
        if (result && typeof result === 'object') {
            console.log("Analysis Result:", result); // Debugging line
            setAnalysisResult(result);
        } else {
            console.error("Analysis function did not return a valid result:", result);
        }
    }

    const [var1, setVar1] = useState(null);
    const [var2, setVar2] = useState(null);

    const handleChange = (event) => {
        setVar1(event.target.value);
    };

    const handleVar2Change = (event) => {
        setVar2(event.target.value);
    };

    const googleAnalyticsButtons = [
        { id: 1, title: "Totals Analysis", data: () => handleAnalyze(googleAnalyticsTotals) },
        // Add more buttons as needed
    ];

    return (
        <section>
            <div className="file-input">
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
            </div>
            <BsovAnalyticsComponent 
                pageTitle={"Google Analytics"} 
                analysisInformation={"Information about the analysis"} 
                buttons={googleAnalyticsButtons}
                onAnalyze={handleAnalyze}
            />
            <div>
                <p>Analysis Choices</p>
                <div>
                    <h3>Var 1</h3>
                    <label>
                        <input
                            type='radio'
                            value='views'
                            checked={var1 === 'views'}
                            onChange={handleChange}
                        />
                        Views
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='users'
                            checked={var1 === 'users'}
                            onChange={handleChange}
                        />
                        Users
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={''}
                            checked={var1 === ''}
                            onChange={handleChange}
                        />
                        None
                    </label>
                </div>
                <div>
                    <h3>Var 2</h3>
                    <label>
                        <input
                            type='radio'
                            value='topics'
                            checked={var2 === 'topics'}
                            onChange={handleVar2Change}
                        />
                        Topics
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='subtopics'
                            checked={var2 === 'subtopics'}
                            onChange={handleVar2Change}
                        />
                        Subtopics
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='group'
                            checked={var2 === 'group'}
                            onChange={handleVar2Change}
                        />
                        Group
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='design'
                            checked={var2 === 'design'}
                            onChange={handleVar2Change}
                        />
                        Design
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={''}
                            checked={var2 === ''}
                            onChange={handleVar2Change}
                        />
                        None
                    </label>
                </div>
            </div>
            <div>
                {analysisResult && (
                    <div>
                        <BarChart data={analysisResult} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default GoogleAnalyticsPage;