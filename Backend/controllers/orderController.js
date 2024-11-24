import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// Global Variables
const currency = "pkr"
const deliveryCharges = 250

// Gateway Initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Stripe Secret Key  




// Placing an order Using COD

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });


        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// Placing an order Using Stripe

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }));
        
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Deleivery Fee',
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({success:true,session_url:session.url});

    } catch (error) {

        console.log(error);
        res.json({success:false,message:error.message });
        
    }

}

// Verify Stripe

const verifyStripe = async (req, res) => {
    const { orderId, success } = req.query;
    const { token } = req.headers;

    try {
        if (!orderId || !success || !token) {
            return res.json({ success: false, message: "Invalid request." });
        }

        // Decode the userId from the token (or fetch from token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Assuming JWT for token decoding
        const userId = decoded.userId;

        if (success === 'true') {
            // Mark order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            return res.json({ success: true, message: "Payment Successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};



// Placing an order Using RazorPay

const placeOrderRazorpay = async (req, res) => {

}

// Order Data for Admin Panel

const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// Order Data for User Frontend

const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// update Order Status from Admin panel

const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// export all the functions

export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }