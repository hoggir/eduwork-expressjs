const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productControllerV2 = require('./controller');

router.get('/product', productControllerV2.getProducts);
router.post('/product/', upload.single('image'), productControllerV2.postProduct);
router.get("/product/:id", productControllerV2.getProductById);
router.put('/product/:id', upload.single('image'), productControllerV2.updateProduct);
router.delete('/product/:id', upload.single('image'), productControllerV2.deleteProduct);

module.exports = router;