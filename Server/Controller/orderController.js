import UserModel from "../models/UserModel.js"
import orderModel from "../models/orderModel.js"
import Stripe from 'stripe';
// import Razorpay from 'razorpay';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const currency = 'inr';
const DeliveryCharges = 50;

const placeOrder = async (req, res) => {

    try{
        const {userId , items,amount, address} = req.body;

        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await UserModel.findByIdAndUpdate(userId,{cartData: {}}); // Clear the cart after placing the order


        res.json({
            success: true,
            message: 'Order placed successfully',
        });

    }catch(error){
        console.error('Error placing order:', error);
        res.status(500).json({message: error.message});
    }
    
}


// const placeOrderStripe = async (req, res) => {}


const placeOrderStripe = async (req, res) => {
    try{
        const {userId , items,amount, address} = req.body;
        const {origin} = req.headers;

        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items= items.map((item)=>(
            {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name,
                        // images: [item.image],
                    },
               
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
         }))
         line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: DeliveryCharges * 100,
            },
            quantity: 1,
         })

            const session = await stripe.checkout.sessions.create({
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                line_items,
                mode: 'payment',
            })
        res.json({success: true, session_url: session.url});
       

    }catch(error){
        console.error('Error placing order:', error);
        res.status(500).json({message: error.message});
    }
}


// verify payment and update order status

const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await UserModel.findByIdAndUpdate(userId, { cartData: {} }); // Clear the cart after placing the order
            res.json({success: true, message: 'Payment successful and order placed'});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: 'Payment failed, order cancelled'});
        }
    }catch(error){
        console.error('Error verifying payment:', error);
        res.status(500).json({message: error.message});
    }
}

const placeOrderRazorpay = async (req, res) => {}

//for admin
const allOrders = async (req, res) => {

    try{
        const orders = await orderModel.find();

        res.json({
            success: true,
            orders,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }


}


const userOrders = async (req, res) => {
    try{
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })

        res.json({
            success: true,
            orders,
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }


}

const updateStatus = async (req, res) => {

    try{
        const { orderId, status } = req.body;

     await orderModel.findByIdAndUpdate(orderId, { status });

      
        res.json({
            success: true,
            message: 'Order status updated successfully',
        });
    }
    catch(err){
        console.log('Error updating order status:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}


export { placeOrder,verifyStripe, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };