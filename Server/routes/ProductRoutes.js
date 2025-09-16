//product routes
import express from 'express';
import {addProduct, listProducts, removeProduct, Singleproduct } from '../Controller/ProductController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();


productRouter.post('/add-product',adminAuth,upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct);
// productRouter.post('/add-product', adminAuth, , addProduct);
productRouter.get('/list-products', listProducts);
productRouter.post('/remove-product',adminAuth, removeProduct);
productRouter.post('/single-product', Singleproduct);

export default productRouter;