import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getGeographicalDistribution } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate random colors
const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
        colors.push(color);
    }
    return colors;
};

const GeographicalDistributionChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getGeographicalDistribution();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching geographical distribution data:', error);
            }
        };

        fetchData();
    }, []);

    // Ensure the data is available and in array format
    const labels = chartData.map(item => item._id || 'Unknown');
    const distributionData = chartData.map(item => item.customerCount || 0);

    // Generate random colors based on the number of labels
    const colors = generateRandomColors(labels.length);

    const chartDataset = {
        labels,
        datasets: [
            {
                label: 'Geographical Distribution of Customers',
                data: distributionData,
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    };



    // Render the Pie chart only if data is available
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="grid h-screen place-items-center">
                {chartData.length > 0 ? (
                    <div className=" w-full md:w-1/2 lg:w-1/2 xl:w-1/2  ">
                        <Pie data={chartDataset} />
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </>

    );
};

export default GeographicalDistributionChart;
