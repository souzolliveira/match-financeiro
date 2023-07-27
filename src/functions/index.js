/* eslint-disable import-helpers/order-imports */
const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { initializeApp } = require('firebase');
const firebaseConfig = require('./firebase.config');
const serviceAccount = require('./service-account-key.json');

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(ping);
app.use('/api', assetRest);
app.use('/api', authRest);
app.use('/api', cardRest);
app.use('/api', categoryRest);
app.use('/api', expenseRest);
app.use('/api', incomeRest);
app.use('/api', investimentRest);
app.use('/api', redemptionRest);
app.use('/api', subcategoryRest);
app.use('/api', summaryRest);
app.use('/api', tokenRest);
app.use('/api', transactionRest);
app.use('/api', userRest);

exports.app = functions.https.onRequest(app);
