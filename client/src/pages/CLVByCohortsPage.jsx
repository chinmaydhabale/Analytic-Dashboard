import React, { useEffect, useState } from 'react';
import { getCLVByCohorts } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LineChart from '../components/charts/LineChart';
import VerticalChart from '../components/charts/VerticalChart';
import HorizontalChart from '../components/charts/HorizontalChart';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CLVByCohortsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [chartType, setChartType] = useState('line'); // Default chart type set to 'line'
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCLVByCohorts();
                setChartData(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching CLV by cohorts data:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData();
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const labels = Array.isArray(chartData) ? chartData.map(item => {
        const [year, month] = item._id.split('-');
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }) : [];

    const clvData = Array.isArray(chartData) ? chartData.map(item => item.totalCLV) : [];

    const chartname = "Customer Lifetime Value by Cohorts";
    const labelname = "Sales Value";

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='p-4'>
                <div className='flex items-center'>
                    <select
                        className="p-2 border border-gray-300 rounded-md text-sm"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="line">Line</option>
                        <option value="bar">Bar</option>
                        <option value="horizontalBar">Horizontal Bar</option>
                    </select>
                </div>
            </div>

            <div>
                {/* Conditional rendering for loader and chart */}
                {loading ? (
                    <Loader /> // Display the loader while data is loading
                ) : (
                    <>
                        {chartType === 'line' && (
                            <LineChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                        )}
                        {chartType === 'bar' && (
                            <VerticalChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                        )}
                        {chartType === 'horizontalBar' && (
                            <HorizontalChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CLVByCohortsChart;
