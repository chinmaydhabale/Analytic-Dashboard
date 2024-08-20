import React, { useEffect, useState } from 'react';
import { getSalesOverTime } from '../services/api';
import LineChart from '../components/charts/LineChart';
import HorizontalChart from '../components/charts/HorizontalChart';
import VerticalChart from '../components/charts/VerticalChart';
import ChartOptions from '../components/ChartOptions';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const SalesOverTimeChart = () => {
    const [chartData, setChartData] = useState({});
    const [timeframe, setTimeframe] = useState('daily'); // Default timeframe set to 'daily'
    const [chartType, setChartType] = useState('line'); // Default chart type set to 'line'
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getSalesOverTime();
                setChartData(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching sales data:', error);
                setLoading(false); // Set loading to false even if there is an error
            }
        };

        fetchData();
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Destructure data based on the selected timeframe
    const selectedData = chartData[timeframe] || [];

    const labels = selectedData.map((item) => {
        if (timeframe === 'daily') {
            return `${item._id.day.toString().padStart(2, "0")}-${item._id.month.toString().padStart(2, "0")}-${item._id.year}`;
        } else if (timeframe === 'monthly') {
            return `${monthNames[item._id.month - 1]} ${item._id.year}`;
        } else if (timeframe === 'quarterly') {
            return `Q${item._id.quarter} ${item._id.year}`;
        } else if (timeframe === 'yearly') {
            return `${item._id.year}`;
        }
        return '';
    });

    const salesData = selectedData.map(item => item.totalSales);

    return (
        <div>
            <Navbar />

            <ChartOptions
                timeframe={timeframe}
                chartType={chartType}
                setChartType={setChartType}
                setTimeframe={setTimeframe}
            />

            {loading ? (
                <Loader /> // Display the loader while data is loading
            ) : (
                <>
                    {chartType === 'line' && (
                        <LineChart text={"Sales Over Time"} labelname={"sales"} labels={labels} getData={salesData} />
                    )}
                    {chartType === 'bar' && (
                        <VerticalChart text={"Sales Over Time"} labelname={"sales"} labels={labels} getData={salesData} />
                    )}
                    {chartType === 'horizontalBar' && (
                        <HorizontalChart text={"Sales Over Time"} labelname={"sales"} labels={labels} getData={salesData} />
                    )}
                </>
            )}
        </div>
    );
};

export default SalesOverTimeChart;
