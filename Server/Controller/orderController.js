import UserModel from "../models/UserModel.js"
import orderModel from "../models/orderModel.js"



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
    //11":4
}


//12:15

const placeOrderStripe = async (req, res) => {}


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


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };