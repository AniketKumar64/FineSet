import express from 'express';
import  authUser  from '../middleware/auth.js';



import { addToCart, updateCart, getCartItems } from '../Controller/CartController.js';

const CartRouter  = express.Router();


CartRouter.post('/add',authUser, addToCart);
CartRouter.post('/update', authUser, updateCart);
CartRouter.post('/get', authUser, getCartItems);



export default CartRouter;