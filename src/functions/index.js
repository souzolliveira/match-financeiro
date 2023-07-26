const cors = require('cors');
const express = require('express');

const application = express();
const port = process.env.PORT || 8080;

const assetRest = require('./src/asset/rest');
const authRest = require('./src/authentication/rest');
const cardRest = require('./src/card/rest');
const categoryRest = require('./src/category/rest');
const expenseRest = require('./src/expense/rest');
const incomeRest = require('./src/income/rest');
const investimentRest = require('./src/investiment/rest');
const ping = require('./src/ping/rest');
const redemptionRest = require('./src/redemption/rest');
const subcategoryRest = require('./src/subcategory/rest');
const summaryRest = require('./src/summary/rest');
const tokenRest = require('./src/token/rest');
const transactionRest = require('./src/transaction/rest');
const userRest = require('./src/user/rest');

application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use(express.json({ type: 'application/vnd.api+json' }));
application.use(cors());

application.use(ping);
application.use('/api', assetRest);
application.use('/api', authRest);
application.use('/api', cardRest);
application.use('/api', categoryRest);
application.use('/api', expenseRest);
application.use('/api', incomeRest);
application.use('/api', investimentRest);
application.use('/api', redemptionRest);
application.use('/api', subcategoryRest);
application.use('/api', summaryRest);
application.use('/api', tokenRest);
application.use('/api', transactionRest);
application.use('/api', userRest);

application.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});
