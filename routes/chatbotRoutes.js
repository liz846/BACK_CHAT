const router = require('express').Router();
const controller = require('../controller/chatbotController');

router.post('/', controller.ask);

module.exports = router;
