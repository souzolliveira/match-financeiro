const router = require('express-promise-router')();

const tokenController = require('./controller');

router.post('/token/confirm', tokenController.confirmToken);

module.exports = router;
