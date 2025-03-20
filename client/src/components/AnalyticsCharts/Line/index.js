import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Convert data into an array of { label, value } objects and sort by fiscal year
  const chartData = Object.keys(data).map((key) => ({
    label: key,
    value: data[key],
  })).sort((a, b) => a.label.localeCompare(b.label));

  const labels = chartData.map(item => item.label);
  const values = chartData.map(item => item.value);

  return (
    <div id="chart-container">
      <div className="chart-wrapper">
        <Line
          className="line-chart"
          data={{
            labels: labels,
            datasets: [
              {
                label: "Stat Count",
                data: values,
                borderColor: "#ff6384",
                backgroundColor: "rgba(255,99,132,0.2)",
                pointBackgroundColor: "#ff6384",
                fill: true,
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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

export default LineChart;