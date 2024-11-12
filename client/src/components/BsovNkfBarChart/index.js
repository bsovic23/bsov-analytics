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

const NkfAnalyticsBarChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available for the chart.</p>;
    }

    // Extract topics and platform counts (YouTube, Genially, CaseHippo)
    const topics = Object.keys(data);
    const youtubeCounts = topics.map(topic => data[topic].youtube || 0);
    const geniallyCounts = topics.map(topic => data[topic].genially || 0);
    const caseHippoCounts = topics.map(topic => data[topic].casehippo || 0);

    return (
        <div id="chart-container">
            <div className="chart-wrapper">
                <Bar
                    className="bar-chart"
                    data={{
                        labels: topics,
                        datasets: [
                            {
                                label: "YouTube",
                                data: youtubeCounts,
                                backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue
                            },
                            {
                                label: "Genially",
                                data: geniallyCounts,
                                backgroundColor: "rgba(255, 206, 86, 0.7)", // Yellow
                            },
                            {
                                label: "CaseHippo",
                                data: caseHippoCounts,
                                backgroundColor: "rgba(75, 192, 192, 0.7)", // Green
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Count',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Topics',
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default NkfAnalyticsBarChart;