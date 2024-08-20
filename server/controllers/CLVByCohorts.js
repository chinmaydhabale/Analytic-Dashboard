const connectDB = require('../config/db');

exports.getCLVByCohorts = async (req, res) => {
    try {
        const client = await connectDB();
        const database = client.db('RQ_Analytics');
        const customers = database.collection('shopifyCustomers');
        const orders = database.collection('shopifyOrders');

        // Aggregation to calculate Customer Lifetime Value (CLV) by cohort
        const result = await customers.aggregate([
            {
                // Lookup orders related to each customer
                $lookup: {
                    from: 'shopifyOrders',
                    localField: 'id',
                    foreignField: 'customer.id',
                    as: 'customerOrders'
                }
            },
            {
                // Unwind orders array
                $unwind: {
                    path: "$customerOrders",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                // Add fields for cohort month and total spent
                $addFields: {
                    firstPurchaseMonth: {
                        $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$created_at" } } }
                    },
                    totalSpent: { $toDouble: { $ifNull: ["$customerOrders.total_price_set.shop_money.amount", "0"] } }
                }
            },
            {
                // Group by cohort month and calculate total CLV
                $group: {
                    _id: "$firstPurchaseMonth",
                    totalCLV: { $sum: "$totalSpent" }
                }
            },
            {
                // Sort by cohort month
                $sort: { "_id": 1 }
            }
        ]).toArray();

        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
