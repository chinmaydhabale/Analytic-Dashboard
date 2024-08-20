# Sales and Customer Analytics Dashboard

## Overview

This project is a **Sales and Customer Analytics Dashboard** built using **React.js**, **Chart.js**, **Tailwind CSS**, and **Axios**. The dashboard displays various sales and customer-related metrics through interactive charts, providing insights into sales trends, customer behavior, and geographical distribution. 

## Features

- **Sales Over Time**: Analyze sales trends over different timeframes (daily, monthly, quarterly, yearly).
- **Sales Growth Rate Over Time**: Visualize the growth rate of sales over time.
- **New Customers**: Track the number of new customers acquired over different periods.
- **Repeat Customers**: Monitor the frequency of repeat customers.
- **Geographical Distribution**: Display the geographical distribution of customers using a pie chart.
- **Customer Lifetime Value (CLV) by Cohorts**: Analyze the CLV across different customer cohorts.

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Chart.js**: A simple yet flexible JavaScript charting library for creating responsive and customizable charts.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database used for storing data.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/sales-customer-analytics-dashboard.git
    cd sales-customer-analytics-dashboard
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Set up the backend:**

    Ensure that you have MongoDB installed and running. Set up your `env` variables for MongoDB connection and start the backend server.

    ```bash
    npm start
    ```

4. **Start the React app:**

    ```bash
    npm run dev
    ```

5. **Navigate to the app in your browser:**

    Open your browser and go to `http://localhost:5173/`.

## Usage

The homepage of the app provides a list of all available charts. Click on any chart name to navigate to its detailed view. Each chart is interactive and allows you to explore data over different timeframes.

## API Endpoints

This project uses a set of custom-built API endpoints to fetch data from a MongoDB database:

- **GET `/api/sales-over-time`**: Fetches sales data over different timeframes.
- **GET `/api/sales-growth-rate-over-time`**: Fetches the growth rate of sales.
- **GET `/api/new-customers`**: Fetches data on new customers.
- **GET `/api/repeat-customers`**: Fetches data on repeat customers.
- **GET `/api/geographical-distribution`**: Fetches geographical distribution data.
- **GET `/api/clv-by-cohorts`**: Fetches Customer Lifetime Value data by cohorts.

## Folder Structure

- **components/charts/**: Contains all chart components like `LineChart`, `PieChart`, etc.
- **pages/**: Contains page components like `SalesOverTimePage`, `GeographicalDistributionPage`, etc.
- **services/api.js**: Contains functions for making API calls.


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Acknowledgements

- **React.js**: For the powerful frontend framework.
- **Chart.js**: For the charting library.
- **Tailwind CSS**: For the utility-first CSS framework.
- **Axios**: For the API handling.

---

Thank you for checking out this project! If you have any questions or feedback, please feel free to reach out.




## Deploy link

   - Frontend - `https://analytic-dashboard-fnc7.onrender.com`
   - Backend - `https://analytic-dashboard2.onrender.com`