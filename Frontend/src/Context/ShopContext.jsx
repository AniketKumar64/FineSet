import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency =" ₹ ";
    const deliveryCharge = 50;
    const deliverytime="2d"
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const Discount = 25;
    const [search, setsearch] = useState('')
    const [showSearch, setshowSearch] = useState(true)
    const [cartitems, setCartItems] = useState({})
    const [products, setproducts] = useState([])
    const [token, settoken] = useState('')
    const [wishlist, setwishlist] = useState({})
    const navigate = useNavigate()


    const addTOCart = async(itemId , size) =>{

        if(!size){
      alert.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartitems || {});

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size] = 1


        }
        setCartItems(cartData);


        if (token){
            try{
                await axios.post(backendUrl +'/api/v1/cart/add',{ itemId, size },{headers:{token}})
            }
            catch(error){
                console.log(error);
                alert.error(error.message)
            }
        }



    }
    

 const getCartCount =()=>{
    let totalCount =0;
    for(const items in cartitems){
        for(const item in cartitems[items]){
            try{
                if(cartitems[items][item] > 0){
                    totalCount += cartitems[items][item];
                }

            }catch(err){


            }
        }
    }
    return totalCount;
 }


 const updateQuantity =async(itemId , size , quantity)=>{

    let cartData = structuredClone(cartitems);
    cartData[itemId][size]= quantity;

    setCartItems(cartData)


    if(token){
        try{
            await axios.post(backendUrl+"/api/v1/cart/update",{ itemId,size, quantity},{headers:{token}})
        }
        catch(err){
            console.log(err);
            alert.error(err.message)
        }

    }
 }

 const getCartAmount =  ()=>{
    let totalAmount = 0;
    for(const items in cartitems){
        let itemInfo = products.find((Product)=> Product._id === items);
        for(const item in cartitems[items]){
            try{
                if(cartitems[items][item]>0){
                    totalAmount += itemInfo.price * cartitems[items][item];
                }
            }
            catch(err){

            }
        }
    }

    return totalAmount;

 }
const getProductsData = async()=>{
    try {
        const response = await axios.get(backendUrl+'/api/v1/products/list-products');
        if(response.data.success){
            setproducts(response.data.products)
        } 
        else{
            alert.error(response.data.message)
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        alert.error(error.message)
    }

}




const getUserCart = async (token)=>{

    try{
        const response = await axios.post(backendUrl+ "/api/v1/cart/get",{},{headers:{token}});
        if(response.data.success){
            setCartItems(response.data.cartData)

        }
    }catch(err){
        console.log(err);
        alert.error(err.message);
    }

}









useEffect(()=>{
    getProductsData()
},[])



useEffect(() => {
    if(!token && localStorage.getItem('token')){
        settoken(localStorage.getItem('token'));
        getUserCart(localStorage.getItem('token'))
        console.log("Token Set from local storage");
    }
}, []);



const value ={
    backendUrl,
    products,
    currency,
    deliveryCharge,
    Discount,
    deliverytime,
    search,
    setsearch,
    showSearch,
    setshowSearch,
    cartitems,
    addTOCart,
    getCartCount,
    navigate,
    updateQuantity,getCartAmount,
    token, 
    settoken,
    setCartItems,
   

    

};  

    
    return (
        <ShopContext.Provider value={value}>
        {props.children}
        </ShopContext.Provider>
    );
}


export default ShopContextProvider;