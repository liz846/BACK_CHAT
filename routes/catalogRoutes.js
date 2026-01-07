const router = require('express').Router();
const controller = require('../controller/catalogController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

router.post('/:catalogId/product', controller.addProduct);
router.put('/:catalogId/product/:productId', controller.updateProduct);
router.delete('/:catalogId/product/:productId', controller.deleteProduct);

module.exports = router;
