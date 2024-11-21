import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing an order Using COD

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address} = req.body;

        const orderData ={
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

        await userModel.findByIdAndUpdate(userId, {cartData: {}});


        res.json({success:true,message: "Order Placed Successfully"});
        
    } catch (error) {

        console.log(error);
        res.json({success:false, message: error.message});
        
    }
    
}

// Placing an order Using Stripe

const placeOrderStripe = async (req, res) => {

}


// Placing an order Using RazorPay

const placeOrderRazorpay = async (req, res) => {

}

// Order Data for Admin Panel

const allOrders = async (req, res) => {

}

// Order Data for User Frontend

const userOrders = async (req, res) => {

}

// update Order Status from Admin panel

const updateStatus = async (req, res) => {

}

// export all the functions

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }