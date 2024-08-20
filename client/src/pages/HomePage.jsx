import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const charts = [
        { name: 'Sales Over Time', path: '/sales-over-time' },
        { name: 'Sales Growth Rate Over Time', path: '/sales-growth-rate-over-time' },
        { name: 'New Customers', path: '/new-customers' },
        { name: 'Repeat Customers', path: '/repeat-customers' },
        { name: 'Geographical Distribution', path: '/geographical-distribution' },
        { name: 'Customer Lifetime Value by Cohorts:', path: '/clv-by-cohorts' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
            <div className="w-full max-w-md">
                <ul className="space-y-4">
                    {charts.map((chart, index) => (
                        <li key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
                            <Link to={chart.path} className="text-xl font-medium text-blue-600 hover:underline">
                                {chart.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
