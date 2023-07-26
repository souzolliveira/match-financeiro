const router = require('express-promise-router')();

const authController = require('./controller');

router.post('/sign-in', authController.signInController);

router.delete('/sign-out', authController.signOutController);

module.exports = router;
