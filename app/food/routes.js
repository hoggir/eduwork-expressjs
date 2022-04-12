const router = require('express').Router();
const foodController = require('./controller');
const multer = require('multer');
const upload = multer({dest: 'uploads'});

router.post('/food', upload.single('image'), foodController.store);

//router.post('/food', foodController.store);

module.exports = router;