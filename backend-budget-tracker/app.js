const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRouter = require('./routers/categoryRouter');
const transactionRouter = require('./routers/transactionRouter');
const monthlyBudgetRouter = require('./routers/monthlyBudgetRouter');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/budget', monthlyBudgetRouter);



module.exports = app;
