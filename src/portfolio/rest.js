const router = require('express-promise-router')();

const portfolioController = require('./controller');

router.get('/portfolios', portfolioController.listPortfoliosController);

router.post('/portfolio', portfolioController.createPortfolioController);

router.put('/portfolio', portfolioController.editPortfolioController);

router.delete('/portfolio', portfolioController.deletePortfolioController);

module.exports = router;
