const router = require('express-promise-router')();

const assetController = require('./controller');

router.get('/assets', assetController.listAssetsController);

router.post('/asset', assetController.createAssetController);

router.put('/asset', assetController.editAssetController);

router.delete('/asset', assetController.deleteAssetController);

module.exports = router;
