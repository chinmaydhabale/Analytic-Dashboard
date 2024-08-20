const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const logger = require('morgan');

//routes 
const chartdata = require('./routes/chartroutes')



const app = express();

//env config
dotenv.config();



//middlewares
app.use(cors({
    origin: process.env.FRONT_URI,
    credentials: true
}))
app.use(express.json())
app.use(logger('dev'));

//routes
app.use('/api/v1/data', chartdata)



const port = process.env.PORT || 8080

//listen
app.listen(port, () => {
    console.log(`server start on port ${port}`)
})
