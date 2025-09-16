import userModel from '../models/UserModel.js';



//add item to cart
const addToCart = async (req, res) => {


   try{
     const { userId , itemId, size } = req.body;

    const UserData =await userModel.findById(userId);
    let cartData = await UserData.cartData;

    if(cartData[itemId]){
       if(cartData[itemId][size]){
           cartData[itemId][size] += 1; // Increment quantity if item already exists
       }
         else {
              cartData[itemId][size] = 1; // Add new size with quantity 1
         }
    }
    else{
        cartData[itemId]={}
        cartData[itemId][size] = 1; // Add new item with size and quantity 1
    }

    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({
        success: true,
        message: 'Item added to cart successfully',
        
    })
   }
   catch (error) {
       console.error(error);
       res.status(500).json({
           success: false,
           message: 'Server error',
       });
   }

}



//Update item in cart
const updateCart = async (req, res) => {
    try{
        const { userId, itemId, size, quantity } = req.body;
        const UserData = await userModel.findById(userId);
        let cartData = await UserData.cartData;

        cartData[itemId][size] = quantity; // Update the quantity for the specified item and size

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({
            success: true,
            message: 'Cart updated successfully',
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



//get cart items
const getCartItems = async (req, res) => {

    try{
        const { userId } = req.body;
        const UserData = await userModel.findById(userId);
        let cartData = await UserData.cartData;

        res.json({
            success: true,
            cartItems: cartData,
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



export { addToCart, updateCart, getCartItems };

//10:20