import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeatherChart = ({ temperatureData, humidityData }) => {
    const temperatureChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperature Trends',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                }
            }
        }
    };

    const humidityChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Humidity Trends',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Humidity (%)'
                }
            }
        }
    };

    const temperatureChartData = {
        labels: temperatureData.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
        datasets: [
            {
                label: 'Temperature',
                data: temperatureData.map(item => item.main.temp),
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1
            }
        ]
    };

    const humidityChartData = {
        labels: humidityData.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
        datasets: [
            {
                label: 'Humidity',
                data: humidityData.map(item => item.main.humidity),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="weather-charts">
            <div className="chart-container">
                <Line options={temperatureChartOptions} data={temperatureChartData} />
            </div>
            <div className="chart-container">
                <Line options={humidityChartOptions} data={humidityChartData} />
            </div>
        </div>
    );
};

export default WeatherChart;
