const router = require('express-promise-router')();

const incomeController = require('./controller');

router.get('/incomes', incomeController.listIncomesController);

router.post('/income', incomeController.createIncomeController);

router.put('/income', incomeController.editIncomeController);

router.delete('/income', incomeController.deleteIncomeController);

module.exports = router;
