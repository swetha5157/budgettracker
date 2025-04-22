const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRouter = require('./routers/categoryRouter');
const transactionRouter = require('./routers/transactionRouter');
const monthlyBudgetRouter = require('./routers/monthlyBudgetRouter');
const AIRouter = require("./routers/AIRouter");
const reportRouter = require('./routers/reportRouter');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/budget', monthlyBudgetRouter);
app.use('/api/ai',AIRouter);
app.use('/api/export',reportRouter);
app.use('/',userRouter)



module.exports = app;
