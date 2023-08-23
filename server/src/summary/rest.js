const router = require('express-promise-router')();

const summaryController = require('./controller');

router.get('/summary', summaryController.listSummaryController);

router.post('/summary', summaryController.createSummaryController);

router.put('/summary', summaryController.editSummaryController);

router.delete('/summary', summaryController.deleteSummaryController);

module.exports = router;
