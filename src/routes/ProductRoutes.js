const {CreateProduct,GetAllProducts,UpdateProduct,DeleteProduct} = require('../controllers/ProductController');

const AuthMiddleware = require('../middlewares/AuthMiddleware');

const RoleMiddleware = require('../middlewares/RoleMiddleware');

const upload = require('../middlewares/Upload');

const express = require('express');

const ProductRouter = express.Router();


ProductRouter.post('/',AuthMiddleware,RoleMiddleware("admin"),upload.single("image"),CreateProduct);

ProductRouter.get('/',AuthMiddleware,GetAllProducts);

ProductRouter.put('/:id',AuthMiddleware,RoleMiddleware("admin"),UpdateProduct);

ProductRouter.delete('/:id',AuthMiddleware,RoleMiddleware("admin"),DeleteProduct);

module.exports = ProductRouter;