import React, { useEffect, useState } from 'react';
import { getSGROverTime } from '../services/api';
import LineChart from '../components/charts/LineChart';
import HorizontalChart from '../components/charts/HorizontalChart';
import VerticalChart from '../components/charts/VerticalChart';
import Navbar from '../components/Navbar'


const SGROverTime = () => {
    const [chartData, setChartData] = useState({});
    const [timeframe, setTimeframe] = useState('monthly'); // Default timeframe set to 'daily'
    const [chartType, setChartType] = useState('line'); // Default chart type set to 'line'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getSGROverTime();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Destructure data based on the selected timeframe
    const selectedData = chartData[timeframe] || [];

    const labels = selectedData.map((item) => {
        if (timeframe === 'monthly') {
            return `${monthNames[item.month - 1]} ${item.year}`;
        } else if (timeframe === 'quarterly') {
            return `Q${item.quarter} ${item.year}`;
        } else if (timeframe === 'yearly') {
            return `${item.year}`;
        }
        return '';
    });

    const salesData = selectedData.map(item => item.growthRate);

    // button css property 
    const btncol = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"

    const chartname = "Sales Growth Rate Over Time";

    const labelname = "Growth Rate";

    return (
        <div>

            <Navbar />

            <div className='flex flex-col md:flex-row justify-between px-4 md:px-8 py-4'>
                <div className='flex flex-wrap gap-4 md:gap-6 mb-4 md:mb-0'>
                    <button
                        className={`text-sm px-4 py-2 rounded-lg ${timeframe === "monthly" ? btncol : "text-gray-600"} `}
                        onClick={() => setTimeframe("monthly")}
                    >
                        Monthly
                    </button>
                    <button
                        className={`text-sm px-4 py-2 rounded-lg ${timeframe === "quarterly" ? btncol : "text-gray-600"} `}
                        onClick={() => setTimeframe("quarterly")}
                    >
                        Quarterly
                    </button>
                </div>

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

            {/* Conditional rendering for different chart types */}
            {chartType === 'line' && (
                <LineChart text={chartname} labelname={labelname} labels={labels} getData={salesData} />
            )}
            {chartType === 'bar' && (
                <VerticalChart text={chartname} labelname={labelname} labels={labels} getData={salesData} />
            )}
            {chartType === 'horizontalBar' && (
                <HorizontalChart text={chartname} labelname={labelname} labels={labels} getData={salesData} />
            )}
        </div>
    );
};

export default SGROverTime;
