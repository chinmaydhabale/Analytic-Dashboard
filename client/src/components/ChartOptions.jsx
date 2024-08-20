import React from 'react';

const ChartOptions = ({ timeframe, setTimeframe, setChartType, chartType }) => {

    const btncol = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

    return (
        <div className='flex flex-col md:flex-row justify-between px-4 md:px-8 py-4'>
            <div className='flex flex-wrap gap-4 md:gap-6 mb-4 md:mb-0'>
                <button
                    className={`text-sm px-4 py-2 rounded-lg ${timeframe === "daily" ? btncol : "text-gray-600"} `}
                    onClick={() => setTimeframe("daily")}
                >
                    Daily
                </button>
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
                <button
                    className={`text-sm px-4 py-2 rounded-lg ${timeframe === "yearly" ? btncol : "text-gray-600"} `}
                    onClick={() => setTimeframe("yearly")}
                >
                    Yearly
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
    );
}

export default ChartOptions;
