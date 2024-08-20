import React, { useEffect, useState } from 'react';
import { getCLVByCohorts } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LineChart from '../components/charts/LineChart';
import VerticalChart from '../components/charts/VerticalChart';
import HorizontalChart from '../components/charts/HorizontalChart';
import Navbar from '../components/Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CLVByCohortsChart = () => {
    const [chartData, setChartData] = useState([]);
    const [chartType, setChartType] = useState('line'); // Default chart type set to 'line'


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCLVByCohorts();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching CLV by cohorts data:', error);
            }
        };

        fetchData();
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Ensure chartData is an array before mapping
    const labels = Array.isArray(chartData) ? chartData.map(item => {
        const [year, month] = item._id.split('-'); // Split _id to get year and month
        return `${monthNames[parseInt(month) - 1]} ${year}`; // Format: "Month Year"
    }) : [];

    const clvData = Array.isArray(chartData) ? chartData.map(item => item.totalCLV) : [];

    const chartname = "Customer Lifetime Value by Cohorts:";

    const labelname = "sales value";


    return (

        <div >

            <div>
                <Navbar />
            </div>

            <div className='p-4' >

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
                {/* Conditional rendering for different chart types */}
                {chartType === 'line' && (
                    <LineChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                )}
                {chartType === 'bar' && (
                    <VerticalChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                )}
                {chartType === 'horizontalBar' && (
                    <HorizontalChart text={chartname} labelname={labelname} labels={labels} getData={clvData} />
                )}
            </div>
        </div>

    )
};

export default CLVByCohortsChart;
