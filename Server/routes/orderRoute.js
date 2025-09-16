import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../Controller/orderController.js';
import express from 'express';
import adminAuth  from '../middleware/adminAuth.js';
import  authUser  from '../middleware/auth.js';



const OrderRouter = express.Router();

//admin

OrderRouter.post('/list',adminAuth, allOrders);
OrderRouter.post('/status', adminAuth, updateStatus);


//payment routes

OrderRouter.post('/place',authUser, placeOrder);
OrderRouter.post('/place/stripe',authUser, placeOrderStripe);
OrderRouter.post('/place/razorpay',authUser, placeOrderRazorpay);


//user
OrderRouter.post("/userorders", authUser, userOrders);



export default OrderRouter;