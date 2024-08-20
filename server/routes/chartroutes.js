const express = require('express');
const { getTotalSalesOverTime } = require('../controllers/TotalSalesOverTime');
const { getSalesGrowthRate } = require('../controllers/SalesGrowthRate');
const { getNewCustomersOverTime } = require('../controllers/newcustomer');
const { getRepeatCustomers } = require('../controllers/repeatcustomer');
const { getGeographicalDistribution } = require('../controllers/GeographicalDistribution');
const { getCLVByCohorts } = require('../controllers/CLVByCohorts');
const router = express.Router();


// Total Sales Over Time:

router.get('/sales-over-time', getTotalSalesOverTime)

router.get('/total-growth-over-time', getSalesGrowthRate)

router.get('/new-customers', getNewCustomersOverTime)

router.get('/repeat-customers', getRepeatCustomers);

router.get('/geographical-distribution', getGeographicalDistribution);

router.get('/clv-by-cohorts', getCLVByCohorts);

module.exports = router;