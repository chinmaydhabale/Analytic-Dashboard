import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getGeographicalDistribution } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

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
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getGeographicalDistribution();
                setChartData(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching geographical distribution data:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData();
    }, []);

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

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="grid h-screen place-items-center">
                {loading ? (
                    <Loader /> // Display the loader while data is loading
                ) : (
                    <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <Pie data={chartDataset} />
                    </div>
                )}
            </div>
        </>
    );
};

export default GeographicalDistributionChart;
