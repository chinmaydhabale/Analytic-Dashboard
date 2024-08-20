import React from 'react'
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ labels, getData, text, labelname }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: text
            }
        },
    };

    const chartData = {
        labels, // Labels should be inside the chartData object
        datasets: [
            {
                label: labelname,
                data: getData, // Data points for the line
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 0,
                pointHoverRadius: 0,
                // tension: 0.1,
                borderWidth: 1
            },
        ],
    };
    return (
        <div>
            <div style={{ height: '500px' }} className='h-screen p-4'>
                <Line data={chartData} options={options} />
            </div>
        </div>
    )
}

export default LineChart