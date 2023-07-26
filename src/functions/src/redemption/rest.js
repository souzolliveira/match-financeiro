const router = require('express-promise-router')();

const redemptionController = require('./controller');

router.get('/redemptions', redemptionController.listRedemptionsController);

router.post('/redemption', redemptionController.createRedemptionController);

router.put('/redemption', redemptionController.editRedemptionController);

router.delete('/redemption', redemptionController.deleteRedemptionController);

module.exports = router;
