import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available for the chart.</p>;
    }

    // Convert data into an array of { label, value } objects
    const chartData = Object.keys(data).map((key) => ({
        label: key,
        value: data[key],
    }));

    // Sort the data by value in descending order
    const sortedData = chartData.sort((a, b) => b.value - a.value);

    // Slice the top 20 items if there are more than 20
    const topData = sortedData.length > 20 ? sortedData.slice(0, 20) : sortedData;

    // Separate the labels and values for the chart
    const labels = topData.map(item => item.label);
    const values = topData.map(item => item.value);

    return (
        <div id="chart-container">
            <div className="chart-wrapper">
                <Bar
                    className="bar-chart"
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Items",
                                data: values,
                                backgroundColor: "blue",
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // Prevent the chart from shrinking too much
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;