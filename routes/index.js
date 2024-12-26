const router = require('express').Router();

router.use("/products" , require('./productRouter'));
router.use("/reviews" , require('./ReviewRouter'));
router.use("/users" , require('./userRouter'));

module.exports = router;