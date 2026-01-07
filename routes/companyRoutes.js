const router = require('express').Router();
const controller = require('../controller/companyController');

router.post('/', controller.create);
router.get('/', controller.get);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;
