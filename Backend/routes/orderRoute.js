import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

// Admin Feature Routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Gateway Routes
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);


// User Feature Routes
orderRouter.post('/userorders', authUser, userOrders);


export default orderRouter;
