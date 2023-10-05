const router = require('express-promise-router')();

const subcategoryController = require('./controller');

router.get('/subcategory', subcategoryController.listSubcategoryController);

router.get('/subcategory/:transaction_type', subcategoryController.listSubcategoryController);

router.get('/subcategory/:transaction_type/:category_name', subcategoryController.listSubcategoryController);

router.post('/subcategory', subcategoryController.createSubcategoryController);

router.put('/subcategory', subcategoryController.editSubcategoryController);

router.delete('/subcategory', subcategoryController.deleteSubcategoryController);

module.exports = router;
