import React from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const HorizontalChart = ({ labels, getData, text, labelname }) => {

    const data = {
        labels,
        datasets: [
            {
                label: labelname,
                data: getData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: text,
            }
        },
    };


    return (
        <div>
            <div style={{ height: '500px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default HorizontalChart