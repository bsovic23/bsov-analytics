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

    const labels = Object.keys(data);
    const values = Object.values(data);

    return (
        <div>
            <Bar
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
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;