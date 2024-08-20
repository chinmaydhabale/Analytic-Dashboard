import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Analytics Dashboard
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="text-white block md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                {/* Desktop Menu */}
                <ul className={`hidden md:flex space-x-6`}>
                    <li>
                        <Link to="/sales-over-time" className="text-white hover:underline">
                            Sales Over Time
                        </Link>
                    </li>
                    <li>
                        <Link to="/sales-growth-rate-over-time" className="text-white hover:underline">
                            Sales Growth Rate
                        </Link>
                    </li>
                    <li>
                        <Link to="/new-customers" className="text-white hover:underline">
                            New Customers
                        </Link>
                    </li>
                    <li>
                        <Link to="/repeat-customers" className="text-white hover:underline">
                            Repeat Customers
                        </Link>
                    </li>
                    <li>
                        <Link to="/geographical-distribution" className="text-white hover:underline">
                            Geographical Distribution
                        </Link>
                    </li>
                    <li>
                        <Link to="/clv-by-cohorts" className="text-white hover:underline">
                            CLV By Cohorts
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu (Sidebar) */}
            <div className={`fixed inset-0 bg-blue-700 bg-opacity-75 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform md:hidden`}>
                <div className="flex justify-end p-4">
                    <button
                        className="text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-4 mt-12">
                    <Link to="/sales-over-time" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>Sales Over Time</Link>
                    <Link to="/sales-growth-rate-over-time" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>Sales Growth Rate</Link>
                    <Link to="/new-customers" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>New Customers</Link>
                    <Link to="/repeat-customers" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>Repeat Customers</Link>
                    <Link to="/geographical-distribution" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>Geographical Distribution</Link>
                    <Link to="/clv-by-cohorts" className="text-white text-lg hover:underline" onClick={() => setIsOpen(false)}>CLV By Cohorts</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
